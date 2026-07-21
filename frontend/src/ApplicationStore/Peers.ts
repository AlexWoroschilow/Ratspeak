// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to **peers** (network nodes, Bluetooth peers, and peer management):
//
// ### Peer Discovery and State
// *   `api_get_peers_snapshot`: Retrieves a complete snapshot of all known peers in the Reticulum network, including their hashes, hop counts, and last-seen timestamps.
// *   `set_peers_sort`: Saves the preferred sorting method for the peer list (e.g., by name, hops, or last seen).
// *   `api_app_settings`: Used to retrieve global application settings, which include the current peer sorting preference.
//
// ### Bluetooth Peer (BLE Peer) Management
// These methods manage the application's visibility and connectivity as a Bluetooth peer to other devices:
// *   `api_ble_peer_available`: Checks if the hardware/system supports Bluetooth Peer functionality.
// *   `api_ble_peer_status`: Retrieves the current status of the Bluetooth Peer interface (enabled/disabled, visibility, current connections).
// *   `enable_ble_peer_interface`: Enables the Bluetooth Peer interface, making the device discoverable to other Ratspeak/Reticum nodes via BLE.
// *   `disable_ble_peer_interface`: Disables the Bluetooth Peer interface.
// *   `disconnect_ble_peer`: Disconnects a specific Bluetooth peer using its hardware address.
//
// ### Peer Actions and Interactions
// Methods used when interacting with a specific peer from the peer list:
// *   `add_contact`: Adds a peer's identity to the local contact list/address book.
// *   `block_contact`: Blocks a peer, preventing further communication and optionally "blackholing" their traffic.
// *   `api_contacts`: Retrieves the contact list to determine if a peer is already a known contact.
//
// ### Propagation and Network Paths
// While often categorized under network health, these methods manage how peers interact for data propagation:
// *   `api_propagation_nodes`: Retrieves a list of available nodes that can be used for message propagation.
// *   `set_propagation_node`: Sets a specific peer/node as the preferred propagation target.
// *   `refresh_propagation_nodes`: Triggers a refresh of the list of available propagation nodes.
//
// ### Summary of Locations
// *   `dashboard/static/js/peers.js`: Handles the peer list UI, sorting (`set_peers_sort`), and actions like adding/blocking contacts.
// *   `dashboard/static/js/peers_cache.js`: Manages the background synchronization of peer data using `api_get_peers_snapshot`.
// *   `dashboard/static/js/settings.js`: Monitors and displays Bluetooth peer status (`api_ble_peer_status`).
// *   `dashboard/static/js/modals.js`: Contains the logic for toggling the Bluetooth Peer interface and disconnecting peers.
// *   `dashboard/static/js/tauri_events.js`: Listens for real-time network events (like new peers or hop updates) and updates the peer snapshot.
//
//
import {ApplicationStore, SetupStatusResponse} from "../ApplicationStore";
import {invoke} from "@tauri-apps/api/core";
import {info} from "@tauri-apps/plugin-log";

export interface Peer {
    hash: string;
    iface: string;
    identity_hash: string;
    telephony_hash: string;
    last_seen: number | null;
    first_seen: number | null;
    display_name: string;
    profile_status: string;
    is_contact: boolean;
    last_interface: string;
    services: string[];
}

export interface PeerEnriched extends Peer {
    status: 'reachable' | 'stale' | 'offline' | 'unreachable';
    activity_tier: 'recent' | 'today' | 'older' | 'never';
    activity_label: string;
    hops: number | null;
    iface_is_live: boolean;
    route_label: string;
    path_age?: number | null;
    via?: string | null;
}

export class Peers {
    constructor(store: ApplicationStore) {
    }


    /**
     * `api_get_peers_snapshot`: Retrieves a complete snapshot of all known peers in the Reticulum network, including their hashes, hop counts, and last-seen timestamps.
     */
    async getPeers(): Promise<PeerEnriched[]> {
        return new Promise((resolve, reject) => {
            invoke<Peer[]>('api_get_peers_snapshot')
                .then((collection: Peer[]) => {
                    resolve(collection.map((peer: Peer) => {
                        return this.enrich(peer)
                    }).filter((peer: PeerEnriched) => {
                        return peer.status == "reachable"
                    }));
                })
                .catch((error: any) => {
                    return reject(new Error("Failed: api_get_peers_snapshot"))
                });
        });
    }

    enrich(peer: Peer): PeerEnriched {
        const nowSecs = Date.now() / 1000;

        // 1. Calculate Status (Matching PeersCache.computeStatus)
        const STALE_AFTER_SECS = 2 * 60 * 60;    // 2 hours
        const OFFLINE_AFTER_SECS = 24 * 60 * 60; // 24 hours
        const CULL_AFTER_SECS = 7 * 24 * 60 * 60; // 7 days

        let status: PeerEnriched['status'] = 'unreachable';
        if (peer.last_seen !== null) {
            const age = nowSecs - peer.last_seen;
            if (age < STALE_AFTER_SECS) status = 'reachable';
            else if (age < OFFLINE_AFTER_SECS) status = 'stale';
            else status = 'offline';
        }

        // 2. Calculate Activity Tier (Matching PeersCache.computeActivity)
        let tier: PeerEnriched['activity_tier'] = 'never';
        let label = 'Never seen';
        if (peer.last_seen !== null) {
            const age = Math.max(0, nowSecs - peer.last_seen);
            if (age < STALE_AFTER_SECS) {
                tier = 'recent';
                label = 'Last heard recently';
            } else if (age < OFFLINE_AFTER_SECS) {
                tier = 'today';
                label = 'Last heard today';
            } else {
                tier = 'older';
                // Note: prettyTime() would be a separate utility to format the age
                label = `Last heard some time ago`;
            }
        }

        // 3. Routing (Simplified based on Peer interface properties)
        const hops = null; // In a full implementation, this would come from a path table lookup
        const iface_is_live = false; // Determined by presence in the active path table
        const route_label = peer.iface ? `via ${peer.iface}` : 'No current path';

        return {
            ...peer,
            status,
            activity_tier: tier,
            activity_label: label,
            hops,
            iface_is_live,
            route_label
        };
    }

}
