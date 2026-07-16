// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to LoRa radio and RNode hardware:
//
// ### LoRa Interface Management
// *   `add_lora_interface`: Adds a new LoRa interface (RNode). Used for BLE, USB (Android), and TCP-connected RNodes.
// *   `update_lora_interface`: Updates configuration for an existing LoRa interface.
// *   `api_rnode_presets`: Retrieves the catalog of regional settings and radio parameter presets used to configure the RNode's radio hardware over the TCP connection.
//
// ### RNode Configuration and Presets
// *   `api_rnode_presets`: Retrieves a catalog of RNode presets and region settings (frequency, bandwidth, spreading factor, etc.).
//
// ### General Bluetooth Status and Scanning
// *   `api_ble_available`: Checks if Bluetooth/BLE is available on the system.
// *   `scan_ble_devices`: Initiates a scan for nearby Bluetooth devices (primarily RNodes).
// *   `cancel_ble_connect`: Cancels an ongoing attempt to connect to a Bluetooth device.
//
// ### RNode via Bluetooth (BLE)
// These methods are specifically used when an RNode is connected via Bluetooth:
// *   `disconnect_ble_rnode`: Disconnects a Bluetooth-connected RNode.
// *   `submit_ble_rnode_passkey`: Submits the pairing passkey for an RNode pairing request.
// *   `cancel_ble_rnode_pairing`: Cancels a pending Bluetooth pairing request with an RNode.
// *   `ble_rnode_bridge_ready`: Signals that the bridge between the application and the BLE RNode is established.
//
// ### Serial Port Management
// *   `api_serial_ports`: Scans for and retrieves a list of available serial (COM/TTY) ports on the system. This is used by the UI to populate the device selection list for standard RNodes.
//
// ### USB/Serial Interface Management
// *   `api_serial_ports`: Scans for and retrieves a list of available serial ports (typically USB-to-TTL adapters or RNodes connected via USB) on desktop platforms.
// *   `add_lora_interface`: Adds a new LoRa/RNode interface. This method is used for all transport types, including standard USB-Serial (where the `port` is a path like `/dev/ttyUSB0` or `COM3`) and Android USB (where the `port` starts with `androidusb://`).
// *   `update_lora_interface`: Updates the configuration for an existing LoRa/RNode interface connected via USB.
//
// ### Android USB (USB-OTG)
// While some Android USB functionality is handled via a native bridge (`window.RatspeakAndroid`), it interacts with the following `RS.invoke` flows:
// *   `add_lora_interface`: When used on Android with a USB device, the application first requests permission via the native bridge and then calls this method with an `androidusb://` URI.
//
//
// ### Summary of Locations
// These methods are primarily used in the following files:
// *   `dashboard/static/js/modals.js`: Contains the main logic for adding and updating LoRa interfaces (`submitRnodeInterface`) and fetching presets.
// *   `dashboard/static/js/tauri_events.js`: Handles event-driven Bluetooth RNode actions like pairing and bridge readiness.
// *   `dashboard/static/js/ui_shared.js`: Handles generic interface actions including disconnecting BLE RNodes.
//
export class Radio {
    constructor() {
    }
}
