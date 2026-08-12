"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityActivated, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";
import "./Autounlock.scss";
import {BallTriangle} from "react-loader-spinner";
import Blockie from "../components/Blockie";

interface TeaserProps {
    identity?: IdentityStore;
    children?: React.ReactNode;
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

    componentDidUpdate(prevProps: Readonly<TeaserProps>, prevState: Readonly<TeaserState>, snapshot?: any) {
        ((this?.state.entity != this?.props?.identity?.active)) &&
        (this.setState({
            isUnlocked: !this.props.identity?.active?.passcode_protected,
            entity: this?.props.identity?.active || undefined
        }));
    }

    componentDidMount() {
        const {identity} = this.props;

        (identity?.active != undefined) &&
        identity?.activateIdentity?.(identity.active)
            .then((activated: IdentityActivated) => {
                (activated?.locked) &&
                this.setState({isUnlocked: false});

                (!activated?.locked) &&
                this.setState({isUnlocked: true});
            })
            .catch((error) => {
                this.setState({
                    error: error
                });
            });

    }


    onIdentityUnlock() {
        const {identity} = this.props;
        const {passcode} = this.state;

        (identity?.active != undefined) &&
        identity?.unlockIdentity?.(identity.active, `${passcode}`)
            .then((unlocked: IdentityActivated) => {

                (unlocked?.locked) &&
                (this.setState({isUnlocked: false}));

                (!unlocked?.locked) &&
                (this.setState({isUnlocked: true}));

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
        const {children, identity} = this.props;
        const {active} = identity || {};

        const {
            passcode,
            isUnlocked,
            error
        } = this.state;

        return <>

            {(isUnlocked == true) && <>
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
            </>}

            {(isUnlocked === undefined) && <>
                <BallTriangle
                    color="#000000"
                    height={20}
                    width={20}
                />
            </>}

            {(isUnlocked == false) && <>
                <div className={"Autounlock"}>

                    {(error && error?.length > 0) && <>
                        <div className="modal-error">
                            {error}
                        </div>
                    </>}

                    <div className="identity-passcode-fields">
                        <div className="modal-field">
                            <label>Unlock: {identity?.active?.display_name}</label>
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
                            onClick={this.onIdentityUnlock.bind(this)}>
                            {"Unlock"}
                        </button>
                    </div>
                </div>
            </>}
        </>
    }
}
