"use strict";
import React from 'react';
import {Identity as IdentityStore} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";
import {RatspeakBackup} from "./Import/RatspeakBackup";
import {ReticulumBackup} from "./Import/ReticulumBackup";
import {RecoveryPhrase} from "./Import/RecoveryPhrase";

interface ImportProps {
    identity?: IdentityStore;
}

interface ImportState {
    message: string | undefined;
    error: string | undefined;
    screen: "default" | "ratspeak" | "reticulum" | "phrase";
}

@inject("identity")
@observer
export class Import extends React.PureComponent<ImportProps, ImportState> {
    public downloadRef: React.RefObject<HTMLAnchorElement | null>;


    constructor(props: ImportProps) {
        super(props);
        this.state = {
            message: undefined,
            error: undefined,
            screen: "default",
        };

        this.downloadRef = React.createRef();
    }


    render() {

        const {
            error,
        } = this.state;

        return <div className={"Export"}>
            {(error != undefined) && <>
                <div className="modal-error">
                    {error}
                </div>
            </>}

            <div className="identity-passcode-fields">
                {(["default"]).includes(this.state.screen) && <>
                    <div className="rs-dialog-choices">
                        <button className="rs-dialog-choice" onClick={() => {
                            this.setState({screen: "ratspeak"});
                        }}>
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Ratspeak Identity Backup</span>
                            <span className="rs-dialog-choice-hint">
                                Import a PIN-encrypted .rsi identity backup created by Ratspeak.
                            </span>


                        </span>
                        </button>
                        <button className="rs-dialog-choice" onClick={() => {
                            this.setState({screen: "reticulum"});
                        }}>
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Reticulum Identity File</span>
                            <span className="rs-dialog-choice-hint">
                                Import a raw, base32, base64, or hex Reticulum private identity key.
                            </span>
                        </span>
                        </button>
                        <button className="rs-dialog-choice" onClick={() => {
                            this.setState({screen: "phrase"});
                        }}>
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Recovery Phrase</span>
                            <span className="rs-dialog-choice-hint">
                                Restore from a 12-word recovery phrase (creates a software identity).
                            </span>
                        </span>
                        </button>
                    </div>
                </>}

                {(["ratspeak"]).includes(this.state.screen) && <>
                    <RatspeakBackup/>
                </>}

                {(["reticulum"]).includes(this.state.screen) && <>
                    <ReticulumBackup/>
                </>}

                {(["phrase"]).includes(this.state.screen) && <>
                    <RecoveryPhrase/>
                </>}


            </div>
        </div>
    }
}
