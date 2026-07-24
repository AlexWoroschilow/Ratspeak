"use strict";
import React from "react";


import "./Network.scss";
import {Activity} from "./Network/Activity";
import {inject, observer} from "mobx-react";


import {Network as NetworkStore, NetworkLogStatus} from "../ApplicationStore/Network";
import {BallTriangle} from "react-loader-spinner";
import {Status} from "./Network/Status";

interface NetworkProps {
    network?: NetworkStore;
}

interface NetworkState {
    status?: NetworkLogStatus | undefined;
}


@inject("network")
@observer
export class Network extends React.Component<NetworkProps, NetworkState> {
    constructor(props: NetworkProps) {
        super(props);

        this.state = {
            status: props?.network?.status
        }
    }

    doToggleActivity() {
        const {network} = this.props;

        network?.doToggleNetworkLog?.(!this.state.status?.enabled)
            .then((status: NetworkLogStatus) => {
                return this.setState({
                    status: status
                });
            });

        return this.setState({
            status: {
                ...this.state.status, ...{
                    enabled: undefined
                }
            } as NetworkLogStatus
        });
    }

    doClearActivity() {
        const {network} = this.props;
        network?.doClearNetworkLog().then(() => {

        });
    }

    render() {

        const {network} = this.props;

        return <>

            <div className="view" id="view-network">
                <div className="network-layout">
                    <Status/>
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
                                    {(this?.state?.status?.enabled === true) && <>
                                        &nbsp;({network?.logs?.length})
                                    </>}
                                </span>

                                <label className="prop-toggle activity-toggle">
                                    {(this?.state?.status?.enabled === undefined) && <>
                                        <BallTriangle
                                            color="#000000"
                                            height={20}
                                            width={20}
                                        />
                                    </>}
                                    {(this?.state?.status?.enabled !== undefined) && <>
                                        <input type="checkbox" id="activity-enabled-toggle" checked={this?.state?.status?.enabled}
                                               onChange={this.doToggleActivity.bind(this)}/>
                                        <span className="prop-slider"></span>
                                    </>}
                                </label>

                                {(this?.state?.status?.enabled === true) &&
                                    <div className="activity-controls">
                                        <button className="nr-btn nr-btn-xs" id="activity-clear-btn"
                                                onClick={this.doClearActivity.bind(this)}>
                                            Clear
                                        </button>
                                    </div>}
                            </div>

                            {(this?.state?.status?.enabled === true) && <>
                                <Activity status={this?.state?.status}/>
                            </>}

                            {(this?.state?.status?.enabled === false) &&
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
