"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";

interface UnlockProps {
    entity: IdentityInfo;
    identity?: IdentityStore;
    onCancel: () => void;
    onSuccess: (idn: IdentityInfo, message: string) => void;
    onPending: (isPending: boolean) => void;
}

interface UnlockState {
    error: string | undefined;
    passcode: string;
}

@inject("identity")
@observer
export class Unlock extends React.PureComponent<UnlockProps, UnlockState> {
    constructor(props: UnlockProps) {
        super(props);
        this.state = {
            error: undefined,
            passcode: "",
        };
    }

    handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            passcode: e.target.value,
            error: undefined,
        });
    };

    onIdentityUnlock() {
        const {identity, entity, onPending, onSuccess} = this.props;
        const {passcode} = this.state;

        identity?.unlockIdentity?.(entity, passcode)
            .then((idn: any) => {
                onSuccess(entity, "Successfully unlocked");
            })
            .catch((err: any) => {
                this.setState({
                    error: err.message || "Failed to unlock the identity"
                })
            });

        this.setState({
            error: undefined
        })
    }

    render() {
        const {
            passcode,
        } = this.state;

        return (
            <>
                <div className="identity-passcode-fields" id="identity-create-passcode-fields">
                    <div className="modal-field">
                        <label>{"PIN"}</label>
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
                </div>

                <div className="bottom-sheet-footer">
                    <button
                        className="rs-dialog-confirm"
                        id="identity-modal-confirm"
                        onClick={this?.props?.onCancel}>
                        {"Cancel"}
                    </button>

                    <button
                        className="rs-dialog-confirm"
                        id="identity-modal-confirm"
                        onClick={this.onIdentityUnlock.bind(this)}>
                        {"Unlock"}
                    </button>
                </div>
            </>
        );
    }
}
