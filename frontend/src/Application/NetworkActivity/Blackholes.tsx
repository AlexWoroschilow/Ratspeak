"use strict";
import React from "react";


import {inject, observer} from "mobx-react";

import {Blackhole, Network as NetworkStore, NetworkLogStatus} from "../../ApplicationStore/Network";
import {BlackholesRow} from "./BlackholesRow";
import {info} from "@tauri-apps/plugin-log";
import "./Blackholes.scss";

interface BlackholesProps {
    network?: NetworkStore;
}

interface BlackholesState {
    status?: NetworkLogStatus | undefined;
}


@inject("network")
@observer
export class Blackholes extends React.Component<BlackholesProps, BlackholesState> {
    constructor(props: BlackholesProps) {
        super(props);

        this.state = {
            status: props?.network?.status
        }
    }

    render() {

        const {network} = this.props;
        const collection = network?.blackholes?.entries || [];
        info(`${JSON.stringify(collection)}`);

        return <>
            <div className="activity-active blackholes">
                <div className="activity-feed">
                    {collection?.map?.((blackhole: Blackhole) => (
                        <BlackholesRow entity={blackhole}/>
                    ))}
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
