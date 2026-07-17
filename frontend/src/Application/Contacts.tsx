"use strict";
import React from "react";
import {Menu} from "./Contacts/Menu";

interface ContactsProps {
}

interface ContactsState {
    isVisibleMenu?: boolean;
}

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
