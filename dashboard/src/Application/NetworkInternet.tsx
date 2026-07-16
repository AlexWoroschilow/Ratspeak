"use strict";
import React from "react";

interface NetworkInternetProps {
}

interface NetworkInternetState {
}

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
export class NetworkInternet extends React.Component<NetworkInternetProps, NetworkInternetState> {
    constructor(props: NetworkInternetProps) {
        super(props);
    }

    render() {

        return <>
            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="tcp"><span className="bottom-sheet-title-icon"><svg viewBox="0 0 24 24"
                                                                                                                                                      aria-hidden="true"><circle
                    cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10"></path><path
                    d="M12 2a15 15 0 0 0-4 10 15 15 0 0 0 4 10"></path></svg></span><span className="bottom-sheet-title-label">Connect to Network</span></div>
            </div>
            <div className="bottom-sheet-body">
                <div className="connect-tab-panel active" id="connect-public-panel" role="tabpanel" aria-labelledby="connect-tab-public">
                    <div className="public-server-list" id="public-server-list">
                        <button type="button" className="public-server-card public-server-card--ruby" aria-label="Connect Ruby" title="Connect Ruby"><span
                            className="public-server-mark public-server-mark--gem" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path
                            d="M7.2 3h9.6L22 8.8 12 21 2 8.8 7.2 3Z"></path><path d="M7.2 3 9.5 8.8 12 21"></path><path d="M16.8 3 14.5 8.8 12 21"></path><path
                            d="M2 8.8h20"></path><path d="M9.5 8.8 12 3l2.5 5.8"></path></svg></span><span className="public-server-main"><span
                            className="public-server-name">Ruby</span><span className="public-server-tags"><span
                            className="public-server-tag">OFFICIAL</span></span></span><span className="public-server-action" aria-hidden="true"><svg viewBox="0 0 24 24"
                                                                                                                                                      aria-hidden="true"><path
                            d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span></button>
                        <button type="button" className="public-server-card public-server-card--emerald" aria-label="Connect Emerald" title="Connect Emerald"><span
                            className="public-server-mark public-server-mark--gem" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path
                            d="M7.2 3h9.6L22 8.8 12 21 2 8.8 7.2 3Z"></path><path d="M7.2 3 9.5 8.8 12 21"></path><path d="M16.8 3 14.5 8.8 12 21"></path><path
                            d="M2 8.8h20"></path><path d="M9.5 8.8 12 3l2.5 5.8"></path></svg></span><span className="public-server-main"><span
                            className="public-server-name">Emerald</span><span className="public-server-tags"><span
                            className="public-server-tag">OFFICIAL</span></span></span><span className="public-server-action" aria-hidden="true"><svg viewBox="0 0 24 24"
                                                                                                                                                      aria-hidden="true"><path
                            d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span></button>
                        <button type="button" className="public-server-card public-server-card--diamond" aria-label="Connect Diamond" title="Connect Diamond"><span
                            className="public-server-mark public-server-mark--gem" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path
                            d="M7.2 3h9.6L22 8.8 12 21 2 8.8 7.2 3Z"></path><path d="M7.2 3 9.5 8.8 12 21"></path><path d="M16.8 3 14.5 8.8 12 21"></path><path
                            d="M2 8.8h20"></path><path d="M9.5 8.8 12 3l2.5 5.8"></path></svg></span><span className="public-server-main"><span
                            className="public-server-name">Diamond</span><span className="public-server-tags"><span
                            className="public-server-tag">OFFICIAL</span></span></span><span className="public-server-action" aria-hidden="true"><svg viewBox="0 0 24 24"
                                                                                                                                                      aria-hidden="true"><path
                            d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span></button>
                        <button type="button" className="public-server-card public-server-card--beleth" aria-label="Connect Beleth" title="Connect Beleth"><span
                            className="public-server-mark" aria-hidden="true">B</span><span className="public-server-main"><span
                            className="public-server-name">Beleth</span><span className="public-server-tags"><span
                            className="public-server-tag">UNOFFICIAL</span></span></span><span
                            className="public-server-action" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path><path
                            d="m13 6 6 6-6 6"></path></svg></span></button>
                        <button type="button" className="public-server-card public-server-card--rmap" aria-label="Connect RMAP" title="Connect RMAP"><span
                            className="public-server-mark" aria-hidden="true">R</span><span className="public-server-main"><span className="public-server-name">RMAP</span><span
                            className="public-server-tags"><span className="public-server-tag">UNOFFICIAL</span></span></span><span className="public-server-action"
                                                                                                                                    aria-hidden="true"><svg viewBox="0 0 24 24"
                                                                                                                                                            aria-hidden="true"><path
                            d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span></button>
                    </div>
                </div>

                <div className="connect-tab-panel active" id="connect-custom-panel" role="tabpanel" aria-labelledby="connect-tab-custom">
                    <div className="modal-field" id="connect-quick-field">
                        <label>Quick Connect</label>
                        <div className="quick-connect-options" id="quick-connect-list">
                            <div id="qc-empty" className="inline-hint" style={{padding: "8px 0"}}>No saved custom connections. Connect to a node below to save it here.</div>
                        </div>
                    </div>
                    <div className="modal-field">
                        <label>Host</label>
                        <input type="text" id="connect-host" className="modal-input" placeholder="e.g. rns.ratspeak.org" autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"/>
                    </div>
                    <div className="modal-field">
                        <label>Port</label>
                        <input type="number" id="connect-port" className="modal-input" placeholder="4242" min="1" max="65535" autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"/>
                    </div>
                    <div className="modal-field" id="connect-name-field" style={{display: "none"}}>
                        <label>Name</label>
                        <input type="text" id="connect-name" className="modal-input" placeholder="Ratspeak Hub" maxLength="32" autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"/>
                    </div>
                    <label className="rs-dialog-checkbox-wrap mt-4" id="connect-backbone-row" style={{display: "none"}}>
                        <input type="checkbox" id="connect-use-backbone" className="rs-dialog-checkbox"/>
                        <span className="rs-dialog-checkbox-label">Experimental: Use Backbone</span>
                    </label>
                    <label className="rs-dialog-checkbox-wrap mt-4" id="connect-ifac-row" style={{display: "none"}}>
                        <input type="checkbox" id="connect-use-ifac" className="rs-dialog-checkbox" data-bound="1"/>
                        <span className="rs-dialog-checkbox-label">Use IFAC</span>
                    </label>
                    <div id="connect-ifac-fields" style={{display: "none"}}>
                        <div className="modal-field">
                            <label>IFAC Network Name</label>
                            <input type="text" id="connect-ifac-network-name" className="modal-input" placeholder="Optional" maxLength="128" autoCorrect="off"
                                   autoCapitalize="none" spellCheck="false"/>
                        </div>
                        <div className="modal-field">
                            <label>IFAC Passphrase</label>
                            <input type="password" id="connect-ifac-passphrase" className="modal-input" placeholder="Required for most IFAC networks" maxLength="256"
                                   autoCorrect="off" autoCapitalize="none" spellCheck="false"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-sheet-footer">
                <a href={"#network"} className="rs-dialog-cancel">Cancel</a>
                <button className="rs-dialog-confirm">Connect</button>
            </div>
        </>
    }
}
