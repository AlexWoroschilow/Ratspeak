"use strict";
import React, {MouseEvent} from "react";
import {inject, observer} from "mobx-react"; // or 'mobx-react-lite' for functional components
import {PeerCache, PeerEnriched, PeerEnrichedStatus, Peers as PeersStore} from "../../ApplicationStore/Peers";

interface StatusProps {
    peers?: PeersStore;

    filteredCollection: PeerCache;
    interfaces: Array<string | undefined>;

    onChangedFilter?: (filter: {
        interface?: string | undefined;
        status?: string | undefined;
    }) => void;

    onChangedSearch?: (query: string) => void;

}

interface StatusState {
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
export default class Status extends React.PureComponent<StatusProps, StatusState> {
    constructor(props: StatusProps) {
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

    onChangedSearch(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchQuery: event.target.value
        }, () => {
            this?.props?.onChangedSearch?.(this.state.searchQuery);
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

        this.props?.onChangedFilter?.(filter);
    }

    render() {
        const {peers, filteredCollection, interfaces} = this.props;
        const {searchQuery, statuses, filter} = this.state;

        return <>

            <div className="network-pulse" id="network-pulse">
                <div className="peers-toolbar">
                    <input type="text" id="peers-search" className="conn-search-input" placeholder="Search..." autoCorrect="off" autoCapitalize="none"
                           spellCheck="false" value={searchQuery} onChange={this.onChangedSearch.bind(this)}/>
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
                </div>
            </div>

        </>
    }
}