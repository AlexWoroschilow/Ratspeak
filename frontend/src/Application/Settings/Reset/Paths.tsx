"use strict";
import React from "react";
import {inject, observer} from "mobx-react";
import {Settings as SettingsStore} from "../../../ApplicationStore/Settings";

interface PathsProps {
    settings?: SettingsStore | undefined;
    onProcess: () => Promise<any>;
}

interface PathsCacheState {
    isStarted: boolean;
    isConfirmed: boolean;
    error?: string | undefined;
    message?: string | undefined;
}

@inject("settings")
@observer
export class Paths extends React.Component<PathsProps, PathsCacheState> {
    constructor(props: PathsProps) {
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

    onProcess() {
        const {onProcess} = this.props;

        const action = onProcess?.();

        action?.then?.((data: any) => {
            this.setState({
                message: "Successfully processed",
                isStarted: false,
                isConfirmed: true
            });

            let timeout = setTimeout(() => {
                this.setState({message: undefined});
                clearTimeout(timeout);
            }, 3000);

        })?.catch?.((error: string) => {
            this.setState({
                error: error,
                isStarted: false,
                isConfirmed: true
            });

            let timeout = setTimeout(() => {
                this.setState({error: undefined});
                clearTimeout(timeout);
            }, 5000);
        });

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
                        <span className="rs-dialog-choice-label">Clear Paths</span>


                        {!this.state.isStarted && <>
                                <span className="rs-dialog-choice-hint">
                                Cached network routes
                                </span>
                        </>}

                        {this.state.isStarted && <>
                            <span className="rs-dialog-choice-hint">
                                Are you sure?
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
