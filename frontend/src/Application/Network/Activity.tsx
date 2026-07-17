"use strict";
import React from "react";

interface ActivityProps {
}

interface ActivityState {
}


export class Activity extends React.Component<ActivityProps, ActivityState> {
    constructor(props: ActivityProps) {
        super(props);
    }

    render() {

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
                    <div className="activity-empty">Listening for network events...</div>
                </div>
            </div>

        </>
    }
}
