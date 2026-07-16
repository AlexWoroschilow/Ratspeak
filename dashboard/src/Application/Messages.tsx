"use strict";
import React from "react";
import {Menu} from "./Messages/Menu";

interface MessagesProps {
}

interface MessagesState {
    isVisibleMenu?: boolean;
}

// Based on the investigation of the `@dashboard/static/js/*` files (primarily `dashboard/static/js/lxmf.js`), here are the `RS.invoke` methods related to messages, chats, and voice communication:
//
// ### LXMF Messaging and Conversations
// *   `api_lxmf_conversations`: Retrieves the list of all active LXMF (Lightweight eXchange Message Format) conversations.
// *   `get_conversation`: Retrieves the message history and state for a specific conversation (identified by a hash).
// *   `api_lxmf_limits`: Retrieves the message size or rate limits for the LXMF protocol.
// *   `api_search_messages`: Performs a keyword search across all messages.
// *   `send_lxmf_message`: Sends a new LXMF message to a destination.
// *   `send_lxmf_reply`: Sends a reply to an existing LXMF message.
// *   `send_lxmf_with_attachment`: Sends an LXMF message with a file attachment.
// *   `cancel_lxmf_message`: Cancels a message that is currently in the outbound queue.
// *   `send_reaction`: Sends an emoji reaction to a specific message.
// *   `mark_read`: Marks all messages in a conversation as read.
// *   `hide_conversation`: Hides a conversation from the active list without deleting history.
// *   `delete_conversation`: Permanently deletes a conversation and its message history.
//
// ### Voice Communication (Voice-over-Reticum)
// These methods handle peer-to-peer voice calls within the chat interface:
// *   `voice_call`: Initiates a voice call to a specific contact.
// *   `voice_answer`: Answers an incoming voice call.
// *   `voice_reject`: Rejects an incoming voice call.
// *   `voice_hangup`: Ends an active voice call.
// *   `voice_status`: Retrieves the current status of the voice subsystem (e.g., calling, connected, idle).
// *   `voice_set_microphone_muted`: Toggles the microphone state during a call.
// *   `voice_restart_speaker`: Restarts or toggles the speaker/audio output device.
//
// ### Announcements and Presence
// *   `api_announces`: Retrieves a list of received identity announcements from the network.
// *   `trigger_announce`: Manually triggers an identity announcement to let other peers know you are online.
// *   `check_contact_status`: Triggers a request to update the reachability/status of contacts.
//
// ### Summary of Locations
// *   `dashboard/static/js/lxmf.js`: The primary controller for all messaging, conversation management, and voice call logic.
// *   `dashboard/static/js/tauri_events.js`: Updates the conversation UI when new messages or events are received.
// *   `dashboard/static/js/state.js`: Manages the global state of the active conversation.
// *   `dashboard/static/js/settings.js`: Handles automatic announcement settings and identity usage broadcasting.
// 
export class Messages extends React.Component<MessagesProps, MessagesState> {
    constructor(props: MessagesProps) {
        super(props);

        this.state = {
            isVisibleMenu: false,
        }
    }

    doToggleMenu() {
        this.setState({
            isVisibleMenu: !this.state.isVisibleMenu
        });
    }

    doHideMenu() {
        (this?.state?.isVisibleMenu) &&
        this.setState({isVisibleMenu: false});
    }

