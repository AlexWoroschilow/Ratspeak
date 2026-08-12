"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityActivated, IdentityInfo, Status} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";
import "./Teaser.scss";
import Blockie from "../components/Blockie";
import {info} from "@tauri-apps/plugin-log";

interface TeaserProps {
    identity?: IdentityStore;
}

interface TeaserState {
    entity: IdentityInfo | undefined;
    isUnlocked: boolean | undefined;
    error: string | undefined;
    passcode: string;
}

@inject("identity")
@observer
export class Teaser extends React.PureComponent<TeaserProps, TeaserState> {
    constructor(props: TeaserProps) {
        super(props);
        this.state = {
            isUnlocked: undefined,
            entity: this?.props?.identity?.active || undefined,
            error: undefined,
            passcode: "",
        };
    }

    onIdentityUnlock() {
        const {identity} = this.props;
        const {passcode} = this.state;
        const {status} = identity || {};

        const active = identity?.collection?.find?.((x: IdentityInfo) => x?.hash == status?.hw_locked);

        (active != undefined) &&
        identity?.unlockIdentity?.(active, `${passcode}`)
            .then((unlocked: IdentityActivated) => {
                identity?.fetchStatus();
            })
            .catch((error: any) => {
                this.setState({
                    error: error || "Failed to unlock the identity",
                    isUnlocked: false,
                })
            });

        this.setState({
            error: undefined
        })
    }

    handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            passcode: e.target.value,
            error: undefined,
        });
    };

    render() {
        const {identity} = this.props;
        const {active, status} = identity || {};

        const {
            passcode,
            error
        } = this.state;

        return <div className={"Teaser"}>

            <div className="sidebar-brand">
                {(active?.hash != undefined) && <>
                    <span className="sidebar-brand-logo">
                    <Blockie
                        seed={active.hash}
                        size={20}/>
                    </span>
                </>}
                <span className="sidebar-brand-text">
                    {active?.display_name}
                </span>
            </div>

            {(status?.stage == "hw_locked") && <>
                {(error && error?.length > 0) && <>
                    <span className={"nav-item"}>
                        <div className="modal-error">
                            {error}
                        </div>
                    </span>
                </>}
                <span className={"nav-item"}>
                    <h5>Unlock: {active?.display_name}</h5>
                </span>

                <span className={"nav-item"}>
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
                </span>

                <button
                    className="rs-dialog-confirm"
                    onClick={this.onIdentityUnlock.bind(this)}>
                    {"Unlock"}
                </button>
            </>}
        </div>
    }
}
