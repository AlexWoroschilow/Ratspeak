"use strict";
import React from "react";

interface PeersProps {
}

interface PeersState {
}


export class Peers extends React.Component<PeersProps, PeersState> {
    constructor(props: PeersProps) {
        super(props);
    }

    render() {

        return <>

            <div class="view" id="view-peers">
                <div class="peers-layout">
                    <div class="peers-content">
                        <div class="peers-list-panel">
                            <div class="peers-toolbar">
                                <input type="text" id="peers-search" class="conn-search-input" placeholder="Search..." autocorrect="off" autocapitalize="none"
                                       spellcheck="false"/>
                                <div class="toolbar-dropdown peers-sort-dropdown">
                                    <button class="toolbar-dropdown-btn" id="peers-sort-btn" type="button" aria-label="Sort peers" title="Sort peers">
                                        <span class="peers-sort-label">Sort by</span>
                                        <svg class="peers-sort-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
                                             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <polyline points="6 9 12 15 18 9"/>
                                        </svg>
                                    </button>
                                    <div class="toolbar-dropdown-menu" id="peers-sort-menu">
                                        <button class="toolbar-dropdown-item" data-sort="name">Alphabetical</button>
                                        <button class="toolbar-dropdown-item" data-sort="hops">Hops</button>
                                        <button class="toolbar-dropdown-item active" data-sort="last_seen">Last Seen</button>
                                    </div>
                                </div>
                            </div>
                            <div class="peers-list-scroll" id="peers-list-scroll">
                                <div class="peers-list-body" id="peers-list-body"></div>
                            </div>
                        </div>
                        <div class="peers-detail-panel" id="peers-detail-panel">
                            <div class="peers-detail-empty" id="peers-detail-empty">
                                <svg class="empty-state-svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                     stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                                <span class="text-sm text-muted-color">Select a peer to view details</span>
                            </div>
                            <div class="peers-detail-content" id="peers-detail-content" style={{display: "none"}}></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    }
}
