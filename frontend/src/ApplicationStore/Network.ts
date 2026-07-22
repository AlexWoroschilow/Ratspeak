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


interface NetworkLogArgs {
    enabled: boolean;        // Whether to turn logging on or off
    level?: 'essential' | 'standard' | 'detailed'; // Optional: The granularity of logs
}

export interface NetworkLogStatus {
    enabled: boolean | undefined;          // The new enabled state
    level: string | undefined;             // The current active log level (e.g., "standard")
    restart_required: boolean; // Indicates if a node restart is needed (currently always false for this command)
}

export interface NetworkLog {
    type: string;
    message: string;
    detail: string;
    timestamp: number;
    level: 'essential' | 'standard' | 'detailed';
}

export type NetworkLogLevel = NetworkLog['level'];

export class Network {

    public logs?: Array<NetworkLog> = [];
    public status?: NetworkLogStatus;

    constructor(store: ApplicationStore) {
        makeAutoObservable(this, {
            setStatus: action,
            clearLog: action,
            addLog: action,
        });

        this.listeners();
    }

    listeners() {
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

    setStatus(status: NetworkLogStatus): NetworkLogStatus {
        this.status = status;

        (this.status?.enabled == false) &&
        (this.clearLog());

        return this.status;
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
