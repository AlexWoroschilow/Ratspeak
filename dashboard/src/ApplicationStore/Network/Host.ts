// Based on the investigation of the `@dashboard/static/js/*` files (primarily `dashboard/static/js/modals.js`), here are the `RS.invoke` methods related to **local host mode** (accepting incoming connections from other Reticulum nodes via TCP or Backbone servers):
//
// ### TCP Server (Host Network)
// These methods manage the standard TCP server interface, allowing the application to act as a hub or entry point for other nodes on a network.
// *   `add_tcp_server`: Creates and starts a new TCP server listener. It takes arguments like `listen_port`, `listen_ip` (bind address), and a display `name`.
// *   `update_tcp_server`: Updates the configuration of an existing TCP server. It requires the `old_name` of the interface to identify which server to modify.
//
// ### Backbone Server
// Backbone servers are specialized, high-bandwidth interfaces typically used on desktop platforms for infrastructure.
// *   `add_backbone_server`: Starts a new Backbone server listener. Similar to the TCP server but optimized for backbone traffic.
// *   `update_backbone_server`: Updates an existing Backbone server's configuration (e.g., port, bind address, or display name).
//
// ### Connectivity Discovery
// *   `api_hub_interfaces`: Retrieves a list of currently active hub/server interfaces. This is used to populate the UI when editing existing hosting configurations.
//
// ### Summary of Locations
// *   `dashboard/static/js/modals.js`: Contains the core logic for the "Host Network" and "Host Backbone Server" modals.
//     *   `submitHostServer()` (line 2253): Invokes `add_tcp_server` or `update_tcp_server`.
//     *   `submitBackboneHost()` (line 2321): Invokes `add_backbone_server` or `update_backbone_server`.
// *   `dashboard/src/Application/NetworkHost.tsx`: The React component providing the UI for the "Host Network" modal (Listen Port, Bind Address, and Name inputs).
// *   `dashboard/static/js/health.js` and `dashboard/static/js/settings.js`: Use `api_hub_interfaces` to monitor the status of local host interfaces.
//
//
export class Host {
    constructor() {
    }
}
