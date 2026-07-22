"use strict";
import React, {Suspense} from "react";
import {Network, NetworkLog} from "../../ApplicationStore/Network";
import {inject, observer} from "mobx-react";
import {ActivityRow} from "./ActivityRow";

interface ActivityProps {
    network?: Network;
}

interface ActivityState {
}

@inject("network")
@observer
export class Activity extends React.Component<ActivityProps, ActivityState> {
    constructor(props: ActivityProps) {
        super(props);
    }

    render() {

        const {network} = this.props;
        let collection = network?.logs || [];

        return <>
            <div className="activity-active" id="activity-active">
                <div className="activity-toolbar">
                    <div className="activity-level-select" id="activity-level-select">
                        <button className="activity-level-btn" data-level="essential">Essential</button>
                        <button className="activity-level-btn active" data-level="standard">Standard</button>
                        <button className="activity-level-btn" data-level="detailed">Detailed</button>
                    </div>
                </div>
                <div className="activity-filters" id="activity-filters"></div>
                <div className="activity-feed" id="activity-feed">
                    {collection?.map?.((entity: NetworkLog) => (
                        <Suspense key={entity.timestamp} fallback={<div className="peers-row">Loading...</div>}>
                            <ActivityRow entity={entity}/>
                        </Suspense>
                    ))}

                    {(collection?.length == 0) &&
                        <div className="activity-empty">
                            Listening for network events...
                        </div>}

                </div>
            </div>

        </>
    }
}
