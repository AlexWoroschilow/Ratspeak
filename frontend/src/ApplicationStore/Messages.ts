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
// Based on the investigation of the `@dashboard/static/js/*` files, here are the unique `RS.listen` methods (event listeners) used by the application to handle real-time updates from the backend:
//
// ### Messaging and Conversations (LXMF)
// *   `lxmf_message`: Triggered when a new LXMF message is received.
// *   `lxmf_identity`: Updates the local LXMF identity state.
// *   `lxmf_step`: Reports progress/steps during complex LXMF operations.
// *   `lxmf_delivery_progress`: Provides real-time delivery status for outbound messages.
// *   `conversations_update`: Triggered when the list of conversations changes.
// *   `conversation_update`: Triggered when a specific conversation is updated (e.g., new message, read status).
// *   `conversation_hidden` / `conversation_deleted`: Triggered when a conversation is hidden or removed.
// *   `reaction_update`: Triggered when an emoji reaction is added or updated.
// *   `unread_total`: Provides the total count of unread messages.
//
// ### Voice Communication
// *   `voice_incoming_call`: Triggered when an incoming voice call is detected.
// *   `voice_call_update`: Updates the state of an active or pending voice call.
//
//
import {action, makeAutoObservable, observable} from "mobx";
import {invoke} from "@tauri-apps/api/core";
import {listen} from "@tauri-apps/api/event";

export interface Conversation {
    hash: string;
    display_name: string;
    last_message: string;
    timestamp: number;
    direction: 'inbound' | 'outbound';
    unread: number;
    via_node?: string | null;
}

export interface Message {
    id: string;
    source: string;
    destination: string;
    content: string;
    timestamp: number;
    direction: 'inbound' | 'outbound';
    state: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
    title?: string;
    client_msg_id?: string;
}

export interface VoiceStatus {
    is_active: boolean;
    status: 'idle' | 'calling' | 'connected' | 'incoming';
    peer_hash?: string;
    is_muted: boolean;
    speaker_active: boolean;
}

export class Messages {
    public conversations: Map<string, Conversation> = new Map();
    public activeConversation: { hash: string; messages: Message[] } | null = null;
    public unreadTotal: number = 0;
    public voice: VoiceStatus = {
        is_active: false,
        status: 'idle',
        is_muted: false,
        speaker_active: true
    };

    constructor() {
        makeAutoObservable(this, {
            conversations: observable,
            activeConversation: observable,
            voice: observable,
            setConversations: action,
            setActiveConversation: action,
            setUnreadTotal: action,
            setVoiceStatus: action,
            updateConversation: action,
            addMessageToActive: action,
        });

        this.listeners();
        this.fetchConversations();
        this.fetchVoiceStatus();
    }

    setConversations(conversations: Record<string, Conversation>) {
        this.conversations = new Map(Object.entries(conversations));
    }

    setActiveConversation(hash: string | null, messages: Message[] = []) {
        if (hash) {
            this.activeConversation = { hash, messages };
        } else {
            this.activeConversation = null;
        }
    }

    setUnreadTotal(total: number) {
        this.unreadTotal = total;
    }

    setVoiceStatus(status: VoiceStatus) {
        this.voice = status;
    }

    updateConversation(conversation: Conversation) {
        this.conversations.set(conversation.hash, conversation);
    }

    addMessageToActive(message: Message) {
        if (this.activeConversation && (message.source === this.activeConversation.hash || message.destination === this.activeConversation.hash)) {
            this.activeConversation.messages.push(message);
        }
    }

    async fetchConversations() {
        try {
            const conversations = await invoke<Record<string, Conversation>>('api_lxmf_conversations');
            this.setConversations(conversations);
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
        }
    }

    async getConversation(hash: string) {
        try {
            const data = await invoke<{ hash: string, messages: Message[], unread_total: number }>('get_conversation', { hash });
            this.setActiveConversation(data.hash, data.messages);
            this.setUnreadTotal(data.unread_total);
        } catch (error) {
            console.error("Failed to get conversation:", error);
        }
    }

    async sendLxmfMessage(dest_hash: string, content: string, title?: string) {
        try {
            return await invoke('send_lxmf_message', { dest_hash, content, title });
        } catch (error) {
            console.error("Failed to send message:", error);
            throw error;
        }
    }

    async sendLxmfReply(dest_hash: string, content: string, reply_to_id: string) {
        try {
            return await invoke('send_lxmf_reply', { dest_hash, content, reply_to_id });
        } catch (error) {
            console.error("Failed to send reply:", error);
            throw error;
        }
    }

    async markRead(hash: string) {
        try {
            const data = await invoke<{ unread_total: number }>('mark_read', { hash });
            this.setUnreadTotal(data.unread_total);
            const conv = this.conversations.get(hash);
            if (conv) {
                this.updateConversation({ ...conv, unread: 0 });
            }
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    }

    async hideConversation(hash: string) {
        try {
            await invoke('hide_conversation', { hash });
            this.conversations.delete(hash);
            if (this.activeConversation?.hash === hash) {
                this.setActiveConversation(null);
            }
        } catch (error) {
            console.error("Failed to hide conversation:", error);
        }
    }

    async deleteConversation(hash: string) {
        try {
            await invoke('delete_conversation', { hash });
            this.conversations.delete(hash);
            if (this.activeConversation?.hash === hash) {
                this.setActiveConversation(null);
            }
        } catch (error) {
            console.error("Failed to delete conversation:", error);
        }
    }

    // Voice Methods
    async fetchVoiceStatus() {
        try {
            const status = await invoke<VoiceStatus>('voice_status');
            this.setVoiceStatus(status);
        } catch (error) {
            console.error("Failed to fetch voice status:", error);
        }
    }

    async voiceCall(hash: string) {
        try {
            await invoke('voice_call', { hash });
        } catch (error) {
            console.error("Failed to initiate voice call:", error);
        }
    }

    async voiceAnswer() {
        try {
            await invoke('voice_answer');
        } catch (error) {
            console.error("Failed to answer voice call:", error);
        }
    }

    async voiceReject() {
        try {
            await invoke('voice_reject');
        } catch (error) {
            console.error("Failed to reject voice call:", error);
        }
    }

    async voiceHangup() {
        try {
            await invoke('voice_hangup');
        } catch (error) {
            console.error("Failed to hangup voice call:", error);
        }
    }

    async toggleMute() {
        try {
            const newMuteState = !this.voice.is_muted;
            await invoke('voice_set_microphone_muted', { muted: newMuteState });
            this.setVoiceStatus({ ...this.voice, is_muted: newMuteState });
        } catch (error) {
            console.error("Failed to toggle mute:", error);
        }
    }

    listeners() {
        listen<Message>("lxmf_message", (event) => {
            const msg = event.payload;
            this.addMessageToActive(msg);
            this.fetchConversations(); // Refresh list to update preview/unread
        });

        listen<Record<string, Conversation>>("conversations_update", (event) => {
            this.setConversations(event.payload);
        });

        listen<{ hash: string }>("conversation_update", (event) => {
            if (this.activeConversation?.hash === event.payload.hash) {
                this.getConversation(event.payload.hash);
            }
        });

        listen<{ count: number }>("unread_total", (event) => {
            this.setUnreadTotal(event.payload.count);
        });

        listen<VoiceStatus>("voice_call_update", (event) => {
            this.setVoiceStatus(event.payload);
        });

        listen<VoiceStatus>("voice_incoming_call", (event) => {
            this.setVoiceStatus(event.payload);
        });
    }
}
