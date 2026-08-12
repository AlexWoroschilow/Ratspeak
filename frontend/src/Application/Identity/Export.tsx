"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityExport, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";
import {info} from "@tauri-apps/plugin-log";


interface ExportProps {
    entity: IdentityInfo;
    identity?: IdentityStore;
    onSuccess: () => void;
    onCancel: () => void;
}

interface ExportState {
}

@inject("identity")
@observer
export class Export extends React.PureComponent<ExportProps, ExportState> {
    constructor(props: ExportProps) {
        super(props);
        this.state = {};
    }


    onExportReticulumBase64(entity: IdentityInfo) {
        const {identity} = this.props;

        identity?.getPayloadReticulumBase64(entity)
            .then(async (payload: IdentityExport) => {

                var blob = new Blob([payload.bytes,], {
                    type: payload.mimeType || 'application/octet-stream'
                });

                var url = URL.createObjectURL(blob);

                info(`onExportReticulumBase64: ${JSON.stringify(payload)}`);

            })
            .catch((err: any) => {
                info(`onExportReticulumBase64: ${JSON.stringify(err)}`);
            });


    }

    onExportReticulumBase32(entity: IdentityInfo) {
        const {identity} = this.props;

        identity?.getPayloadReticulumBase32(entity)
            .then((payload: IdentityExport) => {

                var blob = new Blob([payload.bytes,], {
                    type: payload.mimeType || 'application/octet-stream'
                });

                var url = URL.createObjectURL(blob);

                info(`onExportReticulumBase32: ${JSON.stringify(payload)}`);
            })
            .catch((err: any) => {
                info(`onExportReticulumBase32: ${JSON.stringify(err)}`);
            });


    }

    onExportBackupBase64(entity: IdentityInfo) {
        const {identity} = this.props;

        identity?.getPayloadBackupBase64(entity)
            .then((payload: IdentityExport) => {

                var blob = new Blob([payload.bytes,], {
                    type: payload.mimeType || 'application/octet-stream'
                });

                var url = URL.createObjectURL(blob);

                info(`onExportBackupBase64: ${JSON.stringify(payload)}`);
            })
            .catch((err: any) => {
                info(`onExportBackupBase64: ${JSON.stringify(err)}`);
            });

    }


    render() {
        const {
            entity,
        } = this.props;

        const {} = this.state;

        return <div className={"Export"}>
            <div className="identity-passcode-fields">
                <div className="rs-dialog-choices">
                    <button type="button" className="rs-dialog-choice" data-format={"reticulum"}
                            onClick={this.onExportReticulumBase64.bind(this, entity)}>
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Ratspeak Identity Backup</span>
                            <span className="rs-dialog-choice-hint">Export a PIN-encrypted .rsi identity backup created by Ratspeak.</span>
                        </span>
                    </button>
                    <button type="button" className="rs-dialog-choice" data-format={"reticulum-base32"}
                            onClick={this.onExportReticulumBase32.bind(this, entity)}>
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Reticulum Identity Key</span>
                            <span className="rs-dialog-choice-hint">Export a raw, base32, base64, or hex Reticulum private identity key.</span>
                        </span>
                    </button>
                    <button type="button" className="rs-dialog-choice" data-format={"reticulum"}
                            onClick={this.onExportBackupBase64.bind(this, entity)}>
                        <span className="rs-dialog-choice-text">
                            <span className="rs-dialog-choice-label">Recovery Phrase</span>
                            <span className="rs-dialog-choice-hint">Export a 12-word recovery phrase (creates a software identity).</span>
                        </span>
                    </button>
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
