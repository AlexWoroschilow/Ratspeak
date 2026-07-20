"use strict";
import React from "react";

export interface LoRaSettingsProps {
    onReset?: () => {}
}

interface LoRaSettingsLoRaState {
}

export class LoRaSettings extends React.Component<LoRaSettingsProps, LoRaSettingsLoRaState> {
    constructor(props: LoRaSettingsProps) {
        super(props);
    }

    render() {

        return <>
            <div id="rnode-step-2">
                <div className="modal-field">
                    <label>Name</label>
                    <input type="text" id="rnode-iface-name" className="modal-input" placeholder="My LoRa Radio" maxLength={32} autoCorrect="off" autoCapitalize="none"
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
            </div>

            <div className="bottom-sheet-footer">
                {(this?.props?.onReset != undefined) &&
                    <a className="rs-dialog-cancel"
                       onClick={this.props.onReset}>
                        Back
                    </a>}

                <button className="rs-dialog-confirm">Add Radio</button>
            </div>

        </>
    }
}
