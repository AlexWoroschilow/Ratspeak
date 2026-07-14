"use strict";
import React from "react";

interface NetworkRadioProps {
}

interface NetworkRadioState {
}


export class NetworkRadio extends React.Component<NetworkRadioProps, NetworkRadioState> {
    constructor(props: NetworkRadioProps) {
        super(props);
    }

    render() {

        return <>
            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" id="rnode-modal-title" data-sheet-icon="lora"><span className="bottom-sheet-title-icon"><svg
                    viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20v-14"></path><path d="M12 6l-3 3"></path><path d="M12 6l3 3"></path><path
                    d="M6 14a6 6 0 0 0 0-6"></path><path d="M18 14a6 6 0 0 1 0-6"></path><path d="M3 16a10 10 0 0 0 0-10"></path><path
                    d="M21 16a10 10 0 0 1 0-10"></path></svg></span><span
                    className="bottom-sheet-title-label">Add LoRa Device</span></div>
                <button className="bottom-sheet-close" id="rnode-modal-close" aria-label="Close dialog">×</button>
            </div>
            <div className="bottom-sheet-body">

                <div id="rnode-step-1">
                    <div className="sheet-segmented-tabs rnode-conn-toggle">
                        <button type="button" id="rnode-toggle-ble" className="active needs-install" title="Connect via Bluetooth Low Energy">Bluetooth<span
                            className="toggle-hint" id="rnode-ble-hint">unavailable</span></button>
                        <button type="button" id="rnode-toggle-serial" title="Connect via USB cable">USB / Serial</button>
                        <button type="button" id="rnode-toggle-android-usb" style={{display: "none"}} title="Connect via USB-OTG">USB</button>
                        <button type="button" id="rnode-toggle-tcp" title="Connect to an RNode TCP server">TCP</button>
                    </div>

                    <div id="rnode-ble-section" style={{marginTop: "12px"}}>
                        <div id="rnode-ble-ready">
                            <div className="rnode-pairing-tip">Tip: enable pairing mode on your device before connecting if unpaired.</div>
                            <div className="ble-device-list" id="ble-device-list">
                                <div className="ble-scan-placeholder">Click "Scan" to find nearby RNode devices.</div>
                            </div>
                            <div id="rnode-handoff-hint-ble" className="rnode-handoff-hint" style={{display: "none"}}>Connecting will disconnect your active USB LoRa radio.
                            </div>
                        </div>
                    </div>

                    <div id="rnode-serial-section" style={{display: "none", marginTop: "12px"}}>
                        <div className="u-flex gap-2">
                            <select id="rnode-port" className="nr-select flex-1">
                                <option value="">Select device...</option>
                            </select>
                            <button className="nr-btn nr-btn-xs" id="rnode-refresh-btn" aria-label="Refresh serial ports" title="Refresh ports">↻</button>
                        </div>
                    </div>

                    <div id="rnode-android-usb-section" style={{display: "none", marginTop: "12px"}}>
                        <div className="ble-device-list" id="android-usb-device-list">
                            <div className="ble-scan-placeholder">Plug in your RNode via a USB-C OTG cable, then tap "Refresh".</div>
                        </div>
                        <button className="nr-btn w-full mt-3" id="android-usb-refresh-btn">Refresh</button>
                        <div id="rnode-handoff-hint-usb" className="rnode-handoff-hint" style={{display: "none"}}>Connecting will disconnect your active Bluetooth LoRa radio.
                        </div>
                    </div>

                    <div id="rnode-tcp-section" style={{display: "none", marginTop: "12px"}}>
                        <div className="modal-field">
                            <label>TCP Endpoint</label>
                            <input type="text" id="rnode-tcp-endpoint" className="modal-input" placeholder="192.168.1.50:7633" inputMode="url" autoComplete="off"
                                   autoCorrect="off" autoCapitalize="none" spellCheck="false"/>
                        </div>
                        <p className="inline-hint-sm mt-3" style={{marginBottom: 0}}>Use host or host:port. Default port 7633.</p>
                    </div>

                    <div className="bottom-sheet-footer">
                        <a href={"#network"} className="rs-dialog-cancel">Cancel</a>
                        <button className="rs-dialog-confirm">Start Scan</button>
                        <button className="rs-dialog-confirm">Next</button>
                    </div>
                </div>

                <div id="rnode-step-2" style={{display: "none"}}>
                    <div className="modal-field">
                        <label>Name</label>
                        <input type="text" id="rnode-iface-name" className="modal-input" placeholder="My LoRa Radio" maxLength="32" autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"/>
                    </div>
                    <div className="modal-field">
                        <label>Band / Region</label>
                        <select id="rnode-region" className="nr-select"></select>
                    </div>
                    <div className="modal-field">
                        <label>Frequency</label>
                        <div className="rnode-frequency-row">
                            <input type="text" id="rnode-frequency" className="modal-input flex-1" inputMode="decimal" placeholder="915.000" autoCorrect="off"
                                   autoCapitalize="none" spellCheck="false"/>
                            <span className="rnode-frequency-unit">MHz</span>
                        </div>
                        <span className="inline-hint-sm" id="rnode-frequency-hint">Custom center frequency. Config is written in Hz.</span>
                        <div className="rnode-radio-warning" id="rnode-frequency-warning" style={{display: "none"}}></div>
                    </div>
                    <div className="modal-field">
                        <label>Preset</label>
                        <select id="rnode-preset" className="nr-select"></select>
                        <span className="inline-hint-sm" id="rnode-preset-hint">Custom radio parameters.</span>
                    </div>
                    <div className="modal-field" id="rnode-mode-field" style={{display: "none"}}>
                        <label>Interface Mode</label>
                        <select id="rnode-interface-mode" className="nr-select">
                            <option value="full">Full</option>
                            <option value="gateway">Gateway</option>
                            <option value="access_point">Access Point (AP)</option>
                            <option value="boundary">Boundary</option>
                            <option value="roaming">Roaming</option>
                        </select>
                        <span className="inline-hint-sm">Mode affects routing and announce propagation.</span>
                    </div>

                    <details id="rnode-advanced" className="rnode-advanced-details">
                        <summary className="rs-dialog-advanced-summary">Advanced radio parameters</summary>
                        <div className="rnode-advanced-grid">
                            <div className="modal-field">
                                <label>Bandwidth</label>
                                <div className="rnode-frequency-row">
                                    <input type="text" id="rnode-bandwidth" className="modal-input flex-1" inputMode="decimal" placeholder="250" autoCorrect="off"
                                           autoCapitalize="none" spellCheck="false"/>
                                    <span className="rnode-frequency-unit">kHz</span>
                                </div>
                            </div>
                            <div className="modal-field">
                                <label>Spreading Factor</label>
                                <input type="number" id="rnode-spreading-factor" className="modal-input" min="5" max="12" step="1" inputMode="numeric" placeholder="9"/>
                            </div>
                            <div className="modal-field">
                                <label>Coding Rate</label>
                                <input type="number" id="rnode-coding-rate" className="modal-input" min="5" max="8" step="1" inputMode="numeric" placeholder="5"/>
                            </div>
                            <div className="modal-field">
                                <label>TX Power</label>
                                <div className="rnode-frequency-row">
                                    <input type="number" id="rnode-tx-power" className="modal-input flex-1" min="0" max="37" step="1" inputMode="numeric" placeholder="17"/>
                                    <span className="rnode-frequency-unit">dBm</span>
                                </div>
                            </div>
                            <div className="modal-field">
                                <label>Airtime limit, short-term (%)</label>
                                <input type="number" id="rnode-airtime-short" className="modal-input" min="0" max="100" step="0.1" inputMode="decimal" placeholder="No limit"/>
                            </div>
                            <div className="modal-field">
                                <label>Airtime limit, long-term (%)</label>
                                <input type="number" id="rnode-airtime-long" className="modal-input" min="0" max="100" step="0.1" inputMode="decimal" placeholder="No limit"/>
                            </div>
                        </div>
                        <div className="inline-hint-sm rnode-advanced-hint">Use custom values only when every node on the link will use the same frequency, bandwidth, spreading
                            factor, and coding rate.
                        </div>
                    </details>

                    <div className="modal-field rnode-public-map-section" id="rnode-public-map-section" style={{display: "none"}}>
                        <div className="rnode-setting-row">
                            <div className="rnode-setting-copy">
                                <label className="rnode-setting-label" htmlFor="rnode-public-map-enabled">Display on public map</label>
                            </div>
                            <label className="prop-toggle rnode-public-map-toggle" aria-label="Display on public map">
                                <input type="checkbox" id="rnode-public-map-enabled"/>
                                <span className="prop-slider"></span>
                            </label>
                        </div>
                        <div className="rnode-public-map-controls" id="rnode-public-map-controls" style={{display: "none"}}>
                            <div className="rnode-public-map-grid">
                                <div className="modal-field">
                                    <label>Latitude</label>
                                    <input type="text" id="rnode-public-map-latitude" className="modal-input" inputMode="decimal" placeholder="39.7392" autoCorrect="off"
                                           autoCapitalize="none" spellCheck="false"/>
                                </div>
                                <div className="modal-field">
                                    <label>Longitude</label>
                                    <input type="text" id="rnode-public-map-longitude" className="modal-input" inputMode="decimal" placeholder="-104.9903" autoCorrect="off"
                                           autoCapitalize="none" spellCheck="false"/>
                                </div>
                            </div>
                            <div className="rnode-public-map-actions">
                                <button type="button" className="nr-btn nr-btn-sm nr-btn-ghost" id="rnode-public-map-use-current">Use current location</button>
                                <span className="inline-hint-sm rnode-public-map-status" id="rnode-public-map-status"></span>
                            </div>
                            <div className="rs-dialog-field-error" id="rnode-public-map-error" style={{display: "none"}}></div>
                        </div>
                    </div>

                    <div className="u-flex gap-4 mt-7">
                        <button type="button" className="nr-btn nr-btn-ghost" id="rnode-back-btn">Back</button>
                        <button className="nr-btn flex-1" id="rnode-submit-btn">Add Radio</button>
                    </div>
                </div>
            </div>

        </>
    }
}
