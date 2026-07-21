"use strict";
import React from "react";
import {inject} from "mobx-react";
import {ApplicationStore} from "../ApplicationStore";
import {info} from "@tauri-apps/plugin-log";
import {Peer} from "../ApplicationStore/Peers";

interface PeersProps {
    store?: ApplicationStore;
}

interface PeersState {
    collection: Array<Peer>
}

@inject("store")
export class Peers extends React.Component<PeersProps, PeersState> {

    protected store?: ApplicationStore;

    constructor(props: PeersProps) {
        super(props);

        info(`${props.store}`);
        this.store = props?.store;
    }

    componentDidMount() {
        this?.store?.peers?.getPeers?.()
            .then((collection: Peer[]) => {
                collection.forEach((peer: Peer) => {
                    info(`${peer.profile_status}`)

                });

                this.setState({
                    collection: collection
                });
            });

    }

    getShortHash(fullHash: string, front: number = 8, back: number = 4) {
        if (!fullHash) return '';
        front = front || 8;
        back = back || 4;
        if (fullHash.length <= front + back + 1) return fullHash;
        return fullHash.substring(0, front) + '\u2026' + fullHash.slice(-back);
    }

    getPeerName(peer: Peer, truncate = true): string {
        if (!peer) return '';
        let displayName = peer.display_name || this.getShortHash(peer.hash, 8, 4);
        // Apply truncation logic consistent with the UI (line 378)
        if (truncate && displayName.length > 40) {
            displayName = displayName.substring(0, 40) + '\u2026';
        }
        return displayName;
    }

    render() {

        return <>

            <div className="view" id="view-peers">
                <div className="peers-layout">
                    <div className="peers-content">
                        <div className="peers-list-panel">
                            <div className="peers-toolbar">
                                <input type="text" id="peers-search" className="conn-search-input" placeholder="Search..." autoCorrect="off" autoCapitalize="none"
                                       spellCheck="false"/>
                                <div className="toolbar-dropdown peers-sort-dropdown">
                                    <button className="toolbar-dropdown-btn" id="peers-sort-btn" type="button" aria-label="Sort peers" title="Sort peers">
                                        <span className="peers-sort-label">Sort by</span>
                                        <svg className="peers-sort-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                                             strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <polyline points="6 9 12 15 18 9"/>
                                        </svg>
                                    </button>
                                    <div className="toolbar-dropdown-menu" id="peers-sort-menu">
                                        <button className="toolbar-dropdown-item" data-sort="name">Alphabetical</button>
                                        <button className="toolbar-dropdown-item" data-sort="hops">Hops</button>
                                        <button className="toolbar-dropdown-item active" data-sort="last_seen">Last Seen</button>
                                    </div>
                                </div>
                            </div>
                            <div className="peers-list-scroll" id="peers-list-scroll">
                                <div className="peers-list-body" id="peers-list-body">
                                    {this?.state?.collection?.map((peer: Peer) => (<>
                                        <div className="peers-row [selected] [has-profile-status]" data-hash="{peer_hash}">
                                            <span className="conn-status-dot status-{status}"></span>

                                            <div className="peers-row-avatar">
                                                {/*{peer}*/}
                                            </div>

                                            <span className="peers-row-main">
                                                <span className="peers-row-name [is-hash]">
                                                    {this.getPeerName(peer)}
                                                </span>
                                                <span className="peers-row-status" title={`${peer?.profile_status}`}>
                                                    {peer?.profile_status}
                                                </span>
                                            </span>
                                            <span className="peers-row-meta">
                                                <span className="peers-iface-badge" title="Live via {interface_name}">
                                                    {peer.iface}
                                                </span>
                                            </span>
                                        </div>
                                    </>))}
                                </div>
                            </div>
                        </div>
                        <div className="peers-detail-panel" id="peers-detail-panel">
                            <div className="peers-detail-empty" id="peers-detail-empty">
                                <svg className="empty-state-svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                                <span className="text-sm text-muted-color">Select a peer to view details</span>
                            </div>
                            <div className="peers-detail-content" id="peers-detail-content" style={{display: "none"}}></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    }
}
