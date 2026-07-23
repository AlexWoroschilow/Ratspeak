"use strict";
import React, {lazy, Suspense} from "react";
import {inject, observer} from "mobx-react"; // or 'mobx-react-lite' for functional components
import {PeerCache, PeerEnriched, Peers as PeersStore} from "../ApplicationStore/Peers";
import PeerDetail from "./components/PeerDetail";
import {info} from "@tauri-apps/plugin-log";
import {ActivityStateType} from "./Network/Activity";

const PeerView = lazy(() => import('./components/PeerRow'));

interface PeersProps {
    peers?: PeersStore;
}

interface PeersState {
    selected?: PeerEnriched,
    searchQuery: string,
    sortKey: string
}

@inject("peers")
@observer
export default class Peers extends React.PureComponent<PeersProps, PeersState> {
    constructor(props: PeersProps) {
        super(props);

        this.state = {
            selected: undefined,
            searchQuery: "",
            sortKey: "last_seen"
        }
    }

    onSelectedPeer(peer: PeerEnriched | undefined) {
        this.setState({
            selected: peer
        });
    }

    onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchQuery: event.target.value
        });
    }

    onSortChange(key: string) {
        this.setState({
            sortKey: key
        });
    }

    render() {
        const {peers} = this.props;
        const {searchQuery, sortKey} = this.state;
        const collection: PeerCache = peers?.collection || {};

        const filteredCollection: PeerCache = Object.fromEntries(
            Object.entries(collection).filter(([key, peer]: [string, PeerEnriched | undefined]) => {
                if (!searchQuery) return true;
                const name = `${peer?.display_name || peer?.hash}`;
                return name.toLowerCase().includes(searchQuery.toLowerCase());
            })
        );

        const interfaces = Array.from(
            new Map(Object.entries(filteredCollection).map(([key, peer]: [string, PeerEnriched | undefined]) => [
                `${peer?.iface}`, peer?.iface
            ])).values()
        );

        return <>

            <div className="view" id="view-peers">
                <div className="peers-layout">
                    <div className="peers-content">
                        <div className="peers-list-panel">
                            <div className="peers-toolbar">
                                <input type="text" id="peers-search" className="conn-search-input" placeholder="Search..." autoCorrect="off" autoCapitalize="none"
                                       spellCheck="false" value={searchQuery} onChange={this.onSearchChange.bind(this)}/>
                                <div className="toolbar-dropdown peers-sort-dropdown">
                                    <button className="toolbar-dropdown-btn" id="peers-sort-btn" type="button" aria-label="Sort peers" title="Sort peers">
                                        <span className="peers-sort-label">Sort by</span>
                                        <svg className="peers-sort-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                                             strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <polyline points="6 9 12 15 18 9"/>
                                        </svg>
                                    </button>
                                    <div className="toolbar-dropdown-menu" id="peers-sort-menu">
                                        <button className={`toolbar-dropdown-item ${sortKey === 'name' ? 'active' : ''}`} onClick={() => this.onSortChange('name')}>Alphabetical
                                        </button>
                                        <button className={`toolbar-dropdown-item ${sortKey === 'hops' ? 'active' : ''}`} onClick={() => this.onSortChange('hops')}>Hops</button>
                                        <button className={`toolbar-dropdown-item ${sortKey === 'last_seen' ? 'active' : ''}`} onClick={() => this.onSortChange('last_seen')}>Last
                                            Seen
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="peers-list-scroll" id="peers-list-scroll">
                                <div className="activity-filters" id="activity-filters">
                                    <button className={`activity-level-btn`} data-type={'all'}> All</button>
                                    {interfaces.map((iface: string | undefined) => (<>
                                        {iface !== undefined &&
                                            <button className={`activity-level-btn`}
                                                    data-type={iface}>
                                                {iface}
                                            </button>}
                                    </>))}
                                </div>

                                <div className="peers-list-body" id="peers-list-body">
                                    {Object.entries(filteredCollection).map(([key, peer]: [string, PeerEnriched | undefined]) => (
                                        <Suspense key={`${peer?.hash}`} fallback={<div className="peers-row">Loading...</div>}>
                                            <PeerView onSelectedPeer={this.onSelectedPeer.bind(this)}
                                                      selected={this?.state?.selected}
                                                      peer={peer}/>
                                        </Suspense>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="peers-detail-panel" id="peers-detail-panel">

                            {(this?.state?.selected === undefined) && <>
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
                            </>}

                            {(this?.state?.selected !== undefined) && <>
                                <div className="peers-detail-content" id="peers-detail-content">
                                    <PeerDetail peer={this.state.selected}/>
                                </div>
                            </>}

                        </div>
                    </div>
                </div>
            </div>

        </>
    }
}