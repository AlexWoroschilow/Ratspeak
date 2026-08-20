"use strict";
import React from "react";
import {Switcher} from "../components/Switcher";

interface NetworkProps {
}


interface PrivacyNetwork {
}

export class Network extends React.Component<NetworkProps, PrivacyNetwork> {
    constructor(props: NetworkProps) {
        super(props);
    }

    render() {

        return <>
            <section className="settings-detail-pane" aria-labelledby="settings-detail-title">
                <div className="settings-page-inner settings-detail-panels">
                    <div className="panel settings-panel settings-panel-selected" id="panel-settings-network" aria-hidden="false">
                        <div className="panel-header">Network</div>
                        <div className="panel-body">
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Transport Mode</span>
                                    <span className="settings-row-desc">Relay packets for other nodes on the network</span>
                                </div>
                                <Switcher/>
                            </div>
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Auto-Announce</span>
                                    <span className="settings-row-desc">Periodically announce your presence on the network</span>
                                </div>
                                <button className="selector-badge" id="auto-announce-select">30 min</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    }
}
