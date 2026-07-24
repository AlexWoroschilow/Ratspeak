"use strict";
import React, {lazy, Suspense, MouseEvent} from "react";
import {inject, observer} from "mobx-react"; // or 'mobx-react-lite' for functional components
import {PeerCache, PeerEnriched, PeerEnrichedStatus, Peers as PeersStore} from "../ApplicationStore/Peers";
import PeerDetail from "./components/PeerDetail";

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

    doApplyFilter(event: MouseEvent) {
        const filterType: string = `${event.currentTarget.getAttribute('data-filter')}`;

        let filter = {...this.state.filter};
        const status: string = `${event.currentTarget.getAttribute('data-status')}`;
        const iface: string = `${event.currentTarget.getAttribute('data-interface')}`;

        (filterType == "all") &&
        (filter = {
            ...filter, ...{
                interface: undefined,
                status: undefined
            }
        });

        (filterType == "interface") &&
        (filter = {
            ...filter, ...{
                interface: (filter?.interface == iface) //
                    ? undefined //
                    : iface
            }
        });

        (filterType == "status") &&
        (filter = {
            ...filter, ...{
                status: (filter?.status == status) //
                    ? undefined //
                    : status
            }
        });

        (filter != this?.state?.filter) &&
        (this.setState({filter: filter}));
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

            <div className="view" id="view-peers">
                <div className="peers-layout">
                    <div className="peers-content">
                        <div className="peers-list-panel">
                            <div className="peers-toolbar">
                                <input type="text" id="peers-search" className="conn-search-input" placeholder="Search..." autoCorrect="off" autoCapitalize="none"
                                       spellCheck="false" value={searchQuery} onChange={this.onSearchChange.bind(this)}/>
                            </div>
                            <div className="peers-list-scroll" id="peers-list-scroll">
                                <div className="activity-filters" id="activity-filters">
                                    <button className={`activity-level-btn ${(!filter?.interface && !filter?.status) && "active"}`}
                                            onClick={this.doApplyFilter.bind(this)}
                                            data-filter={"all"}
                                            data-type={'all'}>
                                        All
                                        {(!filter?.interface && !filter?.status) && <>
                                            &nbsp;({Object.entries(filteredCollection).length})
                                        </>}
                                    </button>
                                    {interfaces.map((iface: string | undefined) => (<>
                                        {iface !== undefined &&
                                            <button className={`activity-level-btn ${(filter?.interface == iface) && "active"}`}
                                                    onClick={this.doApplyFilter.bind(this)}
                                                    data-filter={"interface"}
                                                    data-interface={iface}>
                                                {iface}

                                                {(filter?.interface == iface) && <>
                                                    &nbsp;({Object.entries(filteredCollection).length})
                                                </>}

                                            </button>}
                                    </>))}

                                    {Object.entries(statuses).map(([status, label]) => (
                                        <button className={`activity-level-btn ${(filter?.status == status) && "active"}`}
                                                onClick={this.doApplyFilter.bind(this)}
                                                data-filter={"status"}
                                                data-status={status}>

                                            {label}

                                            {(filter?.status == status) && <>
                                                &nbsp;({Object.entries(filteredCollection).length})
                                            </>}

                                        </button>
                                    ))}

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