"use strict";
import React from "react";
import {IoGitNetworkOutline, IoWifi} from "react-icons/io5";
import "./Local.scss";
import {inject, observer} from "mobx-react";
import {Network as NetworkStore} from "../../ApplicationStore/Network";
import {List} from "./Local/List";
import {Form} from "./Local/Form";

interface LocalProps {
    network?: NetworkStore;
}

interface LocalState {
    error?: {
        code: string;
        message: string
    } | undefined;
    isEnabledForm: boolean,
}

@inject("network")
@observer
class Local extends React.Component<LocalProps, LocalState> {
    constructor(props: LocalProps) {
        super(props);

        this.state = {
            isEnabledForm: false
        }
    }

    onCloseForm() {
        return this.setState({
            isEnabledForm: false
        });
    }

    onOpenForm() {
        return this.setState({
            isEnabledForm: true
        });
    }


    render() {

        const {network} = this.props;
        const {error} = this.state;

        return <>

            {(this?.state?.isEnabledForm) && <>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <Form onCancel={this.onCloseForm.bind(this)}/>
                </div>
            </>}

            {(!this?.state?.isEnabledForm) && <>
                <div className="internet-container" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <div className="bottom-sheet-header">
                        <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="tcp">
                            <IoWifi size={20}/>
                            <span className="bottom-sheet-title-label">
                        Local Networks
                    </span>
                        </div>
                        <div className="activity-controls">
                            <button className="nr-btn nr-btn-xs" id="activity-clear-btn"
                                    onClick={this.onOpenForm.bind(this)}>
                                Add custom Network
                            </button>
                        </div>
                    </div>

                    <List onCancel={() => {
                    }}/>

                    {/*<div className="bottom-sheet-footer">*/}
                    {/*</div>*/}
                </div>
            </>}
        </>
    }
}

export default Local
