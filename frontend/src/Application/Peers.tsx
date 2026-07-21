"use strict";
import React from "react";
import {inject} from "mobx-react";
import {ApplicationStore} from "../ApplicationStore";
import {PeerEnriched} from "../ApplicationStore/Peers";

import {PeerView} from "./components/PeerView";

interface PeersProps {
    store?: ApplicationStore;
}

interface PeersState {
    collection: Array<PeerEnriched>
}

@inject("store")
export default class Peers extends React.PureComponent<PeersProps, PeersState> {

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
                                    {this?.props.store?.peers?.collection?.map?.((peer: PeerEnriched) => (
                                        <PeerView peer={peer}/>
                                    ))}
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
