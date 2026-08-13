"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityExport, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";
import {info} from "@tauri-apps/plugin-log";
import {save} from '@tauri-apps/plugin-dialog';
import {writeFile} from '@tauri-apps/plugin-fs';

interface ExportProps {
    entity: IdentityInfo;
    identity?: IdentityStore;
    onSuccess: () => void;
    onCancel: () => void;
}

interface ExportState {
    message: string | undefined;
    error: string | undefined;
    passcode: string;
    passcodeConfirm: string;
}

@inject("identity")
@observer
export class Export extends React.PureComponent<ExportProps, ExportState> {
    public downloadRef: React.RefObject<HTMLAnchorElement | null>;


    constructor(props: ExportProps) {
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

    doExportFile(payload: IdentityExport) {
        save({
            defaultPath: `${payload.fileName}`
        }).then((filePath) => {
            if (!filePath || !payload?.bytes) {
                return
            }

            writeFile(filePath, payload.bytes)
                .then(() => {
                    this.setState({
                        message: `Exported to: ${filePath}`,
                        passcodeConfirm: "",
                        passcode: "",
                    })
                });
        });
    }

    onExportReticulumBase64(entity: IdentityInfo) {
        const {identity} = this.props;
        identity?.getPayloadReticulumBase64(entity)
            .then(this.doExportFile.bind(this))
            .catch(this.onError.bind(this));
    }

    onExportReticulumBase32(entity: IdentityInfo) {
        const {identity} = this.props;

        identity?.getPayloadReticulumBase32(entity)
            .then(this.doExportFile.bind(this))
            .catch(this.onError.bind(this));
    }

    onExportBackupBase64(entity: IdentityInfo) {
        const {identity} = this.props;
        const {passcode} = this.state;

        identity?.getPayloadBackupBase64(entity, passcode)
            .then(this.doExportFile.bind(this))
            .catch(this.onError.bind(this));
    }

    isPasscodeValid() {
        const {passcode, passcodeConfirm} = this.state;
        return (passcode == passcodeConfirm && passcode?.length >= 6);
    }


    render() {
        const {
            entity,
        } = this.props;

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
                    <span className="rs-dialog-choice">
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Ratspeak Identity Backup</span>
                            <span className="rs-dialog-choice-hint">Export a PIN-encrypted .rsi identity backup created by Ratspeak.</span>
                            <div className="identity-passcode-fields">
                                <div className="modal-field">
                                    <label>PIN</label>
                                    <input type="password" id="identity-create-passcode-new"
                                           className="modal-input" maxLength={128}
                                           autoComplete="off" placeholder="At least 6 characters"
                                           value={passcode} onChange={this.handlePasscodeChange}
                                    /></div>
                                <div className="modal-field">
                                    <label>Confirm PIN</label>
                                    <input type="password" id="identity-create-passcode-confirm"
                                           className="modal-input"
                                           maxLength={128} autoComplete="off"
                                           value={passcodeConfirm} onChange={this.handleConfirmPasscodeChange}
                                    /></div>
                            </div>
                        </span>
                        <button className="rs-dialog-confirm"
                                onClick={this.onExportBackupBase64.bind(this, entity)}
                                disabled={!this.isPasscodeValid()}>
                            {"Export"}
                        </button>
                    </span>
                    <span className="rs-dialog-choice">
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Reticulum Identity File</span>
                            <span className="rs-dialog-choice-hint">
                                This exports the unencrypted private Reticulum identity key for {entity.display_name}.
                                Anyone with this file can use the identity. Ratspeak messages and settings are not included.
                            </span>
                        </span>
                        <button className="rs-dialog-confirm"
                                onClick={this.onExportReticulumBase64.bind(this, entity)}>
                            {"Export"}
                        </button>
                    </span>
                    <span className="rs-dialog-choice">
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Reticulum Base32 Key</span>
                            <span className="rs-dialog-choice-hint">
                                This exports the unencrypted private Reticulum identity key for {entity.display_name} as base32 text.
                                Anyone with this text can use the identity. Ratspeak messages and settings are not included.
                            </span>
                        </span>
                        <button className="rs-dialog-confirm"
                                onClick={this.onExportReticulumBase32.bind(this, entity)}>
                            {"Export"}
                        </button>
                    </span>
                </div>
            </div>

            <div className="bottom-sheet-footer">
                <button
                    className="rs-dialog-confirm"
                    id="identity-modal-confirm"
                    onClick={this.props.onSuccess}>
                    {"Close"}
                </button>
            </div>
        </div>
    }
}
