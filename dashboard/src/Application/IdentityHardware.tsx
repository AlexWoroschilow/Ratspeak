"use strict";
import React from "react";

interface IdentityHardwareProps {
}

interface IdentityHardwareState {
}

export class IdentityHardware extends React.Component<IdentityHardwareProps, IdentityHardwareState> {
    constructor(props: IdentityHardwareProps) {
        super(props);
    }

    render() {

        return <>
            <div className="view" id="view-identity">
                <div className="bottom-sheet-header">
                    <div className="bottom-sheet-title">Hardware Key</div>
                </div>
                <div className="bottom-sheet-body">
                    <div className="rs-dialog-message">Use a YubiKey 5+ security key as your identity. The private key is generated on the device and never leaves it.</div>
                    <div className="rs-dialog-choices">
                        <button type="button" className="rs-dialog-choice"><span className="rs-dialog-choice-text"><span
                            className="rs-dialog-choice-label">Set up a new key</span><span
                            className="rs-dialog-choice-hint">Provision a factory-fresh or reset security key.</span></span></button>
                        <button type="button" className="rs-dialog-choice"><span className="rs-dialog-choice-text"><span
                            className="rs-dialog-choice-label">Use an existing key</span><span
                            className="rs-dialog-choice-hint">Register a key that is already provisioned.</span></span></button>
                    </div>
                </div>
                <div className="bottom-sheet-footer">
                    <a href={"#identity"} className="rs-dialog-cancel">Cancel</a>
                </div>
            </div>
        </>
    }
}
