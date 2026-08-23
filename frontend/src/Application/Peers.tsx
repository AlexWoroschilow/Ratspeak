"use strict";
import React, {lazy, Suspense} from "react";
import {inject, observer} from "mobx-react"; // or 'mobx-react-lite' for functional components
import {PeerCache, PeerEnriched, PeerEnrichedStatus, Peers as PeersStore} from "../ApplicationStore/Peers";
import {Preview} from "./Peers/Preview";
import Status from "./Peers/Status";
import "./Peers.scss";
import {Row} from "./Peers/Row";


interface PeersProps {
    peers?: PeersStore;
}

interface PeersState {
    selected?: PeerEnriched | undefined;
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
export class Peers extends React.PureComponent<PeersProps, PeersState> {
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
        this.setState({selected: peer});
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

    onContactBlocked(peer: PeerEnriched) {
        (this?.state?.selected == peer) &&
        (this.setState({selected: undefined}));
    }

    render() {
        const {peers} = this.props;
        let {searchQuery, filter, selected} = this.state;
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
        });


        let key: string | undefined = undefined;
        (selected == undefined && filtered?.length > 0) &&
        ([key, selected] = filtered[0] as [string, PeerEnriched | undefined]);


        const filteredCollection: PeerCache = Object.fromEntries(filtered);


        return <>
            <div className={"Peers"}>

                <div className="view view-peers">
                    <div className="network-layout">

                        <Status
                            onChangedSearch={this.onChangedSearch.bind(this)}
                            onChangedFilter={this.onChangedFilter.bind(this)}
                            filteredCollection={filteredCollection}
                            interfaces={interfaces}/>

                        <div className="network-main">

                            <nav className="scrollable">
                                {Object.entries(filteredCollection).map(([key, peer]: [string, PeerEnriched | undefined]) => (
                                    <Row onSelectedPeer={this.onSelectedPeer.bind(this)}
                                         selected={selected}
                                         peer={peer}/>
                                ))}
                            </nav>


                            {(selected === undefined) && <>
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


                            {(selected !== undefined) && <>
                                <div className="peers-detail">
                                    <Preview peer={selected}
                                             onContactBlocked={this.onContactBlocked.bind(this)}
                                    />
                                </div>
                            </>}

                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}