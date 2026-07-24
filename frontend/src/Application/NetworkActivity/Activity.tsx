"use strict";
import React, {MouseEvent} from "react";
import {Network, NetworkLog, NetworkLogLevel, NetworkLogStatus} from "../../ApplicationStore/Network";
import {inject, observer} from "mobx-react";
import {ActivityRow} from "./ActivityRow";

interface ActivityProps {
    network?: Network;
    status?: NetworkLogStatus | undefined;
}

export type ActivityStateLevel = "essential" | "standard" | "detailed";
export type ActivityStateType = "all" | "announce" | "path" | "message" | "lxst" | "interface" | "link" | "error";

interface ActivityState {
    status?: NetworkLogStatus | undefined;

    levels: {
        [key in ActivityStateLevel]: string;
    }

    types: {
        [key in ActivityStateType]: string;
    }

    filters: {
        [key in ActivityStateType]: boolean;
    }

}


@inject("network")
@observer
export class Activity extends React.Component<ActivityProps, ActivityState> {
    constructor(props: ActivityProps) {
        super(props);
        this.state = {
            status: this.props.status,
            levels: {
                essential: "Essential",
                standard: "Standard",
                detailed: "Detailed",
            },
            types: {
                all: 'All',
                announce: 'Announces',
                path: 'Paths',
                message: 'Messages',
                lxst: 'LXST',
                interface: 'Interfaces',
                link: 'Links',
                error: 'Errors'
            },
            filters: {
                all: true,
                announce: false,
                path: false,
                message: false,
                lxst: false,
                interface: false,
                link: false,
                error: false,
            }

        }
    }


    doChangeNetworkLogLevel(event: MouseEvent) {
        const {network} = this.props;

        const level: string = `${event.currentTarget.getAttribute('data-level')}`;

        network?.doSetNetworkLogLevel?.(level as NetworkLogLevel)
            .then((status?: NetworkLogStatus) => {
                return this.setState({
                    status: status
                });
            });
    }

    doChangeNetworkLogType(event: MouseEvent) {
        const level: ActivityStateType = `${event.currentTarget.getAttribute('data-type')}` as ActivityStateType;
        let {filters} = this.state;
        filters[level] = !filters[level];

        (level !== "all") &&
        (filters["all"] = false);

        (level === "all") &&
        (Object.entries(filters).map(([key, value]) => {
            (key !== "all") &&
            (filters[key as ActivityStateType] = false);
        }));

        this.setState({
            filters: {...filters}
        });
    }

    render() {

        const {status, levels, types, filters} = this.state;
        const {network} = this.props;
        let collection = (network?.logs || []).filter((entity: NetworkLog) => {
            const type: ActivityStateType = entity.type as ActivityStateType;
            return filters["all"] || filters[type];
        });

        return <>
            <div className="activity-active" id="activity-active">
                <div className="activity-toolbar">
                    <div className="activity-level-select" id="activity-level-select">
                        {Object.entries(levels).map(([key, value]) => (
                            <button className={`activity-level-btn ${status?.level == key && "active "}`}
                                    onClick={this.doChangeNetworkLogLevel.bind(this)}
                                    data-level={key}>
                                {value}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="activity-filters" id="activity-filters">
                    {Object.entries(types).map(([key, value]) => (
                        <button className={`activity-level-btn ${filters[key as ActivityStateType] && "active "}`}
                                onClick={this.doChangeNetworkLogType.bind(this)}
                                data-type={key}>
                            {value}
                        </button>
                    ))}
                </div>
                <div className="activity-feed" id="activity-feed">

                    {(collection?.length > 0) && <>
                        {collection?.map?.((entity: NetworkLog) => (
                            <ActivityRow entity={entity}/>
                        ))}
                    </>}

                    {(collection?.length == 0) && <>
                        <div className="activity-empty">
                            Listening for network events...
                        </div>
                    </>}

                </div>
            </div>

        </>
    }
}
