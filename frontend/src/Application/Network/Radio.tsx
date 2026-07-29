"use strict";
import React from "react";
import {IoGitNetworkOutline} from "react-icons/io5";
import "./Radio.scss";
import {inject, observer} from "mobx-react";
import {Network as NetworkStore} from "../../ApplicationStore/Network";

interface RadioProps {
    network?: NetworkStore;
}

interface RadioState {
    error?: {
        code: string;
        message: string
    } | undefined;
}

@inject("network")
@observer
class Radio extends React.Component<RadioProps, RadioState> {
    constructor(props: RadioProps) {
        super(props);

        this.state = {}
    }

    doToggleServer(event: any) {
    }

    render() {

        const {network} = this.props;
        const {error} = this.state;

        return <>

            <div className="internet-container">
                <div className="bottom-sheet-header">
                    <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="tcp">
                        <IoGitNetworkOutline size={20}/>
                        <span className="bottom-sheet-title-label">
                        Connected LoRa Devices
                    </span>
                    </div>
                    <div className="activity-controls">
                        <button className="nr-btn nr-btn-xs" id="activity-clear-btn">
                            Add LoRa Device
                        </button>
                    </div>
                </div>


                {/*<div className="bottom-sheet-footer">*/}
                {/*</div>*/}
            </div>

        </>
    }
}

export default Radio
