"use strict";
import React from "react";

interface SettingsProps {
}

interface SettingsState {
}


export class Settings extends React.Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps) {
        super(props);
    }

    render() {

        return <>

            <div class="view" id="view-settings">
                <div class="settings-page settings-detail-mode">
                    <div class="settings-page-shell">
                        <aside class="settings-sidebar-panel" aria-label="Settings sections">
                            <div class="settings-sidebar-header">
                                <span class="settings-sidebar-title">Settings</span>
                            </div>
                            <nav class="settings-nav" id="settings-section-nav">
                                <button class="settings-nav-item active" type="button" aria-current="page" data-settings-panel="panel-settings-general"
                                        data-settings-title="General" data-settings-desc="Theme, haptics, notifications, and block list.">
                                    <span class="settings-nav-label">General</span>
                                    <span class="settings-nav-desc">Theme, vibration, notifications, and blocks</span>
                                </button>
                                <button class="settings-nav-item" type="button" data-settings-panel="panel-settings-identity" data-settings-title="Identity"
                                        data-settings-desc="Active identity, status, backup, and recovery.">
                                    <span class="settings-nav-label">Identity</span>
                                    <span class="settings-nav-desc">Active identity, status, backup, and recovery</span>
                                </button>
                                <button class="settings-nav-item" type="button" data-settings-panel="panel-settings-privacy" data-settings-title="Privacy"
                                        data-settings-desc="Privacy related preferences">
                                    <span class="settings-nav-label">Privacy</span>
                                    <span class="settings-nav-desc">Privacy related preferences</span>
                                </button>
                                <button class="settings-nav-item" type="button" data-settings-panel="panel-settings-network" data-settings-title="Network"
                                        data-settings-desc="Transport behavior and announce cadence.">
                                    <span class="settings-nav-label">Network</span>
                                    <span class="settings-nav-desc">Transport behavior and announce cadence</span>
                                </button>
                                <button class="settings-nav-item" type="button" data-settings-panel="panel-settings-offline-inbox" data-settings-title="Offline Inbox"
                                        data-settings-desc="Offline Inbox status and offline message storage.">
                                    <span class="settings-nav-label">Offline Inbox</span>
                                    <span class="settings-nav-desc">Offline message storage and relay status</span>
                                </button>
                                <button class="settings-nav-item" type="button" data-settings-panel="panel-settings-system" data-settings-title="System"
                                        data-settings-desc="Developer and reset controls.">
                                    <span class="settings-nav-label">System</span>
                                    <span class="settings-nav-desc">Developer and reset controls</span>
                                </button>
                            </nav>
                            <div class="settings-sidebar-version" id="settings-version-sidebar" aria-label="App version"></div>
                            <div class="system-data-tip" role="note">
                            <span class="system-data-tip-icon" aria-hidden="true">
                                <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                    <circle cx="8" cy="3.5" r="1.4"/>
                                    <rect x="6.7" y="6.2" width="2.6" height="6.3" rx="1.1"/>
                                </svg>
                            </span>
                                <span class="system-data-tip-copy">Tip: Click and hold the send button on a message to choose its delivery type.</span>
                            </div>
                        </aside>
                        <section class="settings-detail-pane" aria-labelledby="settings-detail-title">
                            <div class="settings-mobile-detail-bar">
                                <button class="settings-mobile-back-btn" id="settings-mobile-back-btn" type="button" aria-label="Back to settings sections">
                                    <svg class="settings-mobile-back-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25"
                                         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M15 18l-6-6 6-6"/>
                                    </svg>
                                    <span>Settings</span>
                                </button>
                                <div class="settings-mobile-detail-copy">
                                    <span class="settings-mobile-detail-eyebrow">Section</span>
                                    <h2 id="settings-mobile-detail-title">General</h2>
                                </div>
                            </div>
                            <div class="settings-detail-header">
                                <div>
                                    <span class="settings-detail-eyebrow">Ratspeak</span>
                                    <h2 id="settings-detail-title">General</h2>
                                </div>
                                <p id="settings-detail-desc">Theme, haptics, and app preferences.</p>
                            </div>
                            <div class="settings-page-inner settings-detail-panels">
                                <div class="panel settings-panel settings-panel-selected" id="panel-settings-general">
                                    <div class="panel-header">General</div>
                                    <div class="panel-body">
                                        <div class="settings-row">
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Theme</span>
                                                <span class="settings-row-desc">Choose light, dark, or match your system</span>
                                            </div>
                                            <div class="theme-toggle" id="theme-toggle">
                                                <button class="theme-toggle-btn" data-theme="light" aria-label="Light theme">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                         stroke-linecap="round">
                                                        <circle cx="12" cy="12" r="5"/>
                                                        <line x1="12" y1="1" x2="12" y2="3"/>
                                                        <line x1="12" y1="21" x2="12" y2="23"/>
                                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                                                        <line x1="1" y1="12" x2="3" y2="12"/>
                                                        <line x1="21" y1="12" x2="23" y2="12"/>
                                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                                                    </svg>
                                                </button>
                                                <button class="theme-toggle-btn" data-theme="auto" aria-label="System theme">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                         stroke-linecap="round">
                                                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                                                        <line x1="8" y1="21" x2="16" y2="21"/>
                                                        <line x1="12" y1="17" x2="12" y2="21"/>
                                                    </svg>
                                                </button>
                                                <button class="theme-toggle-btn" data-theme="dark" aria-label="Dark theme">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                         stroke-linecap="round">
                                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="settings-row">
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Vibration</span>
                                                <span class="settings-row-desc">Enable haptic feedback for taps and gestures</span>
                                            </div>
                                            <label class="prop-toggle" aria-label="Enable vibration">
                                                <input type="checkbox" id="haptics-enabled-toggle"/>
                                                <span class="prop-slider"></span>
                                            </label>
                                        </div>
                                        <div class="settings-row" id="settings-row-notifications" style={{display: "none"}}>
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Desktop Notifications</span>
                                                <span
                                                    class="settings-row-desc">Show a system notification when a new message arrives while Ratspeak is in the background</span>
                                            </div>
                                            <label class="prop-toggle" aria-label="Desktop Notifications">
                                                <input type="checkbox" id="desktop-notifications-toggle" checked/>
                                                <span class="prop-slider"></span>
                                            </label>
                                        </div>
                                        <div class="settings-row" style={{borderBottom: "none"}}>
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Block List</span>
                                                <span class="settings-row-desc">Manage blocked users</span>
                                            </div>
                                            <button class="selector-badge selector-badge-no-caret" id="settings-blocked-count">Manage</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel settings-panel" id="panel-settings-identity">
                                    <div class="panel-header">Identity</div>
                                    <div class="panel-body">
                                        <div class="settings-row">
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Active Identity</span>
                                                <span class="settings-row-desc"
                                                      id="settings-active-identity-desc">Current identity used for messages, calls, and announces.</span>
                                            </div>
                                            <button class="selector-badge selector-badge-no-caret" id="settings-manage-identities-btn">Manage</button>
                                        </div>
                                        <div class="settings-row">
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Status</span>
                                                <span class="settings-row-desc" id="settings-identity-status-desc">Not set.</span>
                                            </div>
                                            <div class="settings-row-actions">
                                                <button class="selector-badge selector-badge-no-caret" id="settings-edit-status-btn">Edit</button>
                                                <button class="selector-badge selector-badge-no-caret" id="settings-clear-status-btn" disabled>Clear</button>
                                            </div>
                                        </div>
                                        <div class="settings-row">
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Export Identity</span>
                                                <span class="settings-row-desc">Export the active software identity as a Ratspeak backup or Reticulum key.</span>
                                            </div>
                                            <button class="selector-badge selector-badge-no-caret" id="settings-backup-identity-btn">Export</button>
                                        </div>
                                        <div class="settings-row">
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Backup Identity</span>
                                                <span class="settings-row-desc">Reveal the active identity's 12-word recovery phrase.</span>
                                            </div>
                                            <button class="selector-badge selector-badge-no-caret" id="settings-view-recovery-phrase-btn">View</button>
                                        </div>
                                        <div class="settings-row" id="hw-lock-row" style={{display: "none", borderBottom: "none"}}>
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Hardware Key Auto-Lock</span>
                                                <span class="settings-row-desc">Lock a YubiKey identity after inactivity; PIN required to resume. Off relies on lock-on-quit. Applies on next unlock.</span>
                                            </div>
                                            <button class="selector-badge" id="hw-lock-timeout-select">Off</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel settings-panel" id="panel-settings-privacy">
                                    <div class="panel-header">Privacy</div>
                                    <div class="panel-body">
                                        <div class="settings-row" style={{borderBottom: "none"}}>
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Announce Ratspeak usage</span>
                                                <span class="settings-row-desc">Let others know you support games, calls, and extra features.</span>
                                            </div>
                                            <label class="prop-toggle" aria-label="Announce Ratspeak usage">
                                                <input type="checkbox" id="announce-ratspeak-usage-toggle" checked/>
                                                <span class="prop-slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel settings-panel" id="panel-settings-network">
                                    <div class="panel-header">Network</div>
                                    <div class="panel-body">
                                        <div class="settings-row">
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Transport Mode</span>
                                                <span class="settings-row-desc">Relay packets for other nodes on the network</span>
                                            </div>
                                            <button class="selector-badge" id="transport-mode-select">OFF</button>
                                        </div>
                                        <div class="settings-row">
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Auto-Announce</span>
                                                <span class="settings-row-desc">Periodically announce your presence on the network</span>
                                            </div>
                                            <button class="selector-badge" id="auto-announce-select">30 min</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel settings-panel" id="panel-settings-offline-inbox">
                                    <div class="panel-header">
                                        Offline Inbox
                                        <span class="panel-header-dot" id="settings-relay-dot"></span>
                                    </div>
                                    <div class="panel-body">
                                        <div class="settings-row" style={{borderBottom: "none"}}>
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Offline Inbox</span>
                                                <span class="settings-row-desc">Store messages on an Offline Inbox when you're away</span>
                                            </div>
                                            <span id="settings-relay-status" class="settings-relay-badge">Not connected</span>
                                        </div>
                                        <div id="settings-propagation-status"></div>
                                    </div>
                                </div>

                                <div class="panel settings-panel" id="panel-settings-system">
                                    <div class="panel-header">System</div>
                                    <div class="panel-body system-panel-body">
                                        <div class="settings-panel-section-title">System</div>
                                        <div class="settings-row">
                                            <div class="settings-row-info">
                                                <span class="settings-row-label">Developer Mode</span>
                                                <span class="settings-row-desc">Show advanced developer settings when available.</span>
                                            </div>
                                            <div class="settings-radio-group" role="radiogroup" aria-label="Developer Mode">
                                                <label class="settings-radio-option">
                                                    <input type="radio" name="settings-developer-mode" id="settings-developer-mode-off" value="off" checked/>
                                                    <span>Off</span>
                                                </label>
                                                <label class="settings-radio-option">
                                                    <input type="radio" name="settings-developer-mode" id="settings-developer-mode-on" value="on"/>
                                                    <span>On</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div class="settings-panel-section-title">Reset</div>
                                        <div class="system-subsection system-subsection--cache collapsed" id="system-section-caches">
                                            <div class="system-subsection-header" role="button" tabindex="0" aria-expanded="false" aria-controls="system-body-caches">
                                                <div class="system-subsection-meta">
                                                    <span class="system-subsection-title">Cache</span>
                                                    <span class="system-subsection-desc">Safe to clear at any time. Data re-populates automatically.</span>
                                                </div>
                                                <svg class="system-subsection-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                                                    <polyline points="6 9 12 15 18 9"/>
                                                </svg>
                                            </div>
                                            <div class="system-subsection-body" id="system-body-caches">
                                                <div class="system-subsection-body-inner">
                                                    <div class="system-action-grid">
                                                        <button class="system-action-btn" id="settings-clear-paths">
                                                            <span class="system-action-label">Clear Paths</span>
                                                            <span class="system-action-hint">Cached network routes</span>
                                                        </button>
                                                        <button class="system-action-btn" id="settings-clear-announces">
                                                            <span class="system-action-label">Clear Announces</span>
                                                            <span class="system-action-hint">Announce history</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="system-subsection system-subsection--destructive collapsed" id="system-section-delete">
                                            <div class="system-subsection-header" role="button" tabindex="0" aria-expanded="false" aria-controls="system-body-delete">
                                                <div class="system-subsection-meta">
                                                    <span class="system-subsection-title">Data</span>
                                                    <span class="system-subsection-desc">Permanently removes content. Cannot be undone.</span>
                                                </div>
                                                <svg class="system-subsection-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                                                    <polyline points="6 9 12 15 18 9"/>
                                                </svg>
                                            </div>
                                            <div class="system-subsection-body" id="system-body-delete">
                                                <div class="system-subsection-body-inner">
                                                    <div class="system-action-grid">
                                                        <button class="system-action-btn system-action-btn--danger" id="settings-clear-messages">
                                                            <span class="system-action-label">Delete Messages</span>
                                                            <span class="system-action-hint">All conversation history</span>
                                                        </button>
                                                        <button class="system-action-btn system-action-btn--danger" id="settings-clear-contacts">
                                                            <span class="system-action-label">Delete Contacts</span>
                                                            <span class="system-action-hint">All saved contacts</span>
                                                        </button>
                                                        <button class="system-action-btn system-action-btn--danger system-action-btn--danger-high"
                                                                id="settings-reset-database">
                                                            <span class="system-action-label">Delete All Data</span>
                                                            <span class="system-action-hint">Messages and contacts</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="system-subsection system-subsection--nuclear collapsed" id="system-section-factory">
                                            <div class="system-subsection-header" role="button" tabindex="0" aria-expanded="false" aria-controls="system-body-factory">
                                                <div class="system-subsection-meta">
                                                    <span class="system-subsection-title">Factory Reset</span>
                                                    <span class="system-subsection-desc">Delete everything. No going back. Fresh start.</span>
                                                </div>
                                                <svg class="system-subsection-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                                                    <polyline points="6 9 12 15 18 9"/>
                                                </svg>
                                            </div>
                                            <div class="system-subsection-body" id="system-body-factory">
                                                <div class="system-subsection-body-inner">
                                                    <button class="danger-btn danger-btn--nuclear" id="settings-factory-reset">Reset Everything</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="settings-version-system" id="settings-version-system" aria-label="App version"></div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    }
}
