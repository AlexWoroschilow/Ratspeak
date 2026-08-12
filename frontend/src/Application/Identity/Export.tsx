"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";

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

    render() {
        const {
            entity,
        } = this.props;

        const {} = this.state;

        return <div className={"Export"}>
            <div className="identity-passcode-fields">
                <div className="rs-dialog-choices">
                    <button type="button" className="rs-dialog-choice"><span className="rs-dialog-choice-text"><span
                        className="rs-dialog-choice-label">Ratspeak Identity Backup</span><span
                        className="rs-dialog-choice-hint">Import a PIN-encrypted .rsi identity backup created by Ratspeak.</span></span></button>
                    <button type="button" className="rs-dialog-choice"><span className="rs-dialog-choice-text"><span
                        className="rs-dialog-choice-label">Reticulum Identity Key</span><span
                        className="rs-dialog-choice-hint">Import a raw, base32, base64, or hex Reticulum private identity key.</span></span></button>
                    <button type="button" className="rs-dialog-choice"><span className="rs-dialog-choice-text"><span
                        className="rs-dialog-choice-label">Recovery Phrase</span><span className="rs-dialog-choice-hint">Restore from a 12-word recovery phrase (creates a software identity).</span></span>
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
