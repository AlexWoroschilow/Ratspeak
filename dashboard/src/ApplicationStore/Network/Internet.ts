// Based on the investigation of the `@dashboard/static/js/*` files (primarily `dashboard/static/js/modals.js`), here are the `RS.invoke` methods related to **Internet servers** (connecting to public nodes, custom TCP/Backbone clients, and hosting servers over the Internet):
//
// ### Connecting to Network (Clients)
// These methods allow the application to connect to Reticulum nodes over the Internet using TCP or specialized Backbone connections.
//
// *   `add_tcp_connection`: Adds a new TCP client interface to connect to a remote host (e.g., a public hub like `rns.ratspeak.org`).
// *   `update_tcp_connection`: Updates the configuration of an existing TCP client interface.
// *   `add_backbone_connection`: Adds a high-performance "Backbone" client connection (typically used for infrastructure and high-bandwidth links).
// *   `update_backbone_connection`: Updates the configuration of an existing Backbone client interface.
// *   `api_connection_history`: Retrieves a list of recently used custom connection endpoints for the "Quick Connect" feature.
//
// ### Hosting on Network (Servers)
// These methods allow the application to act as a server/hub, listening for incoming connections from other nodes over the Internet.
//
// *   `add_tcp_server`: Starts a new TCP server listener on a specified IP and port to allow other nodes to connect.
// *   `update_tcp_server`: Updates the configuration (port, bind address, or name) of an existing TCP server.
// *   `add_backbone_server`: Starts a new Backbone server listener for high-performance infrastructure hosting.
// *   `update_backbone_server`: Updates an existing Backbone server's configuration.
// *   `api_hub_interfaces`: Retrieves a list of active hub/server interfaces and is used to populate the list of "Official" and "Unofficial" public servers in the UI.
//
// ### Summary of Locations
// *   `dashboard/static/js/modals.js`:
//     *   `submitConnection()` (line 2138): Handles the logic for adding/updating TCP and Backbone client connections.
//     *   `submitHostServer()` (line 2253): Handles the logic for adding/updating TCP servers.
//     *   `submitBackboneHost()` (line 2321): Handles the logic for adding/updating Backbone servers.
//     *   `refreshConnectPublicServers()` (line 1873): Calls `api_hub_interfaces` to refresh the list of available public servers.
//     *   `loadConnectionHistory()` (line 2002): Calls `api_connection_history` to populate the Quick Connect list.
// *   `dashboard/src/Application/NetworkInternet.tsx`: Provides the React UI for the "Connect to Network" modal, including the public server list and custom host/port inputs.
//
//
export class Internet {
    constructor() {
    }
}
