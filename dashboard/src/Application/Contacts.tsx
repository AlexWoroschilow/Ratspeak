"use strict";
import React from "react";
import {Menu} from "./Contacts/Menu";

interface ContactsProps {
}

interface ContactsState {
    isVisibleMenu?: boolean;
}

// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to contact management:
//
// ### Contact Lifecycle and Management
// *   `add_contact`: Adds a new contact or updates an existing one (e.g., renaming). It takes a hash and an optional display name.
// *   `remove_contact`: Removes a contact from the address book using their hash.
// *   `api_contacts`: Retrieves the list of all saved contacts.
// *   `check_contact_status`: Triggers a status check for contacts (likely checking online/reachability status).
//
// ### Blocking and Security
// *   `block_contact`: Blocks a contact. It can optionally "escalate to blackhole" (completely ignoring all traffic from the identity).
// *   `unblock_contact`: Unblocks a previously blocked contact.
// *   `api_blocked_contacts`: Retrieves the list of currently blocked identities.
//
// ### Contact Cards and Portability
// *   `api_contact_card`: Retrieves the contact card information (containing identity details and metadata) for a specific hash.
// *   `api_preview_contact_card`: Previews the contents of a contact card payload before importing.
// *   `import_contact_card`: Imports a contact card from a provided payload.
//
// ### Communication Context
// *   `get_conversation`: Retrieves the message history or conversation state for a specific contact (often used in the LXMF/messaging context).
//
// ### Summary of Locations
// These methods are primarily used in the following files:
// *   `dashboard/static/js/lxmf.js`: Managing contacts within the messaging interface (adding, removing, renaming, blocking).
// *   `dashboard/static/js/contact_card.js`: Handling the display, preview, and import of contact cards.
// *   `dashboard/static/js/settings.js`: Managing blocked contacts and unblocking actions.
// *   `dashboard/static/js/peers.js`: Allowing users to add peers as contacts or block them directly from the peer list.
// *   `dashboard/static/js/nav.js`: Loading the contact list for navigation.

export class Contacts extends React.Component<ContactsProps, ContactsState> {
    constructor(props: ContactsProps) {
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

            <div className="view" id="view-contacts" onClick={this.doHideMenu.bind(this)}>
                <div className="contacts-standalone">
                    <div className="contacts-standalone-header">
                        <div className="contacts-standalone-title">
                            <h2>Contacts</h2>
                            <span id="contacts-count">0 contacts</span>
                        </div>
                        <button className="nr-btn nr-btn-sm contacts-add-btn" id="contacts-add-btn" title="Add contact" aria-label="Add contact"
                                onClick={this.doToggleMenu.bind(this)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="8.5" cy="7" r="4"/>
                                <line x1="20" y1="8" x2="20" y2="14"/>
                                <line x1="23" y1="11" x2="17" y2="11"/>
                            </svg>
                            <span>Add Contact</span>
                        </button>

                        {this?.state?.isVisibleMenu && <Menu/>}

                    </div>
                    <div className="contacts-standalone-toolbar">
                        <input type="text" id="contacts-search" className="conn-search-input msg-search" placeholder="Search..." autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"/>
                    </div>
                    <div className="contacts-list-scroll" id="contacts-standalone-list">
                        <div className="empty-state">
                            <svg className="empty-state-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <span className="empty-state-primary">No contacts yet</span>
                            <span className="empty-state-hint">Add a contact from Peers, or tap +</span>
                        </div>
                    </div>
                </div>
                <button className="view-fab" id="contacts-add-fab" title="Add contact" aria-label="Add contact">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                </button>
            </div>
        </>
    }
}
