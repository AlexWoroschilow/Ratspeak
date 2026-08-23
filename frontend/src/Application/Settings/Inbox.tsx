"use strict";
import React from "react";
import {Switcher} from "../components/Switcher";
import {Settings as SettingsStore} from "../../ApplicationStore/Settings";
import {inject, observer} from "mobx-react";

interface InboxProps {
    settings?: SettingsStore | undefined;
}

interface InboxState {
}

@inject("settings")
@observer
export class Inbox extends React.Component<InboxProps, InboxState> {
    constructor(props: InboxProps) {
        super(props);
    }

    render() {
        const {settings} = this.props;
        const {generalSettings} = settings || {};

        return <>
            <section className="settings-detail-pane" aria-labelledby="settings-detail-title">
                <div className="settings-page-inner settings-detail-panels">


                    <div className="panel settings-panel settings-panel-selected" id="panel-settings-offline-inbox" aria-hidden="false">
                        <div className="panel-header">
                            Offline Inbox
                            <span className="panel-header-dot" id="settings-relay-dot"></span>
                        </div>
                        <div className="panel-body">
                            <div className="settings-row" style={{borderBottom: "none"}}>
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Offline Inbox</span>
                                    <span className="settings-row-desc">Store messages on an Offline Inbox when you're away</span>
                                </div>
                                <span id="settings-relay-status" className="settings-relay-badge">Not connected</span>
                            </div>
                            <div id="settings-propagation-status">
                                <label className="settings-row">
                                    <div className="settings-row-info">
                                        <span className="settings-row-desc">When contacts can't reach you directly, your Offline Inbox stores their messages until you come back online.</span>
                                    </div>
                                    <Switcher states={[
                                        {value: "on", name: "On"},
                                        {value: "auto", name: "Auto", isDefault: true},
                                        {value: "off", name: "Off"},
                                    ]}/>
                                </label>

                                <label className="settings-row">
                                    <div className="settings-row-info">
                                        <span className="settings-row-label">Favor Ratspeak inbox nodes</span><span className="settings-row-desc">Prefer reachable Ratspeak inbox nodes, with fallback when none can be reached.</span>
                                    </div>
                                    <Switcher/>
                                </label>

                                <div className="relay-card relay-card-empty">
                                    <div className="inline-hint">Looking for a reachable Offline Inbox…</div>
                                </div>
                                <div className="relay-advanced-block">
                                    <div className="propagation-section-title">Hosted Offline Inbox</div>
                                    <div className="settings-row propagation-settings-row">
                                        <div className="settings-row-info">
                                            <span className="settings-row-label">Host inbox node</span>
                                            <span className="settings-row-desc">Store offline LXMF messages for other people using this device.</span>
                                        </div>
                                        <Switcher/>
                                    </div>
                                </div>
                                <details className="relay-advanced-block relay-details">
                                    <summary>Message stamp protection</summary>
                                    <div className="settings-row propagation-settings-row">
                                        <div className="settings-row-info"><span className="settings-row-label">Require stamps</span>
                                            <span className="settings-row-desc">Advertise and require proof-of-work on messages sent directly to you.</span>
                                        </div>
                                        <Switcher/>
                                    </div>
                                    <div className="settings-row propagation-settings-row" style={{borderBottom: "none"}}>
                                        <div className="settings-row-info">
                                            <span className="settings-row-label">Required work</span><span className="settings-row-desc">Higher values make spam harder but slow down senders.</span>
                                        </div>
                                        <Switcher/>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    }
}
