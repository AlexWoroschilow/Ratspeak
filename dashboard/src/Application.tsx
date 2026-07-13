"use strict";
import React from "react";

import "./Application.scss";
import {Layout} from "./Application/Layout";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./Application/Dashboard";
import {Messages} from "./Application/Messages";
import {Contacts} from "./Application/Contacts";
import {Identity} from "./Application/Identity";
import {Peers} from "./Application/Peers";
import {Network} from "./Application/Network";
import {Settings} from "./Application/Settings";

interface ApplicationProps {
}

interface ApplicationState {
}


export class Application extends React.Component<ApplicationProps, ApplicationState> {
    constructor(props: ApplicationProps) {
        super(props);
    }

    render() {

        return <>

            <HashRouter>
                <Routes>
                    <Route element={<Layout/>}>

                        <Route index element={
                            <Dashboard/>
                        }/>

                        <Route path="dashboard" element={
                            <Dashboard/>
                        }/>

                        <Route path="messages/*" element={
                            <Messages/>
                        }/>

                        <Route path="contacts/*" element={
                            <Contacts/>
                        }/>

                        <Route path="identity/*" element={
                            <Identity/>
                        }/>

                        <Route path="peers/*" element={
                            <Peers/>
                        }/>

                        <Route path="network/*" element={
                            <Network/>
                        }/>

                        <Route path="settings/*" element={
                            <Settings/>
                        }/>

                        <Route path="*" element={
                            <h1>Error!!!</h1>
                        }/>

                    </Route>
                </Routes>
            </HashRouter>


            {/*<div class="app-layout">*/}

            {/*    <div class="sidebar-overlay" id="sidebar-overlay"></div>*/}


            {/*    <div class="bottom-sheet-overlay bottom-sheet-overlay--mobile-only" id="bottom-sheet-overlay"></div>*/}
            {/*    <div class="bottom-sheet bottom-sheet--mobile-only" id="bottom-sheet">*/}
            {/*        <div class="bottom-sheet-handle"></div>*/}
            {/*        <div class="bottom-sheet-items">*/}
            {/*            <a class="bottom-sheet-item" data-view="identity">*/}
            {/*                <svg viewBox="0 0 24 24">*/}
            {/*                    <path*/}
            {/*                        d="M2.6 17.4A2 2 0 0 0 2 18.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8A6.5 6.5 0 1 0 9.4 10.6z"/>*/}
            {/*                    <circle cx="16.5" cy="7.5" r="1.5"/>*/}
            {/*                </svg>*/}
            {/*                Identity*/}
            {/*            </a>*/}
            {/*            <a class="bottom-sheet-item" data-view="games">*/}
            {/*                <svg viewBox="0 0 24 24">*/}
            {/*                    <path d="M6 11h4M8 9v4"/>*/}
            {/*                    <line x1="15" y1="12" x2="15.01" y2="12"/>*/}
            {/*                    <line x1="18" y1="10" x2="18.01" y2="10"/>*/}
            {/*                    <path*/}
            {/*                        d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>*/}
            {/*                </svg>*/}
            {/*                Games*/}
            {/*                <span class="bottom-sheet-badge" id="bs-games-unread" style="display:none;"></span>*/}
            {/*            </a>*/}
            {/*            <a class="bottom-sheet-item" data-view="network">*/}
            {/*                <svg viewBox="0 0 24 24">*/}
            {/*                    <rect x="2" y="2" width="6" height="6" rx="1"/>*/}
            {/*                    <rect x="16" y="2" width="6" height="6" rx="1"/>*/}
            {/*                    <rect x="9" y="16" width="6" height="6" rx="1"/>*/}
            {/*                    <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/>*/}
            {/*                    <line x1="12" y1="13" x2="12" y2="16"/>*/}
            {/*                </svg>*/}
            {/*                Network*/}
            {/*            </a>*/}
            {/*            <div class="bottom-sheet-divider"></div>*/}
            {/*            <a class="bottom-sheet-item" data-view="settings">*/}
            {/*                <svg viewBox="0 0 24 24">*/}
            {/*                    <circle cx="12" cy="12" r="3"/>*/}
            {/*                    <path*/}
            {/*                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>*/}
            {/*                </svg>*/}
            {/*                Settings*/}
            {/*            </a>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div class="bottom-sheet-overlay bottom-sheet-overlay--mobile-only" id="conn-detail-sheet-overlay"></div>*/}
            {/*    <div class="bottom-sheet bottom-sheet--mobile-only conn-detail-sheet" id="conn-detail-sheet">*/}
            {/*        <div class="bottom-sheet-handle"></div>*/}
            {/*        <div id="conn-detail-sheet-content"></div>*/}
            {/*    </div>*/}

            {/*    <div class="bottom-sheet-overlay bottom-sheet-overlay--mobile-only" id="conn-sort-sheet-overlay"></div>*/}
            {/*    <div class="bottom-sheet bottom-sheet--mobile-only" id="conn-sort-sheet">*/}
            {/*        <div class="bottom-sheet-handle"></div>*/}
            {/*        <div class="bottom-sheet-title">Sort Peers</div>*/}
            {/*        <div class="bottom-sheet-items">*/}
            {/*            <div class="conn-sort-option bottom-sheet-item active" data-sort="name">Name</div>*/}
            {/*            <div class="conn-sort-option bottom-sheet-item" data-sort="status">Status</div>*/}
            {/*            <div class="conn-sort-option bottom-sheet-item" data-sort="hops">Hops</div>*/}
            {/*            <div class="conn-sort-option bottom-sheet-item" data-sort="last_seen">Last Seen</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div class="bottom-sheet-overlay bottom-sheet-overlay--mobile-only" id="iface-action-overlay"></div>*/}
            {/*    <div class="bottom-sheet bottom-sheet--mobile-only" id="iface-action-sheet">*/}
            {/*        <div class="bottom-sheet-handle"></div>*/}
            {/*        <div class="bottom-sheet-title" id="iface-action-title"></div>*/}
            {/*        <div class="bottom-sheet-items" id="iface-action-items"></div>*/}
            {/*    </div>*/}

            {/*    <div class="bottom-sheet-overlay bottom-sheet-overlay--mobile-only" id="fab-contact-picker-overlay"></div>*/}
            {/*    <div class="bottom-sheet bottom-sheet--mobile-only fab-contact-picker-sheet" id="fab-contact-picker-sheet">*/}
            {/*        <div class="bottom-sheet-handle"></div>*/}
            {/*        <div class="fab-contact-picker-header">*/}
            {/*            <span class="fab-contact-picker-title">Start Conversation</span>*/}
            {/*        </div>*/}
            {/*        <div class="fab-contact-picker-list" id="fab-contact-picker-list"></div>*/}
            {/*    </div>*/}

            {/*    <div class="main-content" role="main">*/}




            {/*        <div class="view" id="view-games">*/}
            {/*            <div class="games-layout">*/}
            {/*                <div class="games-sidebar">*/}
            {/*                    <div class="games-sidebar-header">*/}
            {/*                        <h2 class="games-sidebar-title">Games</h2>*/}
            {/*                        <button class="nr-btn nr-btn-sm games-new-btn" id="games-new-btn">*/}
            {/*                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">*/}
            {/*                                <line x1="12" y1="5" x2="12" y2="19"/>*/}
            {/*                                <line x1="5" y1="12" x2="19" y2="12"/>*/}
            {/*                            </svg>*/}
            {/*                            New*/}
            {/*                        </button>*/}
            {/*                    </div>*/}
            {/*                    <div class="games-sidebar-tabs">*/}
            {/*                        <button class="games-tab active" data-filter="all">All</button>*/}
            {/*                        <button class="games-tab" data-filter="active">Active</button>*/}
            {/*                        <button class="games-tab" data-filter="pending">Pending</button>*/}
            {/*                        <button class="games-tab" data-filter="completed">Completed</button>*/}
            {/*                    </div>*/}
            {/*                    <div class="games-session-list" id="games-session-list">*/}
            {/*                        <div class="games-empty-sidebar">No games yet</div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div class="games-detail" id="games-detail">*/}
            {/*                    <div class="empty-state">*/}
            {/*                        <svg class="empty-state-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"*/}
            {/*                             stroke-linecap="round" stroke-linejoin="round">*/}
            {/*                            <rect x="2" y="4" width="20" height="16" rx="2"/>*/}
            {/*                            <path d="M8 12h2M12 12h2M8 8h.01M12 16h.01"/>*/}
            {/*                        </svg>*/}
            {/*                        <span class="empty-state-primary">Select a game to play</span>*/}
            {/*                        <span class="empty-state-hint">or start a new game with a contact</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <button class="view-fab" id="games-fab-btn" title="New Game">*/}
            {/*                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">*/}
            {/*                    <line x1="12" y1="5" x2="12" y2="19"/>*/}
            {/*                    <line x1="5" y1="12" x2="19" y2="12"/>*/}
            {/*                </svg>*/}
            {/*            </button>*/}
            {/*        </div>*/}


            {/*        <div class="bottom-sheet-overlay" id="identity-modal-overlay"></div>*/}
            {/*        <div class="bottom-sheet" id="identity-modal" role="dialog" aria-labelledby="identity-modal-title">*/}
            {/*            <div class="bottom-sheet-handle"></div>*/}
            {/*            <div class="bottom-sheet-header">*/}
            {/*                <div class="bottom-sheet-title" id="identity-modal-title">Identity</div>*/}
            {/*                <button class="bottom-sheet-close" id="identity-modal-close" aria-label="Close">&times;</button>*/}
            {/*            </div>*/}
            {/*            <div class="bottom-sheet-body">*/}
            {/*                <div id="identity-modal-body"></div>*/}
            {/*            </div>*/}
            {/*            <div class="bottom-sheet-footer">*/}
            {/*                <button class="rs-dialog-cancel" id="identity-modal-cancel">Cancel</button>*/}
            {/*                <button class="rs-dialog-confirm" id="identity-modal-confirm">Create</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <input type="file" id="identity-file-input" accept=".rsi,.rniid,.key,.identity,.bin,application/json,application/octet-stream,text/plain"*/}
            {/*               style="display:none;"/>*/}

            {/*        <div class="bottom-sheet-overlay" id="hw-modal-overlay"></div>*/}
            {/*        <div class="bottom-sheet" id="hw-modal" role="dialog" aria-modal="true" aria-labelledby="hw-modal-title">*/}
            {/*            <div class="bottom-sheet-handle"></div>*/}
            {/*            <div class="bottom-sheet-header">*/}
            {/*                <div class="bottom-sheet-title" id="hw-modal-title">Hardware Key</div>*/}
            {/*                <button class="bottom-sheet-close" id="hw-modal-close" aria-label="Close">&times;</button>*/}
            {/*            </div>*/}
            {/*            <div class="bottom-sheet-body">*/}
            {/*                /!* Step: detect *!/*/}
            {/*                <div class="hw-step" id="hw-step-detect" style="display:none;">*/}
            {/*                    <div class="hw-detect-panel" id="hw-detect-panel">*/}
            {/*                        <div class="hw-detect-spinner"><span class="loading-spinner"></span></div>*/}
            {/*                        <div class="hw-detect-text" id="hw-detect-text">Looking for a security key…</div>*/}
            {/*                    </div>*/}
            {/*                    <button class="nr-btn nr-btn-ghost w-full mt-3" id="hw-detect-back-btn">Back</button>*/}
            {/*                    <button class="nr-btn w-full mt-4" id="hw-detect-retry-btn" style="display:none;">Retry</button>*/}
            {/*                </div>*/}

            {/*                /!* Step: choose mode *!/*/}
            {/*                <div class="hw-step" id="hw-step-mode" style="display:none;">*/}
            {/*                    <div class="hw-device-summary" id="hw-mode-device"></div>*/}
            {/*                    <p class="hw-step-lead">How should this identity be backed up?</p>*/}
            {/*                    <button type="button" class="hw-mode-card" id="hw-mode-recoverable">*/}
            {/*                        <span class="hw-mode-card-title">Recoverable <span class="hw-recommended-note">(Recommended)</span></span>*/}
            {/*                        <span class="hw-mode-card-sub">12-word backup phrase</span>*/}
            {/*                        <span*/}
            {/*                            class="hw-mode-card-desc">A 12-word phrase lets you restore this identity if the key is lost. The phrase is a second secret — it is <strong>not</strong> protected by your PIN, and the keys briefly exist in this device's memory during setup.</span>*/}
            {/*                    </button>*/}
            {/*                    <button type="button" class="hw-mode-card" id="hw-mode-hardware-only">*/}
            {/*                        <span class="hw-mode-card-title">Hardware-only</span>*/}
            {/*                        <span class="hw-mode-card-sub">No backup</span>*/}
            {/*                        <span class="hw-mode-card-desc">Keys are generated on the device and never leave it. There is no phrase to lose — but if the key is lost or reset, this identity is gone forever.</span>*/}
            {/*                    </button>*/}
            {/*                    <button class="nr-btn nr-btn-ghost w-full mt-3" id="hw-mode-back-btn">Back</button>*/}
            {/*                </div>*/}

            {/*                /!* Step: PIN *!/*/}
            {/*                <div class="hw-step" id="hw-step-pin" style="display:none;">*/}
            {/*                    <p class="hw-step-lead">Set a PIN to protect this key. Use a factory-fresh or freshly reset security key.</p>*/}
            {/*                    <div class="modal-field">*/}
            {/*                        <label>Display name</label>*/}
            {/*                        <input type="text" id="hw-pin-nickname" class="modal-input" maxlength="32" autocorrect="off" autocapitalize="none" spellcheck="false"*/}
            {/*                               placeholder="e.g. Rat King"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field" style="margin-top:10px;">*/}
            {/*                        <label>PIN <span class="hw-inline-hint">6–8 characters</span></label>*/}
            {/*                        <input type="password" id="hw-pin" class="modal-input" inputmode="numeric" maxlength="8" autocomplete="off" autocorrect="off"*/}
            {/*                               autocapitalize="none" spellcheck="false" placeholder="Choose a PIN"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field" style="margin-top:10px;">*/}
            {/*                        <label>Confirm PIN</label>*/}
            {/*                        <input type="password" id="hw-pin-confirm" class="modal-input" inputmode="numeric" maxlength="8" autocomplete="off" autocorrect="off"*/}
            {/*                               autocapitalize="none" spellcheck="false" placeholder="Re-enter PIN"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="hw-error" id="hw-pin-error" style="display:none;"></div>*/}
            {/*                    <button class="nr-btn w-full mt-4" id="hw-pin-continue-btn" disabled>Continue</button>*/}
            {/*                    <button class="nr-btn nr-btn-ghost w-full mt-3" id="hw-pin-back-btn">Back</button>*/}
            {/*                </div>*/}

            {/*                /!* Step: provisioning spinner *!/*/}
            {/*                <div class="hw-step" id="hw-step-working" style="display:none;">*/}
            {/*                    <div class="hw-detect-panel">*/}
            {/*                        <div class="hw-detect-spinner"><span class="loading-spinner"></span></div>*/}
            {/*                        <div class="hw-detect-text" id="hw-working-text">Provisioning your security key…</div>*/}
            {/*                        <div class="hw-detect-sub">Touch the key if it blinks.</div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                /!* Step: reveal mnemonic *!/*/}
            {/*                <div class="hw-step" id="hw-step-mnemonic" style="display:none;">*/}
            {/*                    <p class="hw-step-lead">Write down these 12 words in order and store them somewhere safe. This is the only time they will be shown — Ratspeak does*/}
            {/*                        not store them.</p>*/}
            {/*                    <div class="hw-mnemonic-shell">*/}
            {/*                        <div class="hw-mnemonic-grid" id="hw-mnemonic-grid"></div>*/}
            {/*                        <button type="button" class="hw-mnemonic-cover" id="hw-mnemonic-cover">*/}
            {/*                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">*/}
            {/*                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>*/}
            {/*                                <circle cx="12" cy="12" r="3"/>*/}
            {/*                            </svg>*/}
            {/*                            <span>Tap to reveal phrase</span>*/}
            {/*                        </button>*/}
            {/*                    </div>*/}
            {/*                    <button class="nr-btn nr-btn-ghost w-full mt-3" id="hw-mnemonic-copy-btn">*/}
            {/*                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"*/}
            {/*                             style="vertical-align:-2px;margin-right:6px;">*/}
            {/*                            <rect x="9" y="9" width="13" height="13" rx="2"/>*/}
            {/*                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>*/}
            {/*                        </svg>*/}
            {/*                        Copy phrase*/}
            {/*                    </button>*/}
            {/*                    <label class="hw-confirm-check">*/}
            {/*                        <input type="checkbox" id="hw-mnemonic-confirm"/>*/}
            {/*                        <span>I have written down my 12-word phrase and stored it safely.</span>*/}
            {/*                    </label>*/}
            {/*                    <button class="nr-btn w-full mt-4" id="hw-mnemonic-continue-btn" disabled>Continue</button>*/}
            {/*                </div>*/}

            {/*                /!* Step: restore from phrase *!/*/}
            {/*                <div class="hw-step" id="hw-step-restore" style="display:none;">*/}
            {/*                    <p class="hw-step-lead">Enter your 12-word recovery phrase, then set the PIN to write it onto a factory-fresh or reset security key.</p>*/}
            {/*                    <div class="modal-field">*/}
            {/*                        <label>Recovery phrase</label>*/}
            {/*                        <textarea id="hw-restore-phrase" class="modal-input hw-restore-textarea" rows="3" autocomplete="off" autocorrect="off" autocapitalize="none"*/}
            {/*                                  spellcheck="false" placeholder="word1 word2 word3 …"></textarea>*/}
            {/*                        <span class="hw-inline-hint" id="hw-restore-word-count">0 / 12 words</span>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field" style="margin-top:10px;">*/}
            {/*                        <label>Display name</label>*/}
            {/*                        <input type="text" id="hw-restore-nickname" class="modal-input" maxlength="32" autocorrect="off" autocapitalize="none" spellcheck="false"*/}
            {/*                               placeholder="e.g. Rat King"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field" style="margin-top:10px;">*/}
            {/*                        <label>PIN <span class="hw-inline-hint">6–8 characters</span></label>*/}
            {/*                        <input type="password" id="hw-restore-pin" class="modal-input" inputmode="numeric" maxlength="8" autocomplete="off" autocorrect="off"*/}
            {/*                               autocapitalize="none" spellcheck="false" placeholder="Choose a PIN"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field" style="margin-top:10px;">*/}
            {/*                        <label>Confirm PIN</label>*/}
            {/*                        <input type="password" id="hw-restore-pin-confirm" class="modal-input" inputmode="numeric" maxlength="8" autocomplete="off" autocorrect="off"*/}
            {/*                               autocapitalize="none" spellcheck="false" placeholder="Re-enter PIN"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="hw-error" id="hw-restore-error" style="display:none;"></div>*/}
            {/*                    <button class="nr-btn w-full mt-4" id="hw-restore-btn" disabled>Restore Identity</button>*/}
            {/*                    <button class="nr-btn nr-btn-ghost w-full mt-3" id="hw-restore-back-btn">Back</button>*/}
            {/*                </div>*/}

            {/*                /!* Step: import existing *!/*/}
            {/*                <div class="hw-step" id="hw-step-import" style="display:none;">*/}
            {/*                    <div class="hw-device-summary" id="hw-import-device"></div>*/}
            {/*                    <p class="hw-step-lead" id="hw-import-lead">This security key is already provisioned. Register it on this device.</p>*/}
            {/*                    <div class="modal-field">*/}
            {/*                        <label>Display name</label>*/}
            {/*                        <input type="text" id="hw-import-nickname" class="modal-input" maxlength="32" autocorrect="off" autocapitalize="none" spellcheck="false"*/}
            {/*                               placeholder="e.g. Rat King"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field" id="hw-import-pin-field" style="margin-top:10px;display:none;">*/}
            {/*                        <label>Current YubiKey PIN <span class="hw-inline-hint">6–8 characters</span></label>*/}
            {/*                        <input type="password" id="hw-import-pin" class="modal-input" inputmode="numeric" maxlength="8" autocomplete="off" autocorrect="off"*/}
            {/*                               autocapitalize="none" spellcheck="false" placeholder="Current PIN"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="hw-error" id="hw-import-error" style="display:none;"></div>*/}
            {/*                    <button class="nr-btn w-full mt-4" id="hw-import-btn">Add Hardware Identity</button>*/}
            {/*                    <button class="nr-btn nr-btn-ghost w-full mt-3" id="hw-import-back-btn">Back</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}





            {/*    </div>*/}
            {/*</div>*/}

            {/*<div class="bottom-sheet-overlay" id="node-modal-overlay"></div>*/}
            {/*<div class="bottom-sheet" id="node-modal" role="dialog" aria-labelledby="modal-title">*/}
            {/*    <div class="bottom-sheet-handle"></div>*/}
            {/*    <div class="bottom-sheet-header">*/}
            {/*        <div class="bottom-sheet-title" id="modal-title">Hub Info</div>*/}
            {/*        <button class="bottom-sheet-close" id="modal-close" aria-label="Close">&times;</button>*/}
            {/*    </div>*/}
            {/*    <div class="bottom-sheet-body">*/}
            {/*        <div class="modal-field">*/}
            {/*            <label>Name</label>*/}
            {/*            <input type="text" id="modal-name" class="modal-input" maxlength="24" placeholder="My Hub" autocorrect="off" autocapitalize="none" spellcheck="false"/>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field">*/}
            {/*            <label>Transport Mode</label>*/}
            {/*            <button class="selector-badge" id="modal-transport-select">AUTO</button>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field" id="modal-lora-section">*/}
            {/*            <label>LoRa Interfaces</label>*/}
            {/*            <div id="modal-lora-list"><span class="inline-hint">None configured.</span></div>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field" id="modal-auto-section">*/}
            {/*            <label>Local Network (WiFi/LAN)</label>*/}
            {/*            <div id="modal-auto-list"><span class="inline-hint">Not enabled.</span></div>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field" id="modal-tcp-client-section">*/}
            {/*            <label>TCP Connections</label>*/}
            {/*            <div id="modal-tcp-client-list"><span class="inline-hint">None configured.</span></div>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field" id="modal-tcp-server-section">*/}
            {/*            <label>TCP Servers</label>*/}
            {/*            <div id="modal-tcp-server-list"><span class="inline-hint">None configured.</span></div>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field" id="modal-backbone-client-section">*/}
            {/*            <label>Backbone Connections</label>*/}
            {/*            <div id="modal-backbone-client-list"><span class="inline-hint">None configured.</span></div>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field" id="modal-backbone-server-section">*/}
            {/*            <label>Backbone Servers</label>*/}
            {/*            <div id="modal-backbone-server-list"><span class="inline-hint">None configured.</span></div>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field">*/}
            {/*            <label>Dest Hash</label>*/}
            {/*            <span class="modal-value mono" id="modal-hash">&mdash;</span>*/}
            {/*        </div>*/}
            {/*        <div class="modal-op-status" id="modal-op-status" style="display:none;"></div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div class="bottom-sheet-overlay" id="connect-modal-overlay"></div>*/}
            {/*<div class="bottom-sheet connect-sheet" id="connect-modal">*/}
            {/*    <div class="bottom-sheet-handle"></div>*/}
            {/*    <div class="bottom-sheet-header">*/}
            {/*        <div class="bottom-sheet-title">Connect to Network</div>*/}
            {/*        <button class="bottom-sheet-close" id="connect-modal-close" aria-label="Close">&times;</button>*/}
            {/*    </div>*/}
            {/*    <div class="bottom-sheet-body">*/}
            {/*        <div class="sheet-segmented-tabs connect-tab-toggle" id="connect-tab-toggle" role="tablist" aria-label="Connection type">*/}
            {/*            <button type="button" id="connect-tab-public" class="active" data-connect-tab="public" role="tab" aria-selected="true"*/}
            {/*                    aria-controls="connect-public-panel">Public*/}
            {/*            </button>*/}
            {/*            <button type="button" id="connect-tab-custom" data-connect-tab="custom" role="tab" aria-selected="false" aria-controls="connect-custom-panel">Custom*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*        <div class="connect-tab-panel active" id="connect-public-panel" role="tabpanel" aria-labelledby="connect-tab-public">*/}
            {/*            <div class="public-server-list" id="public-server-list">*/}
            {/*                <div class="inline-hint" style="padding:8px 0;">Loading public servers...</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div class="connect-tab-panel" id="connect-custom-panel" role="tabpanel" aria-labelledby="connect-tab-custom">*/}
            {/*            <div class="modal-field" id="connect-quick-field">*/}
            {/*                <label>Quick Connect</label>*/}
            {/*                <div class="quick-connect-options" id="quick-connect-list">*/}
            {/*                    <div id="qc-empty" class="inline-hint" style="padding:8px 0;">No saved custom connections. Connect to a node below to save it here.</div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div class="modal-field">*/}
            {/*                <label>Host</label>*/}
            {/*                <input type="text" id="connect-host" class="modal-input" placeholder="e.g. rns.ratspeak.org" autocorrect="off" autocapitalize="none"*/}
            {/*                       spellcheck="false"/>*/}
            {/*            </div>*/}
            {/*            <div class="modal-field">*/}
            {/*                <label>Port</label>*/}
            {/*                <input type="number" id="connect-port" class="modal-input" placeholder="4242" min="1" max="65535" autocorrect="off" autocapitalize="none"*/}
            {/*                       spellcheck="false"/>*/}
            {/*            </div>*/}
            {/*            <div class="modal-field" id="connect-name-field" style="display:none;">*/}
            {/*                <label>Name</label>*/}
            {/*                <input type="text" id="connect-name" class="modal-input" placeholder="Ratspeak Hub" maxlength="32" autocorrect="off" autocapitalize="none"*/}
            {/*                       spellcheck="false"/>*/}
            {/*            </div>*/}
            {/*            <label class="rs-dialog-checkbox-wrap mt-4" id="connect-backbone-row" style="display:none;">*/}
            {/*                <input type="checkbox" id="connect-use-backbone" class="rs-dialog-checkbox"/>*/}
            {/*                <span class="rs-dialog-checkbox-label">Experimental: Use Backbone</span>*/}
            {/*            </label>*/}
            {/*            <label class="rs-dialog-checkbox-wrap mt-4" id="connect-ifac-row" style="display:none;">*/}
            {/*                <input type="checkbox" id="connect-use-ifac" class="rs-dialog-checkbox"/>*/}
            {/*                <span class="rs-dialog-checkbox-label">Use IFAC</span>*/}
            {/*            </label>*/}
            {/*            <div id="connect-ifac-fields" style="display:none;">*/}
            {/*                <div class="modal-field">*/}
            {/*                    <label>IFAC Network Name</label>*/}
            {/*                    <input type="text" id="connect-ifac-network-name" class="modal-input" placeholder="Optional" maxlength="128" autocorrect="off" autocapitalize="none"*/}
            {/*                           spellcheck="false"/>*/}
            {/*                </div>*/}
            {/*                <div class="modal-field">*/}
            {/*                    <label>IFAC Passphrase</label>*/}
            {/*                    <input type="password" id="connect-ifac-passphrase" class="modal-input" placeholder="Required for most IFAC networks" maxlength="256"*/}
            {/*                           autocorrect="off" autocapitalize="none" spellcheck="false"/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <button class="nr-btn w-full mt-4" id="connect-submit-btn">Connect</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div class="bottom-sheet-overlay" id="host-modal-overlay"></div>*/}
            {/*<div class="bottom-sheet" id="host-modal">*/}
            {/*    <div class="bottom-sheet-handle"></div>*/}
            {/*    <div class="bottom-sheet-header">*/}
            {/*        <div class="bottom-sheet-title">Host Network</div>*/}
            {/*        <button class="bottom-sheet-close" id="host-modal-close" aria-label="Close">&times;</button>*/}
            {/*    </div>*/}
            {/*    <div class="bottom-sheet-body">*/}
            {/*        <p class="inline-hint" style="margin:0 0 10px;">Accept incoming TCP connections from other Reticulum nodes.</p>*/}
            {/*        <div class="modal-field">*/}
            {/*            <label>Listen Port</label>*/}
            {/*            <input type="number" id="host-port" class="modal-input" placeholder="4242" min="1" max="65535" autocorrect="off" autocapitalize="none" spellcheck="false"/>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field">*/}
            {/*            <label>Bind Address</label>*/}
            {/*            <input type="text" id="host-listen-ip" class="modal-input" placeholder="0.0.0.0" autocorrect="off" autocapitalize="none" spellcheck="false"/>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field">*/}
            {/*            <label>Name (optional)</label>*/}
            {/*            <input type="text" id="host-name" class="modal-input" placeholder="My Server" maxlength="32" autocorrect="off" autocapitalize="none" spellcheck="false"/>*/}
            {/*        </div>*/}
            {/*        <p class="inline-hint-sm mt-3" style="margin-bottom:0;">Your firewall or router may need to allow this port.</p>*/}
            {/*        <button class="nr-btn w-full mt-4" id="host-submit-btn">Start Hosting</button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div class="bottom-sheet-overlay" id="backbone-host-modal-overlay"></div>*/}
            {/*<div class="bottom-sheet" id="backbone-host-modal">*/}
            {/*    <div class="bottom-sheet-handle"></div>*/}
            {/*    <div class="bottom-sheet-header">*/}
            {/*        <div class="bottom-sheet-title">Host Backbone Server</div>*/}
            {/*        <button class="bottom-sheet-close" id="backbone-host-modal-close" aria-label="Close">&times;</button>*/}
            {/*    </div>*/}
            {/*    <div class="bottom-sheet-body">*/}
            {/*        <p class="inline-hint" style="margin:0 0 10px;">Accept Backbone connections from other transport nodes.</p>*/}
            {/*        <div class="modal-field">*/}
            {/*            <label>Listen Port</label>*/}
            {/*            <input type="number" id="backbone-host-port" class="modal-input" placeholder="4242" min="1" max="65535" autocorrect="off" autocapitalize="none"*/}
            {/*                   spellcheck="false"/>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field">*/}
            {/*            <label>Bind Address</label>*/}
            {/*            <input type="text" id="backbone-host-listen-ip" class="modal-input" placeholder="0.0.0.0" autocorrect="off" autocapitalize="none" spellcheck="false"/>*/}
            {/*        </div>*/}
            {/*        <div class="modal-field">*/}
            {/*            <label>Name (optional)</label>*/}
            {/*            <input type="text" id="backbone-host-name" class="modal-input" placeholder="Backbone Server" maxlength="32" autocorrect="off" autocapitalize="none"*/}
            {/*                   spellcheck="false"/>*/}
            {/*        </div>*/}
            {/*        <p class="inline-hint-sm mt-3" style="margin-bottom:0;">Use this for stable desktop or server nodes, not mobile networks.</p>*/}
            {/*        <button class="nr-btn w-full mt-4" id="backbone-host-submit-btn">Start Hosting</button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div class="bottom-sheet-overlay" id="rnode-modal-overlay"></div>*/}
            {/*<div class="bottom-sheet" id="rnode-modal" role="dialog" aria-labelledby="rnode-modal-title">*/}
            {/*    <div class="bottom-sheet-handle"></div>*/}
            {/*    <div class="bottom-sheet-header">*/}
            {/*        <div class="bottom-sheet-title" id="rnode-modal-title">Add LoRa Device</div>*/}
            {/*        <button class="bottom-sheet-close" id="rnode-modal-close" aria-label="Close dialog">&times;</button>*/}
            {/*    </div>*/}
            {/*    <div class="bottom-sheet-body">*/}

            {/*        <div id="rnode-step-1">*/}
            {/*            <div class="sheet-segmented-tabs rnode-conn-toggle">*/}
            {/*                <button type="button" id="rnode-toggle-ble" class="active" title="Connect via Bluetooth Low Energy">Bluetooth<span class="toggle-hint"*/}
            {/*                                                                                                                                   id="rnode-ble-hint"></span></button>*/}
            {/*                <button type="button" id="rnode-toggle-serial" title="Connect via USB cable">USB / Serial</button>*/}
            {/*                <button type="button" id="rnode-toggle-android-usb" style="display:none" title="Connect via USB-OTG">USB</button>*/}
            {/*                <button type="button" id="rnode-toggle-tcp" title="Connect to an RNode TCP server">TCP</button>*/}
            {/*            </div>*/}

            {/*            <div id="rnode-ble-section" style="margin-top:12px;">*/}
            {/*                <div id="rnode-ble-ready">*/}
            {/*                    <div class="rnode-pairing-tip">Tip: enable pairing mode on your device before connecting if unpaired.</div>*/}
            {/*                    <div class="ble-device-list" id="ble-device-list">*/}
            {/*                        <div class="ble-scan-placeholder">Click "Scan" to find nearby RNode devices.</div>*/}
            {/*                    </div>*/}
            {/*                    <button class="nr-btn w-full mt-3" id="ble-scan-btn">Start Scan</button>*/}
            {/*                    <div id="rnode-handoff-hint-ble" class="rnode-handoff-hint" style="display:none">Connecting will disconnect your active USB LoRa radio.</div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div id="rnode-serial-section" style="display:none;margin-top:12px;">*/}
            {/*                <div class="u-flex gap-2">*/}
            {/*                    <select id="rnode-port" class="nr-select flex-1">*/}
            {/*                        <option value="">Select device...</option>*/}
            {/*                    </select>*/}
            {/*                    <button class="nr-btn nr-btn-xs" id="rnode-refresh-btn" aria-label="Refresh serial ports" title="Refresh ports">&#x21bb;</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div id="rnode-android-usb-section" style="display:none;margin-top:12px;">*/}
            {/*                <div class="ble-device-list" id="android-usb-device-list">*/}
            {/*                    <div class="ble-scan-placeholder">Plug in your RNode via a USB-C OTG cable, then tap "Refresh".</div>*/}
            {/*                </div>*/}
            {/*                <button class="nr-btn w-full mt-3" id="android-usb-refresh-btn">Refresh</button>*/}
            {/*                <div id="rnode-handoff-hint-usb" class="rnode-handoff-hint" style="display:none">Connecting will disconnect your active Bluetooth LoRa radio.</div>*/}
            {/*            </div>*/}

            {/*            <div id="rnode-tcp-section" style="display:none;margin-top:12px;">*/}
            {/*                <div class="modal-field">*/}
            {/*                    <label>TCP Endpoint</label>*/}
            {/*                    <input type="text" id="rnode-tcp-endpoint" class="modal-input" placeholder="192.168.1.50:7633" inputmode="url" autocomplete="off" autocorrect="off"*/}
            {/*                           autocapitalize="none" spellcheck="false"/>*/}
            {/*                </div>*/}
            {/*                <p class="inline-hint-sm mt-3" style="margin-bottom:0;">Use host or host:port. Default port 7633.</p>*/}
            {/*            </div>*/}

            {/*            <button class="nr-btn w-full mt-7" id="rnode-next-btn" disabled>Next</button>*/}
            {/*        </div>*/}

            {/*        <div id="rnode-step-2" style="display:none;">*/}
            {/*            <div class="modal-field">*/}
            {/*                <label>Name</label>*/}
            {/*                <input type="text" id="rnode-iface-name" class="modal-input" placeholder="My LoRa Radio" maxlength="32" autocorrect="off" autocapitalize="none"*/}
            {/*                       spellcheck="false"/>*/}
            {/*            </div>*/}
            {/*            <div class="modal-field">*/}
            {/*                <label>Band / Region</label>*/}
            {/*                <select id="rnode-region" class="nr-select"></select>*/}
            {/*            </div>*/}
            {/*            <div class="modal-field">*/}
            {/*                <label>Frequency</label>*/}
            {/*                <div class="rnode-frequency-row">*/}
            {/*                    <input type="text" id="rnode-frequency" class="modal-input flex-1" inputmode="decimal" placeholder="915.000" autocorrect="off" autocapitalize="none"*/}
            {/*                           spellcheck="false"/>*/}
            {/*                    <span class="rnode-frequency-unit">MHz</span>*/}
            {/*                </div>*/}
            {/*                <span class="inline-hint-sm" id="rnode-frequency-hint"></span>*/}
            {/*                <div class="rnode-radio-warning" id="rnode-frequency-warning" style="display:none"></div>*/}
            {/*            </div>*/}
            {/*            <div class="modal-field">*/}
            {/*                <label>Preset</label>*/}
            {/*                <select id="rnode-preset" class="nr-select"></select>*/}
            {/*                <span class="inline-hint-sm" id="rnode-preset-hint"></span>*/}
            {/*            </div>*/}
            {/*            <div class="modal-field" id="rnode-mode-field" style="display:none;">*/}
            {/*                <label>Interface Mode</label>*/}
            {/*                <select id="rnode-interface-mode" class="nr-select">*/}
            {/*                    <option value="full">Full</option>*/}
            {/*                    <option value="gateway">Gateway</option>*/}
            {/*                    <option value="access_point">Access Point (AP)</option>*/}
            {/*                    <option value="boundary">Boundary</option>*/}
            {/*                    <option value="roaming">Roaming</option>*/}
            {/*                </select>*/}
            {/*                <span class="inline-hint-sm">Mode affects routing and announce propagation.</span>*/}
            {/*            </div>*/}

            {/*            <details id="rnode-advanced" class="rnode-advanced-details">*/}
            {/*                <summary class="rs-dialog-advanced-summary">Advanced radio parameters</summary>*/}
            {/*                <div class="rnode-advanced-grid">*/}
            {/*                    <div class="modal-field">*/}
            {/*                        <label>Bandwidth</label>*/}
            {/*                        <div class="rnode-frequency-row">*/}
            {/*                            <input type="text" id="rnode-bandwidth" class="modal-input flex-1" inputmode="decimal" placeholder="250" autocorrect="off"*/}
            {/*                                   autocapitalize="none" spellcheck="false"/>*/}
            {/*                            <span class="rnode-frequency-unit">kHz</span>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field">*/}
            {/*                        <label>Spreading Factor</label>*/}
            {/*                        <input type="number" id="rnode-spreading-factor" class="modal-input" min="5" max="12" step="1" inputmode="numeric" placeholder="9"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field">*/}
            {/*                        <label>Coding Rate</label>*/}
            {/*                        <input type="number" id="rnode-coding-rate" class="modal-input" min="5" max="8" step="1" inputmode="numeric" placeholder="5"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field">*/}
            {/*                        <label>TX Power</label>*/}
            {/*                        <div class="rnode-frequency-row">*/}
            {/*                            <input type="number" id="rnode-tx-power" class="modal-input flex-1" min="0" max="37" step="1" inputmode="numeric" placeholder="17"/>*/}
            {/*                            <span class="rnode-frequency-unit">dBm</span>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field">*/}
            {/*                        <label>Airtime limit, short-term (%)</label>*/}
            {/*                        <input type="number" id="rnode-airtime-short" class="modal-input" min="0" max="100" step="0.1" inputmode="decimal" placeholder="No limit"/>*/}
            {/*                    </div>*/}
            {/*                    <div class="modal-field">*/}
            {/*                        <label>Airtime limit, long-term (%)</label>*/}
            {/*                        <input type="number" id="rnode-airtime-long" class="modal-input" min="0" max="100" step="0.1" inputmode="decimal" placeholder="No limit"/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div class="inline-hint-sm rnode-advanced-hint">Use custom values only when every node on the link will use the same frequency, bandwidth, spreading*/}
            {/*                    factor, and coding rate.*/}
            {/*                </div>*/}
            {/*            </details>*/}

            {/*            <div class="modal-field rnode-public-map-section" id="rnode-public-map-section" style="display:none;">*/}
            {/*                <div class="rnode-setting-row">*/}
            {/*                    <div class="rnode-setting-copy">*/}
            {/*                        <label class="rnode-setting-label" for="rnode-public-map-enabled">Display on public map</label>*/}
            {/*                    </div>*/}
            {/*                    <label class="prop-toggle rnode-public-map-toggle" aria-label="Display on public map">*/}
            {/*                        <input type="checkbox" id="rnode-public-map-enabled"/>*/}
            {/*                        <span class="prop-slider"></span>*/}
            {/*                    </label>*/}
            {/*                </div>*/}
            {/*                <div class="rnode-public-map-controls" id="rnode-public-map-controls" style="display:none;">*/}
            {/*                    <div class="rnode-public-map-grid">*/}
            {/*                        <div class="modal-field">*/}
            {/*                            <label>Latitude</label>*/}
            {/*                            <input type="text" id="rnode-public-map-latitude" class="modal-input" inputmode="decimal" placeholder="39.7392" autocorrect="off"*/}
            {/*                                   autocapitalize="none" spellcheck="false"/>*/}
            {/*                        </div>*/}
            {/*                        <div class="modal-field">*/}
            {/*                            <label>Longitude</label>*/}
            {/*                            <input type="text" id="rnode-public-map-longitude" class="modal-input" inputmode="decimal" placeholder="-104.9903" autocorrect="off"*/}
            {/*                                   autocapitalize="none" spellcheck="false"/>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div class="rnode-public-map-actions">*/}
            {/*                        <button type="button" class="nr-btn nr-btn-sm nr-btn-ghost" id="rnode-public-map-use-current">Use current location</button>*/}
            {/*                        <span class="inline-hint-sm rnode-public-map-status" id="rnode-public-map-status"></span>*/}
            {/*                    </div>*/}
            {/*                    <div class="rs-dialog-field-error" id="rnode-public-map-error" style="display:none;"></div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div class="u-flex gap-4 mt-7">*/}
            {/*                <button type="button" class="nr-btn nr-btn-ghost" id="rnode-back-btn">Back</button>*/}
            {/*                <button class="nr-btn flex-1" id="rnode-submit-btn">Add Radio</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*</div>*/}


            {/*<div id="toast-container" role="status" aria-live="polite"></div>*/}


        </>
    }
}
