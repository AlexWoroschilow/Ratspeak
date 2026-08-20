"use strict";
import React from "react";

import "./Status.scss";
import {inject, observer} from "mobx-react";
import {Settings as SettingsStore, VersionInfo} from "../../ApplicationStore/Settings";

interface StatusProps {
    settings?: SettingsStore | undefined;
}

interface StatusState {
    version?: string | undefined;
}

@inject("settings")
@observer
export class Status extends React.PureComponent<StatusProps, StatusState> {
    constructor(props: StatusProps) {
        super(props);
        this.state = {
            version: undefined
        }
    }

    componentDidMount() {
        const {settings} = this.props;

        settings?.getVersion?.()
            .then((version: VersionInfo) => {
                this.setState({version: `${version.name} ${version.version}`});
            });
    }

    render() {

        return <>
            <div className={"Status"}>
                <div className="network-pulse" id="network-pulse">
                    <div className="pulse-throughput">
                        &nbsp;
                    </div>
                    <div className="pulse-actions">
                        &nbsp; {this.state.version}
                    </div>
                </div>
            </div>
        </>
    }
}