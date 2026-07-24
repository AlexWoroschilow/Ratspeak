"use strict";
import React from "react";
import {Blackhole} from "../../ApplicationStore/Network";
import moment from "moment";

interface BlackholesRowProps {
    entity: Blackhole;
}

interface BlackholesRowState {
}


export class BlackholesRow extends React.Component<BlackholesRowProps, BlackholesRowState> {
    constructor(props: BlackholesRowProps) {
        super(props);
    }

    render() {

        const {entity} = this.props;

        return <>
            <div className="activity-entry" data-type="announce">
                <span className="activity-entry-time">
                    {moment.unix(entity.created / 1000)
                        .format("H:mm:ss DD.MM.YYYY")}
                </span>
                <span className="activity-entry-text">
                    {entity.reason}
                </span>
                <span className="activity-entry-detail">
                    {`${entity.verified ? "verified" : "unverified"}`}
                </span>
            </div>
        </>
    }
}
