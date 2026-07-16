"use strict";
import React from "react";

interface NetworkHostProps {
}

interface NetworkHostState {
}

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
export class NetworkHost extends React.Component<NetworkHostProps, NetworkHostState> {
    constructor(props: NetworkHostProps) {
        super(props);
    }

    render() {

        return <>
            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="host"><span className="bottom-sheet-title-icon"><svg viewBox="0 0 24 24"
                                                                                                                                                       aria-hidden="true"><rect
                    x="2" y="2" width="20" height="8" rx="2"></rect><rect x="2" y="14" width="20" height="8" rx="2"></rect><circle cx="6" cy="6" r="1" fill="currentColor"
                                                                                                                                   stroke="none"></circle><circle cx="6" cy="18"
                                                                                                                                                                  r="1"
                                                                                                                                                                  fill="currentColor"
                                                                                                                                                                  stroke="none"></circle></svg></span><span
                    className="bottom-sheet-title-label">Host Network</span></div>
                <button className="bottom-sheet-close" id="host-modal-close" aria-label="Close">×</button>
            </div>
            <div className="bottom-sheet-body">
                <p className="inline-hint" style={{margin: "0 0 10px"}}>Accept incoming TCP connections from other Reticulum nodes.</p>
                <div className="modal-field">
                    <label>Listen Port</label>
                    <input type="number" id="host-port" className="modal-input" placeholder="4242" min="1" max="65535" autoCorrect="off" autoCapitalize="none"
                           spellCheck="false"/>
                </div>
                <div className="modal-field">
                    <label>Bind Address</label>
                    <input type="text" id="host-listen-ip" className="modal-input" placeholder="0.0.0.0" autoCorrect="off" autoCapitalize="none" spellCheck="false"/>
                </div>
                <div className="modal-field">
                    <label>Name (optional)</label>
                    <input type="text" id="host-name" className="modal-input" placeholder="My Server" maxLength="32" autoCorrect="off" autoCapitalize="none"
                           spellCheck="false"/>
                </div>
            </div>
            <div className="bottom-sheet-footer">
                <a href={"#network"} className="rs-dialog-cancel">Cancel</a>
                <button className="rs-dialog-confirm">Start Hosting</button>
            </div>

        </>
    }
}
