"use strict";
import React from "react";

import "./Status.scss";

interface StatusProps {
}

interface StatusState {
}

export class Status extends React.PureComponent<StatusProps, StatusState> {
    constructor(props: StatusProps) {
        super(props);

    }

    render() {

        return <>
            <div className={"Status"}>
                <div className="network-pulse" id="network-pulse">
                    <div className="pulse-throughput">
                        &nbsp;
                    </div>
                    <div className="pulse-actions">
                        &nbsp;
                    </div>
                </div>
            </div>
        </>
    }
}