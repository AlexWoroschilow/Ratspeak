import React from 'react';
import {PeerEnriched} from '../../ApplicationStore/Peers';
import Blockie from './Blockie';
import {PeerName} from "./PeerName";
import {inject, observer} from "mobx-react";
import {Contacts as ContactsStore} from "../../ApplicationStore/Contacts";
import {error, info} from "@tauri-apps/plugin-log";

interface PeerDetailProps {
    contacts?: ContactsStore | undefined;
    peer: PeerEnriched;
    onMessage?: (peer: PeerEnriched) => void;
    onCall?: (peer: PeerEnriched) => void;
    onAddContact?: (peer: PeerEnriched) => void;
    onBlock?: (peer: PeerEnriched) => void;
}

interface ContactsState {
    message?: string | undefined;
    error?: {
        message?: string | undefined;
    } | undefined;
}


@inject("contacts")
@observer
export default class PeerDetail extends React.PureComponent<PeerDetailProps, ContactsState> {
    constructor(props: PeerDetailProps) {
        super(props);

        this.state = {
            message: undefined,
            error: undefined,
        };
    }


    getStatusLabel() {
        const {peer} = this.props;
        if (peer.status === 'reachable' || peer?.status === 'direct') return 'Recent';
        if (peer.status === 'stale') return 'Seen today';
        return 'Older / unknown';
    }

    formatTime(seconds: number | null) {
        if (!seconds) return 'No activity yet';
        return new Date(seconds * 1000).toLocaleString();
    }


    onContact(peer: PeerEnriched) {
        const {contacts} = this.props;
        contacts?.addContact(peer, peer.display_name)
            .then((contact: PeerEnriched) => {
                this.setState({message: `Contact added ${contact.display_name}`});
                let interval = setInterval(() => {
                    this.setState({message: undefined});
                    clearInterval(interval);
                }, 5000)
            })
            .catch((error) => {
                this.setState({error: error});
                let interval = setInterval(() => {
                    this.setState({error: undefined});
                    clearInterval(interval);
                }, 5000)

            });

    }


    render() {
        const {peer, onMessage, onCall, onAddContact, onBlock} = this.props;
        const {error, message} = this.state;
        const statusLabel = this.getStatusLabel();

        return (
            <div className="peers-detail-content">
                {(message != undefined) && <>
                    <div className="rs-dialog-field-info">
                        {message}
                    </div>
                </>}

                {(error?.message != undefined) && <>
                    <div className="rs-dialog-field-error" id="rnode-public-map-error">
                        {error?.message}
                    </div>
                </>}
                <div className="peers-detail-header">
                    {(peer?.identity_hash != undefined) &&
                        <div className="peers-detail-avatar">
                            <Blockie seed={peer.identity_hash} size={64}/>
                        </div>}

                    <div className="peers-detail-name">
                        <PeerName peer={peer}/>
                    </div>
                    <div
                        className="peers-detail-hash"
                        id="peers-detail-hash-copy"
                        title="Click to copy"
                        onClick={() => navigator.clipboard.writeText(peer.hash)}>
                        {peer.hash}
                    </div>
                    <div className="peers-detail-status">
                        <span className={`conn-status-dot status-${peer.status}`}></span> {statusLabel}
                    </div>
                </div>

                <div className="peers-detail-actions entity-action-grid">
                    <button className="nr-btn entity-action-btn" onClick={() => onCall?.(peer)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path
                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <span>Call</span>
                    </button>
                    <button className="nr-btn entity-action-btn" onClick={() => onMessage?.(peer)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <span>Message</span>
                    </button>
                    {!peer.is_contact && (
                        <button className="nr-btn entity-action-btn" onClick={this.onContact.bind(this, peer)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="8.5" cy="7" r="4"/>
                                <line x1="20" y1="8" x2="20" y2="14"/>
                                <line x1="23" y1="11" x2="17" y2="11"/>
                            </svg>
                            <span>Add</span>
                        </button>
                    )}
                    <button className="danger-btn entity-action-btn" onClick={() => onBlock?.(peer)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                        </svg>
                        <span>Block</span>
                    </button>
                </div>
                <br/>

                <div className="peers-detail-section">
                    <div className="peers-detail-section-title">Activity</div>
                    <div className="peers-detail-field">
                        <span className="peers-detail-field-label">First heard</span>
                        <span className="peers-detail-field-value">{peer.first_seen ? this.formatTime(peer.first_seen) : '\u2014'}</span>
                    </div>
                    <div className="peers-detail-field">
                        <span className="peers-detail-field-label">Last heard</span>
                        <span className="peers-detail-field-value">{this.formatTime(peer.last_seen)}</span>
                    </div>
                </div>

                <div className="peers-detail-section">
                    <div className="peers-detail-section-title">Routing</div>
                    <div className="peers-detail-field">
                        <span className="peers-detail-field-label">Route</span>
                        <span className="peers-detail-field-value">{peer.route_label || 'No current path'}</span>
                    </div>
                    <div className="peers-detail-field">
                        <span className="peers-detail-field-label">Hops</span>
                        <span className="peers-detail-field-value">{peer.hops !== null ? peer.hops : '\u2014'}</span>
                    </div>
                    <div className="peers-detail-field">
                        <span className="peers-detail-field-label">Path age</span>
                        <span className="peers-detail-field-value">
                        {peer?.path_age !== null ? `${peer.path_age}s` : '\u2014'}
                    </span>
                    </div>
                    <div className="peers-detail-field">
                        <span className="peers-detail-field-label">Via</span>
                        <span className="peers-detail-field-value">{peer.via || (peer.iface_is_live ? 'direct' : '\u2014')}</span>
                    </div>
                    <div className="peers-detail-field">
                        <span className="peers-detail-field-label">Interface</span>
                        <span className="peers-detail-field-value">
                    </span>
                    </div>
                </div>

                <div className="peers-detail-section">
                    <div className="peers-detail-section-title">Contact</div>
                    <div className="peers-detail-field">
                        <span className="peers-detail-field-label">Saved</span>
                        <span className="peers-detail-field-value">{peer.is_contact ? 'Yes' : 'No'}</span>
                    </div>
                </div>

            </div>
        );
    }
}