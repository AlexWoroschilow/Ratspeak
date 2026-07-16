"use strict";
import React from "react";

interface NetworkLocalProps {
}

interface NetworkLocalState {
}

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
export class NetworkLocal extends React.Component<NetworkLocalProps, NetworkLocalState> {
    constructor(props: NetworkLocalProps) {
        super(props);
    }

    render() {

        return <>
            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="local"><span className="bottom-sheet-title-icon"><svg viewBox="0 0 24 24"
                                                                                                                                                        aria-hidden="true"><path
                    d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><circle cx="12" cy="20"
                                                                                                                                                               r="1"
                                                                                                                                                               fill="currentColor"
                                                                                                                                                               stroke="none"></circle></svg></span><span
                    className="bottom-sheet-title-label">Local Network</span></div>
            </div>
            <div className="bottom-sheet-body"><label className="rs-dialog-field-label">Name</label><input type="text" className="rs-dialog-input" placeholder="Local Network"
                                                                                                           autoCorrect="off" autoCapitalize="none" spellCheck="false"
                                                                                                           maxLength="64"/>
                <div className="rs-dialog-field-help">Display name for this interface.</div>
                <label className="rs-dialog-field-label">Group ID</label><input type="text" className="rs-dialog-input" placeholder="reticulum" autoCorrect="off"
                                                                                autoCapitalize="none" spellCheck="false" maxLength="63"/>
                <div className="rs-dialog-field-help">Devices with the same Group ID auto-discover each other; different IDs create isolated subnets on the same physical
                    network.
                </div>
                <details style={{marginTop: "var(--space-3)"}} open="">
                    <summary className="rs-dialog-advanced-summary">Advanced</summary>
                    <div style={{paddingTop: "var(--space-2)"}}>
                        <label className="rs-dialog-field-label">Discovery Scope</label>
                        <select className="rs-dialog-input">
                            <option value="link">Link (default — same Wi-Fi / LAN)</option>
                            <option value="admin">Admin (administrative boundary)</option>
                            <option value="site">Site (cross-router within a site)</option>
                            <option value="organisation">Organisation</option>
                            <option value="global">Global (Internet IPv6 multicast)</option>
                        </select>
                        <div className="rs-dialog-field-help">Most users want Link. Site/Global require IPv6 multicast routing in the upstream network.</div>
                        <label className="rs-dialog-field-label">Multicast Address Type</label>
                        <select className="rs-dialog-input">
                            <option value="temporary">Temporary (default — RFC 4291 transient)</option>
                            <option value="permanent">Permanent (well-known IANA prefix)</option>
                        </select>
                        <div className="rs-dialog-field-help">Most users want Temporary. Permanent reserves a stable group address.</div>
                        <label className="rs-dialog-field-label">Discovery Port</label><input type="number" className="rs-dialog-input" placeholder="29716" min="1"
                                                                                              max="65535"/><label className="rs-dialog-field-label">Data Port</label><input
                        type="number" className="rs-dialog-input" placeholder="42671" min="1" max="65535"/>
                        <div className="rs-dialog-field-help">Must differ from Discovery Port. Both must be free.</div>
                        <label className="rs-dialog-field-label">Network Interfaces</label>
                        <div style={{display: "flex", flexDirection: "column", gap: "var(--space-1)", marginBottom: "var(--space-2)"}}>
                            <div className="inline-warning">Could not enumerate interfaces.</div>
                        </div>
                        <div className="rs-dialog-field-help">Leave all unchecked to use all available NICs (excluding loopback + platform-ignored).</div>
                        <label className="rs-dialog-field-label">Bitrate Override (Mbps, optional)</label><input type="number" className="rs-dialog-input" placeholder="10"
                                                                                                                 min="1"/>
                        <div className="rs-dialog-field-help">Reported bitrate for transport announce-cap calculation. Default 10 Mbps.</div>
                    </div>
                </details>
            </div>
            <div className="bottom-sheet-footer">
                <a href={"#network"} className="rs-dialog-cancel">Cancel</a>
                <button className="rs-dialog-confirm">Enable</button>
            </div>
        </>
    }
}
