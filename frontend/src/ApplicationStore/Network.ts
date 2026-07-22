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
import {Statistic} from "./Peers";
import {ApplicationStore} from "../ApplicationStore";
import {invoke} from "@tauri-apps/api/core";
import {action, makeAutoObservable, runInAction} from "mobx";
import {observer} from "mobx-react";


interface NetworkLogArgs {
    enabled: boolean;        // Whether to turn logging on or off
    level?: 'essential' | 'standard' | 'detailed'; // Optional: The granularity of logs
}

export interface NetworkLogStatus {
    enabled: boolean;          // The new enabled state
    level: string;             // The current active log level (e.g., "standard")
    restart_required: boolean; // Indicates if a node restart is needed (currently always false for this command)
}

export interface NetworkLog {
    type: string;
    message: string;
    detail: string;
    timestamp: number;
    level: 'essential' | 'standard' | 'detailed';
}

export class Network {

    public logs?: Array<NetworkLog> = [];

    constructor(store: ApplicationStore) {
        makeAutoObservable(this, {
            addLog: action, // Explicitly bind action
        });

        this.listeners();
        invoke<NetworkLogStatus>('enable_network_log', {
            args: {
                enabled: true,
                level: 'detailed'
            } as NetworkLogArgs
        }).then((data: NetworkLogStatus) => {
            info(`enable_network_log???: ${JSON.stringify(data)}`);
        }).catch((error: any) => {
        });
    }

    addLog(entity: NetworkLog) {
        this.logs?.push(entity);
        this?.logs?.sort?.((a, b) => {
            return b.timestamp - a.timestamp
        });
    }

    async listeners() {
        listen<NetworkLog>("network_event", (event: { payload: NetworkLog }) => {
            this.addLog(event.payload);
        });

        listen<NetworkLogStatus>("network_log_level_changed", (event: { payload: NetworkLogStatus }) => {
            info(`\n\nnetwork_log_level_changed: ${JSON.stringify(event)}\n`)
        });

        listen("announces_cleared", (event: any) => {
            info(`\n\nannounces_cleared: ${JSON.stringify(event)}\n`)
        });
        listen("hub_interfaces_update", (event: any) => {
            info(`\n\nhub_interfaces_update: ${JSON.stringify(event)}\n`)
        });
    }

}
