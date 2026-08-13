"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityExport} from "../../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";
import {open} from '@tauri-apps/plugin-dialog';
import {readFile} from '@tauri-apps/plugin-fs';
import {info} from "@tauri-apps/plugin-log";

interface RecoveryPhraseProps {
    identity?: IdentityStore;
    onCancel?: () => void;
}

interface RecoveryPhraseState {
    message: string | undefined;
    error: string | undefined;
    passcode: string;
    passcodeConfirm: string;
}

@inject("identity")
@observer
export class RecoveryPhrase extends React.PureComponent<RecoveryPhraseProps, RecoveryPhraseState> {
    public downloadRef: React.RefObject<HTMLAnchorElement | null>;


    constructor(props: RecoveryPhraseProps) {
        super(props);
        this.state = {
            message: undefined,
            error: undefined,
            passcode: "",
            passcodeConfirm: "",
        };

        this.downloadRef = React.createRef();
    }

    handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({passcode: e.target.value, error: undefined});

        (e?.target?.value?.length < 6) &&
        this.setState({error: "Pin is too short"});
    };

    handleConfirmPasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({passcodeConfirm: e.target.value, error: undefined});

        (e?.target?.value != this?.state?.passcode) &&
        this.setState({error: "Passcodes do not match"});
    };

    onError(error: any) {
        this.setState({error: error})
    }


    onImportBackupBase64() {
        const {identity} = this.props;

        open({
            multiple: false,
            directory: false,
            filters: [
                {
                    name: 'Ratspeak Identity Backup',
                    extensions: ['rsi',],
                },
            ],
        }).then((filePath) => {
            info(`onImportReticulumBase64: ${filePath}`);
        });
    }

    onImportReticulumBase64() {
        const {identity} = this.props;

        open({
            multiple: false,
            directory: false,
            filters: [
                {
                    name: 'Reticulum Identity File',
                    extensions: ['identity', 'txt'],
                },
            ],
        }).then((filePath) => {
            info(`onImportReticulumBase64: ${filePath}`);
        });

    }

    onImportReticulumRecoveryPhrase() {
        const {identity} = this.props;

        // identity?.getPayloadReticulumBase32(entity)
        //     .then(this.doExportFile.bind(this))
        //     .catch(this.onError.bind(this));
    }

    isPasscodeValid() {
        const {passcode, passcodeConfirm} = this.state;
        return (passcode == passcodeConfirm && passcode?.length >= 6);
    }


    render() {

        const {
            error,
            message,
            passcode,
            passcodeConfirm
        } = this.state;

        return <div className={"Export"}>
            {(error != undefined) && <>
                <div className="modal-error">
                    {error}
                </div>
            </>}

            <div className="identity-passcode-fields">
                <div className="rs-dialog-choices">
                    <button className="rs-dialog-choice" onClick={this.onImportBackupBase64.bind(this)}>
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Ratspeak Identity Backup</span>
                            <span className="rs-dialog-choice-hint">
                                Import a PIN-encrypted .rsi identity backup created by Ratspeak.
                            </span>

                            {/*<div className="identity-passcode-fields">*/}
                            {/*    <div className="modal-field">*/}
                            {/*        <label>PIN</label>*/}
                            {/*        <input type="password" id="identity-create-passcode-new"*/}
                            {/*               className="modal-input" maxLength={128}*/}
                            {/*               autoComplete="off" placeholder="At least 6 characters"*/}
                            {/*               value={passcode} onChange={this.handlePasscodeChange}*/}
                            {/*        /></div>*/}
                            {/*    <div className="modal-field">*/}
                            {/*        <label>Confirm PIN</label>*/}
                            {/*        <input type="password" id="identity-create-passcode-confirm"*/}
                            {/*               className="modal-input"*/}
                            {/*               maxLength={128} autoComplete="off"*/}
                            {/*               value={passcodeConfirm} onChange={this.handleConfirmPasscodeChange}*/}
                            {/*        /></div>*/}
                            {/*</div>*/}

                        </span>
                    </button>
                    <button className="rs-dialog-choice" onClick={this.onImportReticulumBase64.bind(this)}>
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Reticulum Identity File</span>
                            <span className="rs-dialog-choice-hint">
                                Import a raw, base32, base64, or hex Reticulum private identity key.
                            </span>
                        </span>
                    </button>
                    <button className="rs-dialog-choice" onClick={this.onImportReticulumRecoveryPhrase.bind(this)}>
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Recovery Phrase</span>
                            <span className="rs-dialog-choice-hint">
                                Restore from a 12-word recovery phrase (creates a software identity).
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    }
}