    render() {

        return <>
            <div className="view" id="view-message" onClick={this.doHideMenu.bind(this)}>
                <div id="lxmf-mode-panel" className="lxmf-container" style={{display: "flex"}}>
                    <div className="lxmf-layout">
                        <div className="lxmf-sidebar">
                            <div className="msg-profile-strip" id="msg-profile-strip">
                                <div className="msg-profile-avatar" id="msg-profile-avatar"></div>
                                <div className="msg-profile-info">
                                    <span className="msg-profile-name" id="msg-profile-name">Me</span>
                                    <span className="msg-profile-hash" id="lxmf-own-hash" title="Click to copy your address">&mdash;</span>
                                </div>
                                <button className="msg-compose-btn" id="lxmf-send-message-btn" title="New conversation" aria-label="New conversation"
                                        onClick={this.doToggleMenu.bind(this)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M12 20h9"/>
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                                    </svg>
                                </button>

                                {this?.state?.isVisibleMenu && <Menu/>}

                            </div>
                            <input type="text" id="msg-search-input" className="nr-input-sm msg-search" placeholder="Search..." aria-label="Search" autoCorrect="off"
                                   autoCapitalize="none" spellCheck="false"/>
                            <div id="msg-search-results" style={{display: "none"}}></div>
                            <div id="lxmf-conversations-list">
                                <div className="empty-state">
                                    <svg className="empty-state-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                         strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                    </svg>
                                    <span className="empty-state-primary">No conversations yet</span>
                                    <span className="empty-state-hint">Tap the compose button to start messaging</span>
                                </div>
                            </div>
                            <div className="fab-speed-dial" id="lxmf-fab-dial">
                                <div className="fab-dial-actions" id="fab-dial-actions">
                                    <div className="fab-dial-item" id="fab-dial-contacts">
                                        <span className="fab-dial-label">Contacts</span>
                                        <button className="fab-dial-btn" aria-label="Pick from contacts">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                                <circle cx="9" cy="7" r="4"/>
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="fab-dial-item" id="fab-dial-new">
                                        <span className="fab-dial-label">New</span>
                                        <button className="fab-dial-btn" aria-label="New conversation">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path d="M12 20h9"/>
                                                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <button className="view-fab" id="lxmf-send-fab" title="New conversation" aria-expanded="false">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M12 20h9"/>
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="lxmf-chat" id="lxmf-chat-area">
                            <div className="lxmf-chat-header" id="lxmf-chat-header" style={{display: "none"}}>
                                <button className="mobile-back-btn" id="lxmf-back-btn" aria-label="Back to conversations">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"/>
                                    </svg>
                                </button>
                                <div className="lxmf-chat-header-avatar" id="lxmf-contact-avatar"></div>
                                <div className="lxmf-chat-header-info">
                                    <span className="lxmf-chat-header-name" id="lxmf-chat-header-name"></span>
                                    <span className="lxmf-chat-header-status" id="lxmf-chat-header-status"></span>
                                </div>
                                <div className="lxmf-chat-header-actions">
                                    <button className="game-challenge-btn" id="game-challenge-btn" title="Challenge to a game" style={{display: "none"}}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <rect x="3" y="3" width="7" height="7"/>
                                            <rect x="14" y="3" width="7" height="7"/>
                                            <rect x="3" y="14" width="7" height="7"/>
                                            <rect x="14" y="14" width="7" height="7"/>
                                        </svg>
                                    </button>
                                    <button className="lxst-call-btn" id="lxst-call-btn" title="Call" aria-label="Call" style={{display: "none"}}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                    </button>
                                    <button className="chat-header-menu-btn" id="chat-header-menu-btn" title="More options" aria-label="More options">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <circle cx="12" cy="5" r="1" fill="currentColor"/>
                                            <circle cx="12" cy="12" r="1" fill="currentColor"/>
                                            <circle cx="12" cy="19" r="1" fill="currentColor"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="lxst-call-strip" id="lxst-call-strip" hidden aria-live="polite">
                                <div className="lxst-call-strip-indicator" aria-hidden="true">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path
                                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                </div>
                                <div className="lxst-call-strip-main">
                                    <span className="lxst-call-strip-title" id="lxst-call-strip-title"></span>
                                    <div className="lxst-call-strip-meta">
                                        <span className="lxst-call-strip-status" id="lxst-call-strip-status"></span>
                                    </div>
                                </div>
                                <div className="lxst-call-strip-actions">
                                    <button className="lxst-call-action lxst-call-action-answer" id="lxst-call-answer-btn" type="button" title="Answer call"
                                            aria-label="Answer call">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <polyline points="16 2 16 8 22 8"/>
                                            <line x1="22" y1="2" x2="16" y2="8"/>
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                        <span>Answer</span>
                                    </button>
                                    <button className="lxst-call-action" id="lxst-call-reject-btn" type="button" title="Reject call" aria-label="Reject call">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path
                                                d="M10.1 13.9a16 16 0 0 0 4.21 2.01l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65"/>
                                            <line x1="2" y1="2" x2="22" y2="22"/>
                                        </svg>
                                        <span>Reject</span>
                                    </button>
                                    <div className="lxst-call-strip-controls" id="lxst-call-strip-controls" hidden>
                                        <button className="lxst-call-toggle" id="lxst-call-mute-btn" type="button" title="Mute microphone" aria-label="Mute microphone"
                                                aria-pressed="false"></button>
                                        <button className="lxst-call-toggle" id="lxst-call-speaker-btn" type="button" title="Use speaker" aria-label="Use speaker"
                                                aria-pressed="false"></button>
                                    </div>
                                    <button className="lxst-call-action lxst-call-action-hangup" id="lxst-call-hangup-btn" type="button" title="Hang up" aria-label="Hang up">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                        <span>Hang up</span>
                                    </button>
                                </div>
                            </div>
                            <div className="lxmf-messages" id="lxmf-messages">
                                <div className="lxmf-empty">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                                         strokeLinejoin="round" style={{opacity: 0.15}}>
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                    </svg>
                                    <span className="empty-state-primary">Your messages</span>
                                    <span className="empty-state-hint">Select a conversation or start a new one</span>
                                </div>
                            </div>
                            <div id="lxmf-pending-file" className="file-transfer-info" style={{display: "none"}}></div>
                            <div id="lxmf-reply-preview" className="reply-preview-bar" style={{display: "none"}}>
                                <div className="reply-preview-content">
                                    <span className="reply-preview-sender"></span>
                                    <span className="reply-preview-text"></span>
                                </div>
                                <button className="reply-preview-close" aria-label="Cancel reply">&times;</button>
                            </div>
                            <div className="lxmf-compose" id="lxmf-compose-bar" style={{display: "none"}}>
                                <input type="file" id="lxmf-file-input" style={{display: "none"}}/>
                                <input type="file" id="lxmf-photos-input" accept="image/*,video/*" style={{display: "none"}}/>
                                <input type="file" id="lxmf-camera-input" accept="image/*" capture="environment" style={{display: "none"}}/>
                                <input type="file" id="lxmf-video-input" accept="video/*" capture="environment" style={{display: "none"}}/>
                                <button className="lxmf-compose-attach-btn" id="attach-file-btn" title="Attach" aria-label="Attach emoji or file">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"/>
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                    </svg>
                                </button>
                                <textarea id="lxmf-input" className="nr-input" placeholder="Message..." aria-label="Message input" rows={1}
                                          title="Enter to send, Shift+Enter for new line"></textarea>
                                <span className="lxmf-char-count" id="lxmf-char-count" aria-live="polite" style={{display: "none"}}></span>
                                <button className="lxmf-send-btn" id="send-msg-btn" aria-label="Send message">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                         strokeLinejoin="round">
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
