"use strict";
import React from "react";

interface ContactsProps {
}

interface ContactsState {
}


export class Contacts extends React.Component<ContactsProps, ContactsState> {
    constructor(props: ContactsProps) {
        super(props);
    }

    render() {

        return <>

            <div class="view" id="view-contacts">
                <div class="contacts-standalone">
                    <div class="contacts-standalone-header">
                        <div class="contacts-standalone-title">
                            <h2>Contacts</h2>
                            <span id="contacts-count">0 contacts</span>
                        </div>
                        <button class="nr-btn nr-btn-sm contacts-add-btn" id="contacts-add-btn" title="Add contact" aria-label="Add contact">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"
                                 stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="8.5" cy="7" r="4"/>
                                <line x1="20" y1="8" x2="20" y2="14"/>
                                <line x1="23" y1="11" x2="17" y2="11"/>
                            </svg>
                            <span>Add Contact</span>
                        </button>
                    </div>
                    <div class="contacts-standalone-toolbar">
                        <input type="text" id="contacts-search" class="conn-search-input msg-search" placeholder="Search..." autocorrect="off" autocapitalize="none"
                               spellcheck="false"/>
                    </div>
                    <div class="contacts-list-scroll" id="contacts-standalone-list">
                        <div class="empty-state">
                            <svg class="empty-state-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <span class="empty-state-primary">No contacts yet</span>
                            <span class="empty-state-hint">Add a contact from Peers, or tap +</span>
                        </div>
                    </div>
                </div>
                <button class="view-fab" id="contacts-add-fab" title="Add contact" aria-label="Add contact">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
