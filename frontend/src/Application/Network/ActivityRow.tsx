"use strict";
import React, {Suspense} from "react";
import {NetworkLog} from "../../ApplicationStore/Network";
import {PeerEnriched} from "../../ApplicationStore/Peers";
import {observer} from "mobx-react";

interface ActivityRowProps {
    entity: NetworkLog;
}

interface ActivityRowState {
}


export class ActivityRow extends React.Component<ActivityRowProps, ActivityRowState> {
    constructor(props: ActivityRowProps) {
        super(props);
    }

    render() {

        return <>
            <div className="activity-entry" data-type="announce">
                <span className="activity-entry-time">{this.props.entity.timestamp}</span>
                <span className="activity-entry-text">{this.props.entity.message}</span>
                <span className="activity-entry-detail">{this.props.entity.detail}</span>
            </div>
        </>
    }
}
