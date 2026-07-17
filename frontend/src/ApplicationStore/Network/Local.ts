// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to the **local network** (WiFi/LAN auto-discovery and management):
//
// ### Local Network Interface Management
// *   `enable_auto_interface`: Enables the "Local Network" auto-discovery interface (Multicast UDP). It takes a `name` and an `options` object containing configuration like `group_id`, `discovery_scope`, `discovery_port`, `data_port`, and specific `devices` (NICs) to use.
// *   `disable_auto_interface`: Disables the "Local Network" interface.
// *   `api_list_network_interfaces`: Retrieves a list of available physical network interface cards (NICs) on the system, including their names and IP addresses (IPv4 and IPv6 Link-Local). This is used to populate the "Network Interfaces" selection in the advanced settings.
//
// ### Interface Monitoring and Discovery
// *   `api_hub_interfaces`: Retrieves a snapshot of all active network interfaces, including those in the "Local Network" category (often referred to as `auto` interfaces in the code). This is used to determine if the local network is currently enabled and to show its status.
//
// ### Summary of Locations
// *   `dashboard/static/js/modals.js`:
//     *   `toggleLocalNetwork()` (line 2372): Handles the logic for enabling or disabling the interface.
//     *   `showAutoInterfaceConfigSheet()` (line 2387): Builds the configuration UI and invokes `api_list_network_interfaces` (line 2510) to list hardware.
//     *   `confirmBtn` listener (line 2615): Calls `enable_auto_interface` with the gathered configuration.
// *   `dashboard/static/js/tauri_events.js`:
//     *   Listens for `hub_interfaces_update` (line 537) and updates the global `window._autoEnabled` state based on the status of the local network interfaces.
// *   `dashboard/static/js/settings.js` and `dashboard/static/js/health.js`:
//     *   Use `api_hub_interfaces` to render the status and configuration details of the Local Network in the settings and health dashboards.
//
//
export class Local {
    constructor() {
    }
}
