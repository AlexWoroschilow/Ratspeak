"use strict";
import React, {lazy, Suspense} from "react";
import {inject, observer} from "mobx-react";
import {Menu} from "./Contacts/Menu";
import {Contacts as ContactsStore} from "../ApplicationStore/Contacts";
import {Peer, PeerEnriched} from "../ApplicationStore/Peers";
import PeerDetail from "./components/PeerDetail";

const PeerView = lazy(() => import('./components/PeerRow'));

interface ContactsProps {
    contacts?: ContactsStore;
}

interface ContactsState {
    isVisibleMenu?: boolean;
    selected?: Peer;
    searchQuery: string;
}

@inject("contacts")
@observer
export class Contacts extends React.Component<ContactsProps, ContactsState> {
    constructor(props: ContactsProps) {
        super(props);

        this.state = {
            isVisibleMenu: false,
            selected: undefined,
            searchQuery: "",
        }
    }

    onSelectedPeer(peer: Peer | undefined) {
        this.setState({
            selected: peer
        });
    }

    onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchQuery: event.target.value
        });
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
        const {contacts} = this.props;
        const {searchQuery, selected} = this.state;
        const collection = contacts?.collection || [];

        let filtered = collection;
        if (searchQuery?.length > 0) {
            filtered = filtered.filter((peer: any) => {
                const name = `${peer?.display_name || peer?.hash}`;
                return name.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }

        return <>

            <div className="view" id="view-contacts" onClick={this.doHideMenu.bind(this)}>
                <div className="peers-layout">
                    <div className="peers-content">
                        <div className="peers-list-panel">
                            <div className="peers-toolbar">
                                <div className="contacts-standalone-header" style={{padding: 0, borderBottom: 0, marginBottom: '10px'}}>
                                    <div className="contacts-standalone-title">
                                        <h2 style={{margin: 0}}>Contacts</h2>
                                        <span id="contacts-count">{collection.length} contacts</span>
                                    </div>
                                    <button className="nr-btn nr-btn-sm contacts-add-btn" id="contacts-add-btn" title="Add contact" aria-label="Add contact"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                this.doToggleMenu();
                                            }}>
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
                                <input type="text" id="contacts-search" className="conn-search-input msg-search" placeholder="Search..." autoCorrect="off" autoCapitalize="none"
                                       spellCheck="false" value={searchQuery} onChange={this.onSearchChange.bind(this)}/>
                            </div>
                            <div className="peers-list-scroll" id="contacts-list-scroll">
                                <div className="peers-list-body" id="contacts-list-body">
                                    {filtered.length === 0 ? (
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
                                    ) : (
                                        filtered.map((peer: any) => (
                                            <Suspense key={`${peer?.hash}`} fallback={<div className="peers-row">Loading...</div>}>
                                                <PeerView onSelectedPeer={this.onSelectedPeer.bind(this)}
                                                          selected={selected as PeerEnriched}
                                                          peer={peer}/>
                                            </Suspense>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="peers-detail-panel" id="contacts-detail-panel">
                            {selected === undefined ? (
                                <div className="peers-detail-empty" id="contacts-detail-empty">
                                    <svg className="empty-state-svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                         strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                        <circle cx="9" cy="7" r="4"/>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                    </svg>
                                    <span className="text-sm text-muted-color">Select a contact to view details</span>
                                </div>
                            ) : (
                                <div className="peers-detail-content" id="contacts-detail-content">
                                    <PeerDetail peer={selected as PeerEnriched}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <button className="view-fab" id="contacts-add-fab" title="Add contact" aria-label="Add contact"
                        onClick={(e) => {
                            e.stopPropagation();
                            this.doToggleMenu();
                        }}>
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
