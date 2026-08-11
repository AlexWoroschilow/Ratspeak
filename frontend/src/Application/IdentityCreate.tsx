"use strict";
import React from "react";
import {inject, observer} from "mobx-react";
import {Identity as IdentityStore, IdentityInfo} from "../ApplicationStore/Identity";
import {info} from "@tauri-apps/plugin-log";

interface IdentityCreateProps {
    identity?: IdentityStore;
}

interface IdentityCreateState {
    nickname: string;
    passcodeEnabled: boolean;
    passcode: string;
    confirmPasscode: string;
    error: string;
    isCreating: boolean;
}

@inject("identity")
@observer
export class IdentityCreate extends React.Component<IdentityCreateProps, IdentityCreateState> {
    constructor(props: IdentityCreateProps) {
        super(props);
        this.state = {
            nickname: "",
            passcodeEnabled: false,
            passcode: "",
            confirmPasscode: "",
            error: "",
            isCreating: false,
        };
    }

    handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({nickname: e.target.value});
    };

    handlePasscodeEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({passcodeEnabled: e.target.checked});
    };

    handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({passcode: e.target.value});
    };

    handleConfirmPasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({confirmPasscode: e.target.value});
    };

    handleCreate = async () => {
        const {nickname, passcodeEnabled, passcode, confirmPasscode} = this.state;
        const {identity} = this.props;

        if (!nickname.trim()) {
            this.setState({error: "Nickname is required"});
            return;
        }

        if (passcodeEnabled) {
            if (passcode.length < 6) {
                this.setState({error: "PIN must be at least 6 characters"});
                return;
            }
            if (passcode !== confirmPasscode) {
                this.setState({error: "PINs do not match"});
                return;
            }
        }

        this.setState({isCreating: true, error: ""});

        try {
            identity?.createIdentity(nickname)
                .then((idn: IdentityInfo) => {

                    if (!passcodeEnabled) {
                        window.location.hash = "#identity";
                        return;
                    }

                    if (passcodeEnabled && idn?.hash) {
                        return identity?.setPasscode(idn, passcode)
                            .then((data) => {
                                window.location.hash = "#identity";
                                return;
                            })
                            .catch((err: any) => {
                                this.setState({
                                    error: err || "Failed to set the Password"
                                });
                            });
                    }

                    window.location.hash = "#identity";
                    return
                })
                .catch((err: any) => {
                    this.setState({
                        error: err.message || "Failed to create identity"
                    });
                });

            // const newIdentity = await identity?.createIdentity(nickname);
            // if (passcodeEnabled && newIdentity?.hash) {
            //     await identity?.setPasscode(newIdentity.hash, passcode);
            // }
            // window.location.hash = "#identity";
        } catch (err: any) {
            this.setState({error: err.message || "Failed to create identity"});
        } finally {
            this.setState({isCreating: false});
        }
    };

    render() {
        const {nickname, passcodeEnabled, passcode, confirmPasscode, error, isCreating} = this.state;

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
                                   placeholder="e.g. Rat King" maxLength={32}
                                   value={nickname} onChange={this.handleNicknameChange}/></div>
                        <label className="rs-dialog-checkbox-wrap identity-passcode-option">
                            <input type="checkbox" id="identity-create-passcode-enable"
                                   className="rs-dialog-checkbox"
                                   checked={passcodeEnabled} onChange={this.handlePasscodeEnabledChange}/><span className="rs-dialog-checkbox-label">Encrypt this identity on this device</span><span
                            className="rs-dialog-checkbox-help">Require a PIN when Ratspeak opens. Keep your 12-word phrase; forgotten PINs cannot be recovered.</span></label>

                        <div className="identity-passcode-fields" id="identity-create-passcode-fields"
                             hidden={!passcodeEnabled}>
                            <div className="modal-field"><label>PIN</label><input type="password" id="identity-create-passcode-new" className="modal-input" maxLength={128}
                                                                                  autoComplete="off" placeholder="At least 6 characters"
                                                                                  value={passcode} onChange={this.handlePasscodeChange}/></div>
                            <div className="modal-field"><label>Confirm PIN</label><input type="password" id="identity-create-passcode-confirm" className="modal-input"
                                                                                          maxLength={128} autoComplete="off"
                                                                                          value={confirmPasscode} onChange={this.handleConfirmPasscodeChange}/></div>
                        </div>
                        <div className="modal-error" id="identity-create-passcode-error"
                             style={{display: error ? "block" : "none"}}>{error}
                        </div>
                    </div>
                </div>
                <div className="bottom-sheet-footer">
                    <a href={"#identity"} className="rs-dialog-cancel" id="identity-modal-cancel">Cancel</a>
                    <button className="rs-dialog-confirm" id="identity-modal-confirm" data-base-label="Create"
                            onClick={this.handleCreate} disabled={isCreating}>
                        {isCreating ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </>
    }
}
