//
// ### Network and Peers
// *   `peers_updated` / `peer_updated` / `peer_removed`: Triggered when the global peer list or a specific peer's info changes.
// *   `stats_update`: Provides real-time network statistics (traffic, interface states, etc.).
// *   `hub_interfaces_update`: Triggered when the status of network interfaces (TCP, Local, etc.) changes.
// *   `paths_cleared` / `announces_cleared`: Confirms that cached network paths or announcements have been wiped.
// *   `announce_received`: Triggered when a new identity announcement is seen on the network.
// *   `announce_triggered`: Confirms that a local announcement has been sent.
// *   `node_operation_status`: General status updates for RNode/interface operations.
//
import {listen} from "@tauri-apps/api/event";
import {info} from "@tauri-apps/plugin-log";
import {ApplicationStore} from "../ApplicationStore";
import {invoke} from "@tauri-apps/api/core";
import {action, makeAutoObservable} from "mobx";
import {Peer, PeerEnriched} from "./Peers";


interface NetworkLogArgs {
    enabled: boolean;
    level?: 'essential' | 'standard' | 'detailed';
}

export interface NetworkLogStatus {
    enabled: boolean | undefined;
    level: string | undefined;
    restart_required: boolean;
}

export interface NetworkLog {
    type: string;
    message: string;
    detail: string;
    timestamp: number;
    level: 'essential' | 'standard' | 'detailed';
}

export type NetworkLogLevel = NetworkLog['level'];


export interface Statistic {
    timestamp: number;
    connected: boolean;
    interface_stats: {
        interfaces: Array<{
            name: string;
            rxb: number;
            txb: number;
            online: boolean;
            bitrate: number;
            mtu: number;
            mode: number;
            role: number;
            announce_queue: number;
            held_announces: number;
            incoming_announce_frequency: number;
            outgoing_announce_frequency: number;
            incoming_pr_frequency: number;
            outgoing_pr_frequency: number;
            burst_active: boolean;
            burst_activated: boolean;
            pr_burst_active: boolean;
            pr_burst_activated: boolean;
            announce_rate_target: number;
            announce_rate_grace: number;
            announce_rate_penalty: number;
            announce_cap: number;
            ifac_size: number;
            tx_drops: number;
        }>;
    };

    path_table: Array<{
        hash: string;
        via: string | null;
        hops: number;
        expires: number;
        timestamp: number;
        interface: string;
    }>;

    path_index: Record<string, {
        via: string | null;
        hops: number;
        expires: number;
        timestamp: number;
        interface: string;
    }>;
    path_table_total: number;
    path_table_truncated: boolean;
    rate_table: Array<{
        hash: string;
        rate: number;
        last: number;
        rate_violations: number;
        blocked_until: number;
        samples: number;
    }>;
    link_count: number;
}

export type StatisticInterface = Statistic['interface_stats']['interfaces'][number];

export interface Interfaces {

    rnode: Array<{
        type: 'RNodeInterface';
        port: string;
        frequency?: string;
        bandwidth?: string;
        txpower?: string;
        spreadfactor?: string;
        codingrate?: string;
        flow_control?: string;
        id_interval?: string;
        mode?: 'full' | 'gateway' | 'access_point' | 'boundary' | 'roaming';
        name: string;

        [key: string]: string | number | boolean | undefined;
    }>;

    auto: Array<{
        name: string;
        type: string;

        [key: string]: string | number | boolean | undefined;
    }>;

    tcp_client: Array<{
        type: 'TCPClientInterface';
        target_host: string;
        target_port: string;
        name: string;

        [key: string]: string | number | boolean | undefined;
    }>;

    tcp_server: Array<{
        type: 'TCPServerInterface';
        listen_ip?: string;
        listen_port: string;
        name: string;

        [key: string]: string | number | boolean | undefined;
    }>;

    backbone_client: Array<{
        name: string;
        type: string;

        [key: string]: string | number | boolean | undefined;
    }>;

    backbone_server: Array<{
        name: string;
        type: string;

        [key: string]: string | number | boolean | undefined;
    }>;

    transport: {
        mode: 'on' | 'off' | 'auto';
        enabled: boolean;
        configured_enabled: boolean;
        suppressed: boolean;
    };
}


export class Network {

    public logs: Array<NetworkLog> = [];
    public interfaces: Interfaces = {} as Interfaces;

    public status: NetworkLogStatus = {} as NetworkLogStatus;
    public statistic: Statistic = {} as Statistic;

    constructor(store: ApplicationStore) {
        makeAutoObservable(this, {
            setInterfaces: action,
            setStatistic: action,
            setStatus: action,
            clearLog: action,
            addLog: action,
        });

        this.listeners();

        this.getInterfaces()
            .then((interfaces: Interfaces) => {
                this.setInterfaces(interfaces);
            });
    }

    listeners() {
        listen<Statistic>("stats_update",
            (event: { payload: Statistic }) => {
                return this.setStatistic(event.payload);
            });

        listen<NetworkLog>("network_event",
            (event: { payload: NetworkLog }) => {
                this.addLog(event.payload);
            });

        listen<NetworkLogStatus>("network_log_level_changed",
            (event: { payload: NetworkLogStatus }) => {
                this.setStatus(event.payload);
            });

        listen("announces_cleared", (event: any) => {
            info(`\n\nannounces_cleared: ${JSON.stringify(event)}\n`)
        });

        listen("hub_interfaces_update", (event: any) => {
            info(`\n\nhub_interfaces_update: ${JSON.stringify(event)}\n`)
        });
    }

    clearLog() {
        this.logs = [];
    }

    addLog(entity: NetworkLog) {
        this.logs?.push(entity);
        this?.logs?.sort?.((a, b) => {
            return b.timestamp - a.timestamp
        });
    }

    setInterfaces(interfaces: Interfaces): Interfaces {
        this.interfaces = interfaces;
        return this.interfaces;
    }


    setStatus(status: NetworkLogStatus): NetworkLogStatus {
        this.status = status;

        (this.status?.enabled == false) &&
        (this.clearLog());

        return this.status;
    }

    setStatistic(statistic: Statistic): Statistic {
        this.statistic = statistic;
        return this.statistic;
    }


    async getInterfaces(): Promise<Interfaces> {
        return new Promise((resolve: (value: Interfaces) => void, reject) => {
            invoke<Interfaces>('api_hub_interfaces')
                .then((interfaces: Interfaces) => {
                    return resolve(interfaces)
                })
                .catch((error: any) => {
                    return reject(new Error("Failed: api_get_peers_snapshot"))
                });
        });
    }


    async doSetNetworkLogLevel(level: NetworkLogLevel) {
        return new Promise((resolve: (value: NetworkLogStatus) => void, reject) => {
            invoke<NetworkLogStatus>('set_network_log_level', {
                level: level
            }).then((status: NetworkLogStatus) => {
                return resolve(this.setStatus(status));
            }).catch((error: any) => {
                return reject(error);
            });
        });
    }

    async doClearNetworkLog() {
        return new Promise((resolve: (value: void) => void) => {
            return resolve(this.clearLog());
        });
    }

    async doToggleNetworkLog(isEnabled: boolean, level: string = "detailed") {
        return new Promise((resolve: (value: NetworkLogStatus) => void, reject) => {
            invoke<NetworkLogStatus>('enable_network_log', {
                args: {
                    enabled: isEnabled,
                    level: level
                } as NetworkLogArgs
            }).then((status: NetworkLogStatus) => {
                return resolve(this.setStatus(status));
            }).catch((error: any) => {
                return reject(error);
            });
        });
    }
}
