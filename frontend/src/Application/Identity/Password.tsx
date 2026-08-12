"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";

interface PasswordProps {
    entity: IdentityInfo;
    isPasswordRemove: boolean;
    identity?: IdentityStore;
    onCancel: () => void;
    onSuccess: (idn: IdentityInfo, message: string) => void;
    onError: (error: string) => void;
    onPending: (isPending: boolean) => void;
}

interface PasswordState {
    passcode: string;
    passcodeConfirm: string;
    passcodeOld: string;
}

@inject("identity")
@observer
export class Password extends React.PureComponent<PasswordProps, PasswordState> {
    constructor(props: PasswordProps) {
        super(props);
        this.state = {
            passcode: "",
            passcodeConfirm: "",
            passcodeOld: "",
        };
    }

    handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({passcode: e.target.value});
    };

    handlePasscodeConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({passcodeConfirm: e.target.value});
    };

    handlePasscodeOldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({passcodeOld: e.target.value});
    };

    onIdentityPasswordRemove() {
        const {identity, entity, onPending, onSuccess, onError} = this.props;
        const {passcodeOld} = this.state;

        onPending(true);
        identity?.removePasscode?.(entity, passcodeOld)
            .then((idn: IdentityInfo) => {
                onSuccess(idn, "The PIN was successfully removed");
            })
            .catch((err: any) => {
                onPending(false);
                onError(err.message || "Failed to remove the Password");
            });
    }

    onIdentityPassword() {
        const {identity, entity, onPending, onSuccess, onError} = this.props;
        const {passcode, passcodeConfirm, passcodeOld} = this.state;

        if (passcode != passcodeConfirm) {
            onError("Passwords do not match");
            return;
        }

        onPending(true);

        if (!entity?.passcode_protected) {
            identity?.setPasscode?.(entity, passcode)
                .then((idn: IdentityInfo) => {
                    onSuccess(idn, "The PIN was successfully set");
                })
                .catch((err: any) => {
                    onPending(false);
                    onError(err.message || "Failed to set the Password");
                });
        } else {
            identity?.changePasscode?.(entity, passcodeOld, passcode)
                .then((idn: IdentityInfo) => {
                    onSuccess(idn, "The PIN was successfully updated");
                })
                .catch((err: any) => {
                    onPending(false);
                    onError(err.message || "Failed to update the Password");
                });
        }
    }

    render() {
        const {
            entity,
            isPasswordRemove,
            onCancel,
        } = this.props;

        const {
            passcode,
            passcodeConfirm,
            passcodeOld
        } = this.state;

        return (
            <>
                <div className="identity-passcode-fields" id="identity-create-passcode-fields">

                    {entity.passcode_protected && (
                        <div className="modal-field">
                            <label>Your current PIN</label>
                            <input
                                type="password"
                                className="modal-input"
                                maxLength={128}
                                autoComplete="off"
                                placeholder="At least 6 characters"
                                value={passcodeOld}
                                onChange={this.handlePasscodeOldChange}
                            />
                        </div>
                    )}

                    {isPasswordRemove === false && (
                        <>
                            <div className="modal-field">
                                <label>{entity?.passcode_protected ? "New PIN" : "PIN"}</label>
                                <input
                                    type="password"
                                    id="identity-create-passcode-new"
                                    className="modal-input"
                                    maxLength={128}
                                    autoComplete="off"
                                    placeholder="At least 6 characters"
                                    value={passcode}
                                    onChange={this.handlePasscodeChange}
                                />
                            </div>
                            <div className="modal-field">
                                <label>Confirm PIN</label>
                                <input
                                    type="password"
                                    id="identity-create-passcode-confirm"
                                    className="modal-input"
                                    maxLength={128}
                                    autoComplete="off"
                                    value={passcodeConfirm}
                                    onChange={this.handlePasscodeConfirmChange}
                                />
                            </div>
                        </>
                    )}
                </div>

                {isPasswordRemove === true && <>
                    <p className="recovery-warn">This decrypts the identity on this device; it will no longer require a PIN when you open Ratspeak.</p>
                </>}

                <div className="bottom-sheet-footer">
                    <button
                        className="rs-dialog-confirm"
                        id="identity-modal-confirm"
                        onClick={onCancel}>
                        {"Cancel"}
                    </button>

                    <button
                        className="rs-dialog-confirm"
                        id="identity-modal-confirm"
                        onClick={() => isPasswordRemove ? this.onIdentityPasswordRemove() : this.onIdentityPassword()}>
                        {isPasswordRemove ? "Remove" : "Save"}
                    </button>
                </div>
            </>
        );
    }
}
