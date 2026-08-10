"use strict";
import React, {lazy, Suspense, MouseEvent} from "react";
import {inject, observer} from "mobx-react"; // or 'mobx-react-lite' for functional components
import {PeerCache, PeerEnriched, PeerEnrichedStatus, Peers as PeersStore} from "../ApplicationStore/Peers";
import PeerDetail from "./components/PeerDetail";
import Status from "./Peers/Status";
import "./Peers.scss";


const PeerView = lazy(() => import('./components/PeerRow'));

interface PeersProps {
    peers?: PeersStore;
}

interface PeersState {
    selected?: PeerEnriched;
    searchQuery: string;
    sortKey: string;

    filter?: {
        interface?: string | undefined;
        status?: string | undefined;
    }

    statuses: {
        [key in PeerEnrichedStatus]: string;
    }
}

@inject("peers")
@observer
export default class Peers extends React.PureComponent<PeersProps, PeersState> {
    constructor(props: PeersProps) {
        super(props);

        this.state = {
            selected: undefined,
            searchQuery: "",
            sortKey: "last_seen",

            filter: {
                interface: undefined,
                status: 'reachable',
            },

            statuses: {
                reachable: "Reachable",
                stale: "Stale",
                offline: "Offline",
                unreachable: "Unreachable",
                direct: "Direct",
            }
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

    onChangedFilter(filter: any) {
        this.setState({
            filter: filter
        });
    }

    onChangedSearch(query: string) {
        this.setState({
            searchQuery: query
        });
    }


    render() {
        const {peers} = this.props;
        const {searchQuery, sortKey, statuses, filter} = this.state;
        const collection: PeerCache = peers?.collection || {};

        const interfaces = Array.from(
            new Map(Object.entries(collection).map(([key, peer]: [string, PeerEnriched | undefined]) => [
                `${peer?.iface}`, peer?.iface
            ])).values()
        );


        let filtered = Object.entries(collection);

        (searchQuery?.length > 0) &&
        (filtered = filtered.filter(([key, peer]: [string, PeerEnriched | undefined]) => {
            if (!searchQuery) return true;
            const name = `${peer?.display_name || peer?.hash}`;
            return name.toLowerCase().includes(searchQuery.toLowerCase());
        }));

        (filter?.interface !== undefined) &&
        (filtered = filtered.filter(([key, peer]: [string, PeerEnriched | undefined]) => {
            return `${peer?.iface}` == `${filter?.interface}`;
        }));

        (filter?.status !== undefined) &&
        (filtered = filtered.filter(([key, peer]: [string, PeerEnriched | undefined]) => {
            return `${peer?.status}` == `${filter?.status}`;
        }));


        filtered.sort(([aKey, a]: [string, PeerEnriched | undefined], [bKey, b]: [string, PeerEnriched | undefined]) => {
            return (b?.last_seen || 0) - (a?.last_seen || 0);
        })

        const filteredCollection: PeerCache = Object.fromEntries(filtered);


        return <>

            <div className="view view-peers">
                <div className="network-layout">

                    <Status
                        onChangedSearch={this.onChangedSearch.bind(this)}
                        onChangedFilter={this.onChangedFilter.bind(this)}
                        filteredCollection={filteredCollection}
                        interfaces={interfaces}/>

                    <div className="network-main">

                        <nav className="custom-scrollbar">
                            {Object.entries(filteredCollection).map(([key, peer]: [string, PeerEnriched | undefined]) => (
                                <Suspense key={`${peer?.hash}`} fallback={<div className="peers-row">Loading...</div>}>
                                    <PeerView onSelectedPeer={this.onSelectedPeer.bind(this)}
                                              selected={this?.state?.selected}
                                              peer={peer}/>
                                </Suspense>
                            ))}
                        </nav>


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
                            <div className="peers-detail">
                                <PeerDetail peer={this.state.selected}/>
                            </div>
                        </>}

                    </div>
                </div>
            </div>

        </>
    }
}