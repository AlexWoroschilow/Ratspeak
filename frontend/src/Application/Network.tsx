"use strict";
import React from "react";


import "./Network.scss";
import {Activity} from "./Network/Activity";
import {inject, observer} from "mobx-react";
import {ApplicationStore} from "../ApplicationStore";
import {info} from "@tauri-apps/plugin-log";


import {Network as NetworkStore} from "../ApplicationStore/Network";

interface NetworkProps {
    network?: NetworkStore;
}

interface NetworkState {
    isEnabledActivity: boolean;
}


@inject("network")
@observer
export class Network extends React.Component<NetworkProps, NetworkState> {
    constructor(props: NetworkProps) {
        super(props);

        this.state = {
            isEnabledActivity: false
        }
    }

    doToggleActivity() {
        this.setState({
            isEnabledActivity: !this.state.isEnabledActivity
        })
    }

    render() {

        const {network} = this.props;
        let collection = network?.logs || [];

        return <>

            <div className="view" id="view-network">
                <div className="network-layout">
                    <div className="network-pulse" id="network-pulse">
                        <div className="pulse-identity" id="pulse-identity">
                            <div className="loading-state"><span className="loading-spinner"></span></div>
                        </div>
                        <div className="pulse-throughput">
                        <span className="pulse-throughput-item" title="Total uploaded">
                            <span className="pulse-throughput-arrow" aria-hidden="true">&uarr;</span>
                            <span className="pulse-throughput-value" id="net-stat-tx">0 B</span>
                        </span>
                            <span className="pulse-throughput-item" title="Total downloaded">
                            <span className="pulse-throughput-arrow" aria-hidden="true">&darr;</span>
                            <span className="pulse-throughput-value" id="net-stat-rx">0 B</span>
                        </span>
                        </div>
                        <div className="pulse-actions">
                            <button className="pulse-announce-btn" id="network-announce-btn">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" aria-hidden="true">
                                    <path d="M3 11l18-8-8 18-2-8-8-2z"/>
                                </svg>
                                <span>Announce</span>
                            </button>
                        </div>
                    </div>
                    {/**/}
                    <div className="network-subtabs" id="network-subtabs">
                        <button className="network-subtab-btn active" data-subtab="connections">Connections</button>
                        <button className="network-subtab-btn" data-subtab="activity">Activity</button>
                    </div>
                    {/**/}
                    <div className="network-main">
                        <div className="network-connections">
                            <div className="conn-section conn-section-tcp collapsed" data-iface-type="tcp">
                                <div className="conn-section-header" role="button" aria-expanded="false">
                                    <div className="conn-section-icon">
                                        <svg viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M2 12h20"/>
                                            <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10"/>
                                            <path d="M12 2a15 15 0 0 0-4 10 15 15 0 0 0 4 10"/>
                                        </svg>
                                    </div>
                                    <span className="conn-section-label">Internet/TCP</span>
                                    <span className="conn-section-count" id="conn-count-tcp">0</span>
                                    <a href={"#network-internet"} className="nr-btn nr-btn-sm conn-section-action" id="conn-add-tcp">+</a>
                                    <svg className="conn-section-chevron" viewBox="0 0 24 24" width="16" height="16">
                                        <polyline points="6 9 12 15 18 9"/>
                                    </svg>
                                </div>
                                <div className="conn-section-body" id="conn-body-tcp"></div>
                            </div>
                            <div className="conn-section conn-section-ble collapsed" data-iface-type="ble">
                                <div className="conn-section-header" role="button" aria-expanded="false">
                                    <div className="conn-section-icon">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11"/>
                                        </svg>
                                    </div>
                                    <span className="conn-section-label">Bluetooth Peer</span>
                                    <span className="conn-section-count" id="conn-count-ble">0</span>
                                    <a href={"#network-bluetooth"} className="nr-btn nr-btn-sm conn-section-action" id="conn-toggle-ble">+</a>
                                    <svg className="conn-section-chevron" viewBox="0 0 24 24" width="16" height="16">
                                        <polyline points="6 9 12 15 18 9"/>
                                    </svg>
                                </div>
                                <div className="conn-section-body" id="conn-body-ble"></div>
                            </div>
                            <div className="conn-section conn-section-local collapsed" data-iface-type="local">
                                <div className="conn-section-header" role="button" aria-expanded="false">
                                    <div className="conn-section-icon">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                                            <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                                            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                                            <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>
                                        </svg>
                                    </div>
                                    <span className="conn-section-label">Local Network</span>
                                    <span className="conn-section-count" id="conn-count-local">0</span>
                                    <a href={"#network-local"} className="nr-btn nr-btn-sm conn-section-action" id="conn-toggle-local">+</a>
                                    <svg className="conn-section-chevron" viewBox="0 0 24 24" width="16" height="16">
                                        <polyline points="6 9 12 15 18 9"/>
                                    </svg>
                                </div>
                                <div className="conn-section-body" id="conn-body-local"></div>
                            </div>
                            <div className="conn-section conn-section-lora collapsed" data-iface-type="lora">
                                <div className="conn-section-header" role="button" aria-expanded="false">
                                    <div className="conn-section-icon">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M12 20v-14"/>
                                            <path d="M12 6l-3 3"/>
                                            <path d="M12 6l3 3"/>
                                            <path d="M6 14a6 6 0 0 0 0-6"/>
                                            <path d="M18 14a6 6 0 0 1 0-6"/>
                                            <path d="M3 16a10 10 0 0 0 0-10"/>
                                            <path d="M21 16a10 10 0 0 1 0-10"/>
                                        </svg>
                                    </div>
                                    <span className="conn-section-label">Radio</span>
                                    <span className="conn-section-count" id="conn-count-lora">0</span>
                                    <a href={"#network-radio"} className="nr-btn nr-btn-sm conn-section-action" id="conn-add-lora">+</a>
                                    <svg className="conn-section-chevron" viewBox="0 0 24 24" width="16" height="16">
                                        <polyline points="6 9 12 15 18 9"/>
                                    </svg>
                                </div>
                                <div className="conn-section-body" id="conn-body-lora"></div>
                            </div>
                            <div className="conn-section conn-section-host collapsed" data-iface-type="host">
                                <div className="conn-section-header" role="button" aria-expanded="false">
                                    <div className="conn-section-icon">
                                        <svg viewBox="0 0 24 24">
                                            <rect x="2" y="2" width="20" height="8" rx="2"/>
                                            <rect x="2" y="14" width="20" height="8" rx="2"/>
                                            <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none"/>
                                            <circle cx="6" cy="18" r="1" fill="currentColor" stroke="none"/>
                                        </svg>
                                    </div>
                                    <span className="conn-section-label">Host</span>
                                    <span className="conn-section-count" id="conn-count-host">0</span>
                                    <a href={"#network-host"} className="nr-btn nr-btn-sm conn-section-action" id="conn-add-host">+</a>
                                    <svg className="conn-section-chevron" viewBox="0 0 24 24" width="16" height="16">
                                        <polyline points="6 9 12 15 18 9"/>
                                    </svg>
                                </div>
                                <div className="conn-section-body" id="conn-body-host"></div>
                            </div>
                        </div>

                        <div className="network-activity" id="network-activity">
                            <div className="system-drops-card" id="system-drops-card" style={{display: "none"}}>
                                <div className="system-drops-header" role="button" aria-expanded="false">
                                    <svg className="system-drops-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                                    </svg>
                                    <span className="system-drops-title">System drops</span>
                                    <span className="system-drops-summary" id="system-drops-summary">0</span>
                                    <svg className="system-drops-chevron" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                                        <polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="system-drops-body" id="system-drops-body" hidden>
                                    <div className="system-drops-list" id="system-drops-list"></div>
                                    <div className="system-drops-footer">
                                        <button className="nr-btn nr-btn-xs" id="system-drops-clear-btn">Clear system drops</button>
                                        <button className="nr-btn nr-btn-xs" id="system-drops-purge-unverified-btn"
                                                title="Remove manual blocks not backed by a recent announce — cleans up pre-fix entries">Purge unverified
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="activity-header">
                                <span className="activity-title">
                                    Network Activity
                                    {(this?.state?.isEnabledActivity === true) && <>
                                        &nbsp;({network?.logs?.length})
                                    </>}
                                </span>
                                <label className="prop-toggle activity-toggle">
                                    <input type="checkbox" id="activity-enabled-toggle" checked={this?.state?.isEnabledActivity}
                                           onChange={this.doToggleActivity.bind(this)}/>
                                    <span className="prop-slider"></span>
                                </label>

                                {(this?.state?.isEnabledActivity === true) &&
                                    <div className="activity-controls">
                                        <button className="nr-btn nr-btn-xs" id="activity-clear-btn">
                                            Clear
                                        </button>
                                    </div>}
                            </div>

                            {(this?.state?.isEnabledActivity === true) && <>
                                <Activity/>
                            </>}

                            {(this?.state?.isEnabledActivity === false) &&
                                <div className="activity-privacy-gate" id="activity-privacy-gate">
                                    <svg className="activity-privacy-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                    <span className="activity-privacy-label">Privacy mode is active</span>
                                    <span
                                        className="activity-privacy-desc">No activity is being collected or saved. Enable for this session to see network events in real time.</span>
                                </div>}


                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}
