"use strict";
import React from "react";

interface IdentityCreateProps {
}

interface IdentityCreateState {
}


export class IdentityCreate extends React.Component<IdentityCreateProps, IdentityCreateState> {
    constructor(props: IdentityCreateProps) {
        super(props);
    }

    render() {

        return <>
            <div className="view" id="view-identity">
                <div className="bottom-sheet-handle"></div>
                <div className="bottom-sheet-header">
                    <div className="bottom-sheet-title" id="identity-modal-title">Create New Identity</div>
                </div>
                <div className="bottom-sheet-body">
                    <div id="identity-modal-body">
                        <div className="modal-field"><label>Display Name</label>
                            <input type="text" id="identity-modal-nickname" className="modal-input"
                                   placeholder="e.g. Rat King" maxLength={32}/></div>
                        <label className="rs-dialog-checkbox-wrap identity-passcode-option">
                            <input type="checkbox" id="identity-create-passcode-enable"
                                   className="rs-dialog-checkbox"/><span className="rs-dialog-checkbox-label">Encrypt this identity on this device</span><span
                            className="rs-dialog-checkbox-help">Require a PIN when Ratspeak opens. Keep your 12-word phrase; forgotten PINs cannot be recovered.</span></label>
                        <div className="identity-passcode-fields" id="identity-create-passcode-fields"
                             hidden={false}>
                            <div className="modal-field"><label>PIN</label><input type="password" id="identity-create-passcode-new" className="modal-input" maxLength={128}
                                                                                  autoComplete="off" placeholder="At least 6 characters"/></div>
                            <div className="modal-field"><label>Confirm PIN</label><input type="password" id="identity-create-passcode-confirm" className="modal-input"
                                                                                          maxLength={128} autoComplete="off"/></div>
                        </div>
                        <div className="modal-error" id="identity-create-passcode-error" style={{display: "none"}}></div>
                    </div>
                </div>
                <div className="bottom-sheet-footer">
                    <a href={"#identity"} className="rs-dialog-cancel" id="identity-modal-cancel">Cancel</a>
                    <button className="rs-dialog-confirm" id="identity-modal-confirm" data-base-label="Create">Create</button>
                </div>
            </div>
        </>
    }
}
