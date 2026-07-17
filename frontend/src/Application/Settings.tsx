"use strict";
import React from "react";
import {General} from "./Settings/General";
import {System} from "./Settings/System";
import {Inbox} from "./Settings/Inbox";
import {Privacy} from "./Settings/Privacy";
import {Identity} from "./Settings/Identity";
import {Network} from "./Settings/Network";

interface SettingsProps {
}


interface SettingsState {
    screen: "general" | "inbox" | "system" | "privacy" | "identity" | "network";
}

export class Settings extends React.Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps) {
        super(props);

        this.state = {
            screen: "general"
        }
    }


    route(screen) {
        this.setState({
            screen: screen
        })
    }

    render() {

        return <>

            <div className="view" id="view-settings">
                <div className="settings-page settings-detail-mode">
                    <div className="settings-page-shell">
                        <aside className="settings-sidebar-panel" aria-label="Settings sections">
                            <div className="settings-sidebar-header">
                                <span className="settings-sidebar-title">Settings</span>
                            </div>
                            <nav className="settings-nav" id="settings-section-nav">
                                <a onClick={() => this.route("general")}
                                   className={`settings-nav-item ${this.state.screen == "general" && "active"}`}
                                   type="button"
                                   aria-current="page"
                                   data-settings-panel="panel-settings-general"
                                   data-settings-title="General" data-settings-desc="Theme, haptics, notifications, and block list.">
                                    <span className="settings-nav-label">General</span>
                                    <span className="settings-nav-desc">Theme, vibration, notifications, and blocks</span>
                                </a>
                                <a onClick={() => this.route("identity")}
                                   className={`settings-nav-item ${this.state.screen == "identity" && "active"}`}
                                   type="button" data-settings-panel="panel-settings-identity"
                                   data-settings-title="Identity"
                                   data-settings-desc="Active identity, status, backup, and recovery.">
                                    <span className="settings-nav-label">Identity</span>
                                    <span className="settings-nav-desc">Active identity, status, backup, and recovery</span>
                                </a>
                                <a onClick={() => this.route("privacy")}
                                   className={`settings-nav-item ${this.state.screen == "privacy" && "active"}`}
                                   type="button" data-settings-panel="panel-settings-privacy"
                                   data-settings-title="Privacy"
                                   data-settings-desc="Privacy related preferences">
                                    <span className="settings-nav-label">Privacy</span>
                                    <span className="settings-nav-desc">Privacy related preferences</span>
                                </a>
                                <a onClick={() => this.route("network")}
                                   className={`settings-nav-item ${this.state.screen == "network" && "active"}`}
                                   type="button" data-settings-panel="panel-settings-network"
                                   data-settings-title="Network"
                                   data-settings-desc="Transport behavior and announce cadence.">
                                    <span className="settings-nav-label">Network</span>
                                    <span className="settings-nav-desc">Transport behavior and announce cadence</span>
                                </a>
                                <a onClick={() => this.route("inbox")}
                                   className={`settings-nav-item ${this.state.screen == "inbox" && "active"}`}
                                   type="button" data-settings-panel="panel-settings-offline-inbox"
                                   data-settings-title="Offline Inbox"
                                   data-settings-desc="Offline Inbox status and offline message storage.">
                                    <span className="settings-nav-label">Offline Inbox</span>
                                    <span className="settings-nav-desc">Offline message storage and relay status</span>
                                </a>
                                <a onClick={() => this.route("system")}
                                   className={`settings-nav-item ${this.state.screen == "system" && "active"}`}
                                   type="button" data-settings-panel="panel-settings-system"
                                   data-settings-title="System"
                                   data-settings-desc="Developer and reset controls.">
                                    <span className="settings-nav-label">System</span>
                                    <span className="settings-nav-desc">Developer and reset controls</span>
                                </a>
                            </nav>
                            <div className="settings-sidebar-version" id="settings-version-sidebar" aria-label="App version"></div>
                            <div className="system-data-tip" role="note">
                            <span className="system-data-tip-icon" aria-hidden="true">
                                <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                    <circle cx="8" cy="3.5" r="1.4"/>
                                    <rect x="6.7" y="6.2" width="2.6" height="6.3" rx="1.1"/>
                                </svg>
                            </span>
                                <span className="system-data-tip-copy">Tip: Click and hold the send button on a message to choose its delivery type.</span>
                            </div>
                        </aside>
                        <section className="settings-detail-pane" aria-labelledby="settings-detail-title">
                            <div className="settings-mobile-detail-bar">
                                <button className="settings-mobile-back-btn" id="settings-mobile-back-btn" type="button" aria-label="Back to settings sections">
                                    <svg className="settings-mobile-back-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25"
                                         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M15 18l-6-6 6-6"/>
                                    </svg>
                                    <span>Settings</span>
                                </button>
                                <div className="settings-mobile-detail-copy">
                                    <span className="settings-mobile-detail-eyebrow">Section</span>
                                    <h2 id="settings-mobile-detail-title">General</h2>
                                </div>
                            </div>

                            {this?.state?.screen == "general" && <General/>}
                            {this?.state?.screen == "inbox" && <Inbox/>}
                            {this?.state?.screen == "system" && <System/>}
                            {this?.state?.screen == "privacy" && <Privacy/>}
                            {this?.state?.screen == "identity" && <Identity/>}
                            {this?.state?.screen == "network" && <Network/>}
                        </section>
                    </div>
                </div>
            </div>
        </>
    }
}
