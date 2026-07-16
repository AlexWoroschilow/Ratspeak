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
export class Messages {
    constructor() {
    }
}
