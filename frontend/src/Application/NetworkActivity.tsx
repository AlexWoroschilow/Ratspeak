"use strict";
import React from "react";


import {inject, observer} from "mobx-react";

import {Network as NetworkStore, NetworkLogStatus} from "../ApplicationStore/Network";
import {BallTriangle} from "react-loader-spinner";
import {Status} from "./Network/Status";
import {Activity} from "./NetworkActivity/Activity";

import "./NetworkActivity.scss";
import {Blackholes} from "./NetworkActivity/Blackholes";

interface NetworkActivityProps {
    network?: NetworkStore;
}

interface NetworkActivityState {
    status?: NetworkLogStatus | undefined;
}


@inject("network")
@observer
export class NetworkActivity extends React.Component<NetworkActivityProps, NetworkActivityState> {
    constructor(props: NetworkActivityProps) {
        super(props);

        this.state = {
            status: props?.network?.status
        }
    }

    doToggleActivity() {
        const {network} = this.props;

        network?.doToggleNetworkLog?.(!this.state.status?.enabled)
            .then((status: NetworkLogStatus) => {
                return this.setState({
                    status: status
                });
            });

        return this.setState({
            status: {
                ...this.state.status, ...{
                    enabled: undefined
                }
            } as NetworkLogStatus
        });
    }

    doClearActivity() {
        const {network} = this.props;
        network?.doClearNetworkLog().then(() => {

        });
    }

    render() {

        const {network} = this.props;

        return <>

            <div className="view" id="view-network">
                <div className="network-layout">
                    <Status/>
                    <div className="network-activity-main">

                        <div className="network-activity">
                            <div className="activity-header">
                                <span className="activity-title">
                                    System drops &nbsp;({network?.blackholes?.entries?.length})
                                </span>
                                {((network?.blackholes?.entries?.length || 0) > 0) && <>
                                    <div className="activity-controls">
                                        <button className="nr-btn nr-btn-xs">
                                            Purge unverified
                                        </button>
                                        <button className="nr-btn nr-btn-xs">
                                            Clear
                                        </button>
                                    </div>
                                </>}

                            </div>
                            {((network?.blackholes?.entries?.length || 0) > 0) && <>
                                <Blackholes/>
                            </>}

                            <div className="activity-header">
                                <span className="activity-title">
                                    Network Activity
                                    {(this?.state?.status?.enabled === true) && <>
                                        &nbsp;({network?.logs?.length})
                                    </>}
                                </span>

                                <label className="prop-toggle activity-toggle">
                                    {(this?.state?.status?.enabled === undefined) && <>
                                        <BallTriangle
                                            color="#000000"
                                            height={20}
                                            width={20}
                                        />
                                    </>}
                                    {(this?.state?.status?.enabled !== undefined) && <>
                                        <input type="checkbox" id="activity-enabled-toggle" checked={this?.state?.status?.enabled}
                                               onChange={this.doToggleActivity.bind(this)}/>
                                        <span className="prop-slider"></span>
                                    </>}
                                </label>

                                {(this?.state?.status?.enabled === true) &&
                                    <div className="activity-controls">
                                        <button className="nr-btn nr-btn-xs" id="activity-clear-btn"
                                                onClick={this.doClearActivity.bind(this)}>
                                            Clear
                                        </button>
                                    </div>}
                            </div>

                            {(this?.state?.status?.enabled === true) && <>
                                <Activity status={this?.state?.status}/>
                            </>}

                            {(this?.state?.status?.enabled === false) &&
                                <div className="activity-privacy-gate" id="activity-privacy-gate">
                                    <svg className="activity-privacy-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                    <span className="activity-privacy-label">Privacy mode is active</span>
                                    <span
                                        className="activity-privacy-desc">No activity is being collected or saved. Enable for this session to see network events in real time.</span>
                                </div>}


                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}
