"use strict";
import React from "react";

interface MessagesProps {
}

interface MessagesState {
}


export class Messages extends React.Component<MessagesProps, MessagesState> {
    constructor(props: MessagesProps) {
        super(props);
    }

    render() {

        return <>
            <div class="view" id="view-message">
                <div id="lxmf-mode-panel" class="lxmf-container" style={{display: "flex"}}>
                    <div class="lxmf-layout">
                        <div class="lxmf-sidebar">
                            <div class="msg-profile-strip" id="msg-profile-strip">
                                <div class="msg-profile-avatar" id="msg-profile-avatar"></div>
                                <div class="msg-profile-info">
                                    <span class="msg-profile-name" id="msg-profile-name">Me</span>
                                    <span class="msg-profile-hash" id="lxmf-own-hash" title="Click to copy your address">&mdash;</span>
                                </div>
                                <button class="msg-compose-btn" id="lxmf-send-message-btn" title="New conversation" aria-label="New conversation">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round">
                                        <path d="M12 20h9"/>
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                                    </svg>
                                </button>
                            </div>
                            <input type="text" id="msg-search-input" class="nr-input-sm msg-search" placeholder="Search..." aria-label="Search" autocorrect="off"
                                   autocapitalize="none" spellcheck="false"/>
                            <div id="msg-search-results" style={{display: "none"}}></div>
                            <div id="lxmf-conversations-list">
                                <div class="empty-state">
                                    <svg class="empty-state-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                         stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                    </svg>
                                    <span class="empty-state-primary">No conversations yet</span>
                                    <span class="empty-state-hint">Tap the compose button to start messaging</span>
                                </div>
                            </div>
                            <div class="fab-speed-dial" id="lxmf-fab-dial">
                                <div class="fab-dial-actions" id="fab-dial-actions">
                                    <div class="fab-dial-item" id="fab-dial-contacts">
                                        <span class="fab-dial-label">Contacts</span>
                                        <button class="fab-dial-btn" aria-label="Pick from contacts">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                 stroke-linejoin="round">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                                <circle cx="9" cy="7" r="4"/>
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="fab-dial-item" id="fab-dial-new">
                                        <span class="fab-dial-label">New</span>
                                        <button class="fab-dial-btn" aria-label="New conversation">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                 stroke-linejoin="round">
                                                <path d="M12 20h9"/>
                                                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <button class="view-fab" id="lxmf-send-fab" title="New conversation" aria-expanded="false">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round">
                                        <path d="M12 20h9"/>
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="lxmf-chat" id="lxmf-chat-area">
                            <div class="lxmf-chat-header" id="lxmf-chat-header" style={{display: "none"}}>
                                <button class="mobile-back-btn" id="lxmf-back-btn" aria-label="Back to conversations">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="15 18 9 12 15 6"/>
                                    </svg>
                                </button>
                                <div class="lxmf-chat-header-avatar" id="lxmf-contact-avatar"></div>
                                <div class="lxmf-chat-header-info">
                                    <span class="lxmf-chat-header-name" id="lxmf-chat-header-name"></span>
                                    <span class="lxmf-chat-header-status" id="lxmf-chat-header-status"></span>
                                </div>
                                <div class="lxmf-chat-header-actions">
                                    <button class="game-challenge-btn" id="game-challenge-btn" title="Challenge to a game" style={{display: "none"}}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round">
                                            <rect x="3" y="3" width="7" height="7"/>
                                            <rect x="14" y="3" width="7" height="7"/>
                                            <rect x="3" y="14" width="7" height="7"/>
                                            <rect x="14" y="14" width="7" height="7"/>
                                        </svg>
                                    </button>
                                    <button class="lxst-call-btn" id="lxst-call-btn" title="Call" aria-label="Call" style={{display: "none"}}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round">
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                    </button>
                                    <button class="chat-header-menu-btn" id="chat-header-menu-btn" title="More options" aria-label="More options">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                                            <circle cx="12" cy="5" r="1" fill="currentColor"/>
                                            <circle cx="12" cy="12" r="1" fill="currentColor"/>
                                            <circle cx="12" cy="19" r="1" fill="currentColor"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="lxst-call-strip" id="lxst-call-strip" hidden aria-live="polite">
                                <div class="lxst-call-strip-indicator" aria-hidden="true">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round">
                                        <path
                                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                </div>
                                <div class="lxst-call-strip-main">
                                    <span class="lxst-call-strip-title" id="lxst-call-strip-title"></span>
                                    <div class="lxst-call-strip-meta">
                                        <span class="lxst-call-strip-status" id="lxst-call-strip-status"></span>
                                    </div>
                                </div>
                                <div class="lxst-call-strip-actions">
                                    <button class="lxst-call-action lxst-call-action-answer" id="lxst-call-answer-btn" type="button" title="Answer call"
                                            aria-label="Answer call">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round">
                                            <polyline points="16 2 16 8 22 8"/>
                                            <line x1="22" y1="2" x2="16" y2="8"/>
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                        <span>Answer</span>
                                    </button>
                                    <button class="lxst-call-action" id="lxst-call-reject-btn" type="button" title="Reject call" aria-label="Reject call">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round">
                                            <path
                                                d="M10.1 13.9a16 16 0 0 0 4.21 2.01l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65"/>
                                            <line x1="2" y1="2" x2="22" y2="22"/>
                                        </svg>
                                        <span>Reject</span>
                                    </button>
                                    <div class="lxst-call-strip-controls" id="lxst-call-strip-controls" hidden>
                                        <button class="lxst-call-toggle" id="lxst-call-mute-btn" type="button" title="Mute microphone" aria-label="Mute microphone"
                                                aria-pressed="false"></button>
                                        <button class="lxst-call-toggle" id="lxst-call-speaker-btn" type="button" title="Use speaker" aria-label="Use speaker"
                                                aria-pressed="false"></button>
                                    </div>
                                    <button class="lxst-call-action lxst-call-action-hangup" id="lxst-call-hangup-btn" type="button" title="Hang up" aria-label="Hang up">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round">
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                        <span>Hang up</span>
                                    </button>
                                </div>
                            </div>
                            <div class="lxmf-messages" id="lxmf-messages">
                                <div class="lxmf-empty">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"
                                         stroke-linejoin="round" style={{opacity: 0.15}}>
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                    </svg>
                                    <span class="empty-state-primary">Your messages</span>
                                    <span class="empty-state-hint">Select a conversation or start a new one</span>
                                </div>
                            </div>
                            <div id="lxmf-pending-file" class="file-transfer-info" style={{display: "none"}}></div>
                            <div id="lxmf-reply-preview" class="reply-preview-bar" style={{display: "none"}}>
                                <div class="reply-preview-content">
                                    <span class="reply-preview-sender"></span>
                                    <span class="reply-preview-text"></span>
                                </div>
                                <button class="reply-preview-close" aria-label="Cancel reply">&times;</button>
                            </div>
                            <div class="lxmf-compose" id="lxmf-compose-bar" style={{display: "none"}}>
                                <input type="file" id="lxmf-file-input" style={{display: "none"}}/>
                                <input type="file" id="lxmf-photos-input" accept="image/*,video/*" style={{display: "none"}}/>
                                <input type="file" id="lxmf-camera-input" accept="image/*" capture="environment" style={{display: "none"}}/>
                                <input type="file" id="lxmf-video-input" accept="video/*" capture="environment" style={{display: "none"}}/>
                                <button class="lxmf-compose-attach-btn" id="attach-file-btn" title="Attach" aria-label="Attach emoji or file">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                         stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"/>
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                    </svg>
                                </button>
                                <textarea id="lxmf-input" class="nr-input" placeholder="Message..." aria-label="Message input" rows="1"
                                          title="Enter to send, Shift+Enter for new line"></textarea>
                                <span class="lxmf-char-count" id="lxmf-char-count" aria-live="polite" style={{display: "none"}}></span>
                                <button class="lxmf-send-btn" id="send-msg-btn" aria-label="Send message">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                         stroke-linejoin="round">
                                        <line x1="12" y1="19" x2="12" y2="5"/>
                                        <polyline points="5 12 12 5 19 12"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}
