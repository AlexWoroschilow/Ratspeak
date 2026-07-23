"use strict";
import React, {Suspense} from "react";
import {Network as NetworkStore, NetworkLog, Statistic, StatisticInterface} from "../../ApplicationStore/Network";
import {PeerEnriched} from "../../ApplicationStore/Peers";
import {inject, observer} from "mobx-react";
import moment from "moment";

interface StatusProps {
    network?: NetworkStore;
}

interface StatusState {
}


@inject("network")
@observer
export class Status extends React.Component<StatusProps, StatusState> {
    constructor(props: StatusProps) {
        super(props);
    }

    getTxb(statistic: Statistic | undefined) {
        if (statistic == undefined) {
            return 0;
        }
        let txb = 0;
        statistic?.interface_stats?.interfaces?.forEach?.(
            (iface: StatisticInterface) => {
                txb += iface.txb;
            });

        return (txb / 1000).toFixed(2);
    }

    getRxb(statistic: Statistic | undefined) {
        if (statistic == undefined) {
            return 0;
        }

        let rxb = 0;
        statistic?.interface_stats?.interfaces?.forEach?.(
            (iface: StatisticInterface) => {
                rxb += iface.rxb;
            });

        return (rxb / 1000).toFixed(2);
    }

    render() {
        const {network} = this.props;

        return <>
            <div className="network-pulse" id="network-pulse">
                <div className="pulse-identity" id="pulse-identity">
                    {network?.statistic?.interface_stats?.interfaces?.map?.(
                        (iface: StatisticInterface) => (<>
                                <span className={`activity-level-btn`}>
                                    {iface.name}
                                </span>
                        </>))}
                </div>
                <div className="pulse-throughput">
                        <span className="pulse-throughput-item" title="Total uploaded">
                            <span className="pulse-throughput-arrow" aria-hidden="true">&uarr;</span>
                            <span className="pulse-throughput-value" id="net-stat-tx">
                                {this.getTxb(network?.statistic)} KB
                            </span>
                        </span>
                    <span className="pulse-throughput-item" title="Total downloaded">
                            <span className="pulse-throughput-arrow" aria-hidden="true">&darr;</span>
                            <span className="pulse-throughput-value" id="net-stat-rx">
                                {this.getRxb(network?.statistic)} KB
                            </span>
                        </span>
                </div>
                <div className="pulse-actions">
                    <button className="pulse-announce-btn" id="network-announce-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 11l18-8-8 18-2-8-8-2z"/>
                        </svg>
                        <span>Announce</span>
                    </button>
                </div>
            </div>

        </>
    }
}
