"use strict";
import React from "react";
import {Switcher} from "../components/Switcher";

interface GeneralProps {
}

interface GeneralState {
}

export class General extends React.Component<GeneralProps, GeneralState> {
    constructor(props: GeneralProps) {
        super(props);
    }

    render() {

        return <>
            <section className="settings-detail-pane" aria-labelledby="settings-detail-title">
                <div className="settings-page-inner settings-detail-panels">
                    <div className="panel settings-panel settings-panel-selected" id="panel-settings-general" aria-hidden="false">
                        <div className="panel-header">General</div>
                        <div className="panel-body">
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Theme</span>
                                    <span className="settings-row-desc">Choose light, dark, or match your system</span>
                                </div>
                                <div className="theme-toggle" id="theme-toggle">
                                    <button className="theme-toggle-btn" data-theme="light" aria-label="Light theme">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <circle cx="12" cy="12" r="5"></circle>
                                            <line x1="12" y1="1" x2="12" y2="3"></line>
                                            <line x1="12" y1="21" x2="12" y2="23"></line>
                                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                            <line x1="1" y1="12" x2="3" y2="12"></line>
                                            <line x1="21" y1="12" x2="23" y2="12"></line>
                                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                        </svg>
                                    </button>
                                    <button className="theme-toggle-btn active" data-theme="auto" aria-label="System theme">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                                            <line x1="8" y1="21" x2="16" y2="21"></line>
                                            <line x1="12" y1="17" x2="12" y2="21"></line>
                                        </svg>
                                    </button>
                                    <button className="theme-toggle-btn" data-theme="dark" aria-label="Dark theme">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Vibration</span>
                                    <span className="settings-row-desc">Enable haptic feedback for taps and gestures</span>
                                </div>
                                <Switcher/>
                            </div>
                            <div className="settings-row" id="settings-row-notifications">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Desktop Notifications</span>
                                    <span className="settings-row-desc">Show a system notification when a new message arrives while Ratspeak is in the background</span>
                                </div>
                                <Switcher/>
                            </div>
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Developer Mode</span>
                                    <span className="settings-row-desc">Show advanced developer settings when available.</span>
                                </div>
                                <Switcher/>
                            </div>
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Block List</span>
                                    <span className="settings-row-desc">Manage blocked users</span>
                                </div>
                                <button className="selector-badge selector-badge-no-caret" id="settings-blocked-count">Manage</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    }
}
