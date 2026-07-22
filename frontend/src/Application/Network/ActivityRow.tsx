"use strict";
import React, {Suspense} from "react";
import {NetworkLog} from "../../ApplicationStore/Network";
import {PeerEnriched} from "../../ApplicationStore/Peers";
import {observer} from "mobx-react";
import moment from "moment";

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

        const {entity} = this.props;

        return <>
            <div className="activity-entry" data-type="announce">
                <span className="activity-entry-time">{moment.unix(entity.timestamp / 1000).format("DD.MM.YYYY")}</span>
                <span className="activity-entry-text">{entity.message}</span>
                <span className="activity-entry-detail">{entity.type}</span>
            </div>
        </>
    }
}
