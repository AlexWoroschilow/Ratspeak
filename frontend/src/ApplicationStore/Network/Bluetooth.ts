// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to Bluetooth (BLE):
//
// ### General Bluetooth Status and Scanning
// *   `api_ble_available`: Checks if Bluetooth/BLE is available on the system.
// *   `scan_ble_devices`: Initiates a scan for nearby Bluetooth devices (primarily RNodes).
// *   `cancel_ble_connect`: Cancels an ongoing attempt to connect to a Bluetooth device.
//
// ### Bluetooth Peer (BLE Peer) Management
// *   `api_ble_peer_available`: Checks if the Bluetooth Peer interface is available.
// *   `api_ble_peer_status`: Retrieves the current status of the Bluetooth Peer interface.
// *   `enable_ble_peer_interface`: Enables the Bluetooth Peer interface (optionally with a visibility duration).
// *   `disable_ble_peer_interface`: Disables the Bluetooth Peer interface.
// *   `disconnect_ble_peer`: Disconnects a specific Bluetooth peer using its address.
//
// ### Summary of Locations
// These methods are primarily used in the following files:
// *   `dashboard/static/js/modals.js`: Handling interface configuration, scanning, and peer toggling.
// *   `dashboard/static/js/tauri_events.js`: Handling Bluetooth-related events like pairing and bridge status.
// *   `dashboard/static/js/settings.js`: Reporting and managing Bluetooth peer status.
// *   `dashboard/static/js/ui_shared.js`: Generic UI actions like disconnecting interfaces.
//
// ### Bluetooth (BLE) and RNode
// *   `ble_peer_status_update` / `ble_peer_status_changed`: Updates on the state of the Bluetooth Peer interface.
// *   `ble_peer_discovered` / `ble_peer_connected` / `ble_peer_disconnected`: Events for nearby Bluetooth peer interaction.
// *   `ble_scan_results`: Delivers results from an active Bluetooth device scan.
// *   `ble_rnode_passkey_prompt`: Requests a pairing passkey for a Bluetooth RNode.
// *   `ble_rnode_pairing_finished`: Confirms the completion of an RNode pairing process.
// *   `ble_rnode_connect_native` / `ble_rnode_disconnect_native`: Platform-specific Bluetooth connection events.
//
//
import {invoke} from "@tauri-apps/api/core";
import {makeAutoObservable} from "mobx";

export interface BleAvailableResponse {
    available: boolean;
    missing: string[];
    install_cmd: string;
    auth_state?: any;
}

export interface BleScanResponse {
    devices: any[];
    error: string | null;
}

export interface BlePeerStatusResponse {
    enabled: boolean;
    available: boolean;
    state: string;
    peer_count: number;
    peers: Array<{
        address: string;
        identity_hash: string;
    }>;
}

export class Bluetooth {
    constructor() {
        makeAutoObservable(this);
    }

    async isAvailable(): Promise<BleAvailableResponse> {
        return await invoke<BleAvailableResponse>('api_ble_available');
    }

    async scanDevices(): Promise<BleScanResponse> {
        return await invoke<BleScanResponse>('scan_ble_devices');
    }

    async cancelConnect(name: string): Promise<any> {
        return await invoke('cancel_ble_connect', { name });
    }

    async isPeerAvailable(): Promise<any> {
        return await invoke('api_ble_peer_available');
    }

    async getPeerStatus(): Promise<BlePeerStatusResponse> {
        return await invoke<BlePeerStatusResponse>('api_ble_peer_status');
    }

    async enablePeerInterface(duration: number = 0): Promise<any> {
        return await invoke('enable_ble_peer_interface', { args: { duration } });
    }

    async disablePeerInterface(): Promise<any> {
        return await invoke('disable_ble_peer_interface');
    }

    async disconnectPeer(address: string): Promise<any> {
        return await invoke('disconnect_ble_peer', { address });
    }
}
