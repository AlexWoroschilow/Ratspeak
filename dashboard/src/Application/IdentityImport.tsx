"use strict";
import React from "react";

interface IdentityImportProps {
}

interface IdentityImportState {
}


export class IdentityImport extends React.Component<IdentityImportProps, IdentityImportState> {
    constructor(props: IdentityImportProps) {
        super(props);
    }

    render() {

        return <>
            <div className="view" id="view-identity">
                <div className="bottom-sheet-header">
                    <div className="bottom-sheet-title">Import Identity</div>
                </div>
                <div className="bottom-sheet-body">
                    <div className="rs-dialog-message">Choose the source format.</div>
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
                    <a href={"#identity"} className="rs-dialog-cancel">Cancel</a>
                </div>
            </div>
        </>
    }
}
