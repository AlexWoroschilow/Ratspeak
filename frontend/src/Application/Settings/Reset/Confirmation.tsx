"use strict";
import React from "react";
import {inject, observer} from "mobx-react";
import {Settings as SettingsStore} from "../../../ApplicationStore/Settings";

interface ConfirmationProps {
    settings?: SettingsStore | undefined;
    title: string;
    description: string;
    confirmation?: string;
    message: string;
    onProcess: () => Promise<any>;
}

interface ConfirmationState {
    isStarted: boolean;
    isConfirmed: boolean;
    error?: string | undefined;
    message?: string | undefined;
}

@inject("settings")
@observer
export class Confirmation extends React.Component<ConfirmationProps, ConfirmationState> {
    constructor(props: ConfirmationProps) {
        super(props);

        this.state = {
            isStarted: false,
            isConfirmed: false,
            message: undefined,
            error: undefined,
        }
    }


    onStart() {
        const {isStarted} = this.state;
        if (isStarted) {
            return;
        }

        this.setState({
            isStarted: true,
        });
    }

    onProcessSuccessful(data: any) {
        this.setState({
            message: this.props.message,
            isStarted: false,
            isConfirmed: true
        });

        let timeout = setTimeout(() => {
            this.setState({message: undefined});
            clearTimeout(timeout);
        }, 3000);
    }

    onProcessFailed(error: string) {
        this.setState({
            error: error,
            isStarted: false,
            isConfirmed: true
        });

        let timeout = setTimeout(() => {
            this.setState({error: undefined});
            clearTimeout(timeout);
        }, 5000);
    }

    onProcess() {
        const {onProcess} = this.props;

        const action = onProcess?.();

        action?.then?.(this.onProcessSuccessful.bind(this))
            ?.catch?.(this.onProcessFailed.bind(this));

        this.setState({
            error: undefined,
            isStarted: false,
            isConfirmed: true
        });
    }

    render() {

        return <>
            {this?.state?.error && <>
                <span className="modal-error">
                    {this.state.error}
                </span>
            </>}

            {this?.state?.message && <>
                <span className="rs-dialog-choice">
                    <span className="rs-dialog-choice-hint">
                        {this.state.message}
                    </span>
                </span>
            </>}

            {(!this?.state?.error && !this?.state?.message) && <>
                <span className="rs-dialog-choice" onClick={this.onStart.bind(this)}>

                    <span className="rs-dialog-choice-text">
                        <span className="rs-dialog-choice-label">
                            {this.props.title}
                        </span>


                        {!this.state.isStarted && <>
                            <span className="rs-dialog-choice-hint">
                                {this.props.description}
                            </span>
                        </>}

                        {this.state.isStarted && <>
                            <span className="rs-dialog-choice-hint">
                                {this?.props?.confirmation || "Are you sure?"}
                            </span>
                            <span className="rs-dialog-choice-hint">
                                <button className="nr-btn nr-btn-xs" onClick={() => {
                                    this.setState({isStarted: false});
                                }}>
                                    No
                                </button>
                                &nbsp;
                                <button className="nr-btn nr-btn-xs"
                                        onClick={this.onProcess.bind(this)}>
                                    Yes
                                </button>
                            </span>
                        </>}

                    </span>
                </span>
            </>}

        </>
    }
}
