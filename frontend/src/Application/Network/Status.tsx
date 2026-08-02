"use strict";
import React, {Suspense} from "react";
import {Network as NetworkStore, NetworkLog, Statistic, StatisticInterface} from "../../ApplicationStore/Network";
import {PeerEnriched} from "../../ApplicationStore/Peers";
import {inject, observer} from "mobx-react";
import moment from "moment";
import {BallTriangle} from "react-loader-spinner";

interface StatusProps {
    network?: NetworkStore;
}

interface StatusState {
    error?: string;
    announcing: boolean | undefined;
}


@inject("network")
@observer
export class Status extends React.Component<StatusProps, StatusState> {
    private announceTimeout: any = null;

    constructor(props: StatusProps) {
        super(props);
        this.state = {
            error: undefined,
            announcing: undefined
        };
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

    onClickedAnnounce() {
        const {network} = this.props;
        this.setState({error: undefined, announcing: true});

        if (this.announceTimeout) {
            clearTimeout(this.announceTimeout);
            this.announceTimeout = null;
        }

        network?.announce().then(() => {
            this.setState({announcing: false});
            this.announceTimeout = setTimeout(() => {
                this.setState({announcing: undefined});
                this.announceTimeout = null;
            }, 5000);
        }).catch((error: any) => {
            this.onReceievedError(error);
        });
    }

    onReceievedError(error: any) {
        this.setState({
            error: error?.message || error || "Announce failed",
            announcing: undefined
        });
    }

    componentWillUnmount() {
        if (this.announceTimeout) {
            clearTimeout(this.announceTimeout);
            this.announceTimeout = null;
        }
    }

    render() {
        const {network} = this.props;

        return <>
            <div className="network-pulse" id="network-pulse">
                <div className="pulse-identity" id="pulse-identity">
                    {network?.interfacesEnabled?.map?.(
                        (iface: { name: string }) => (<>
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
                    {this.state.error && <div className="rs-dialog-field-error" style={{marginRight: 'auto'}}>
                        {this.state.error}
                    </div>}

                    {this.state.announcing === true && <div style={{marginRight: '12px'}}>
                        <BallTriangle
                            color="#000000"
                            height={24}
                            width={24}
                        />
                    </div>}

                    {this.state.announcing === false &&
                        <div className="rs-dialog-field-success" style={{marginRight: '12px', color: 'var(--status-online)'}}>
                            Announced!
                        </div>}

                    {this.state.announcing === undefined &&
                        <button className="pulse-announce-btn" id="network-announce-btn" onClick={() => this.onClickedAnnounce()}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" aria-hidden="true">
                                <path d="M3 11l18-8-8 18-2-8-8-2z"/>
                            </svg>
                            <span>Announce</span>
                        </button>
                    }
                </div>
            </div>

        </>
    }
}
