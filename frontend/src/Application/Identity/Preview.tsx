"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityActivated, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";
import Blockie from './../components/Blockie';
import {RiDeleteBin7Line} from "react-icons/ri";
import {MdOutlineQrCode} from "react-icons/md";
import {IoKeyOutline} from "react-icons/io5";
import {TbSwitch} from "react-icons/tb";
import {Password} from "./Password";
import {Circles} from "react-loader-spinner";
import {PiExport} from "react-icons/pi";
import {Share} from "./Share";
import {Export} from "./Export";

interface PreviewProps {
    entity: IdentityInfo;
    identity?: IdentityStore;
    onIdentityDelete?: () => void;
}

interface PreviewState {
    entity: IdentityInfo;
    screen: "default" | "password" | "passwordRemove" | "share" | "export";

    error: string | undefined;
    message: string | undefined;
    isPending: boolean;
}

@inject("identity")
@observer
export class Preview extends React.PureComponent<PreviewProps, PreviewState> {
    constructor(props: PreviewProps) {
        super(props);


        this.state = {
            entity: props.entity,
            screen: "default",
            error: undefined,
            message: undefined,
            isPending: false,
        };
    }

    componentDidUpdate(prevProps: PreviewProps) {
        if (prevProps.entity.hash !== this.props.entity.hash) {
            this.setState({
                entity: this.props.entity,
                error: undefined
            });
        }
    }

    onIdentitySwitch(entity: IdentityInfo) {
        const {identity} = this.props;
        identity?.activateIdentity?.(entity)
            .then((activated: IdentityActivated) => {

                this.setState({
                    message: "Successfully activated identity",
                    error: undefined,
                    isPending: false,
                });

                identity?.fetchActiveIdentity?.().then((entity: IdentityInfo) => {
                    this.setState({entity: entity})
                });
            })
            .catch((error) => {
                this.setState({
                    message: undefined,
                    isPending: false,
                    error: error
                });
            });

        this.setState({
            message: undefined,
            error: undefined,
            isPending: true,
        });
    }

    onIdentityDelete(entity: IdentityInfo) {
        const {identity} = this.props;
        identity?.deleteIdentity?.(entity)
            .then(() => {
                this?.props?.onIdentityDelete?.();
                this.setState({
                    message: "Successfully removed identity",
                    isPending: false
                });
            })
            .catch((error) => {
                this.setState({
                    message: undefined,
                    error: error,
                    isPending: false
                })
            });

        this.setState({
            message: undefined,
            error: undefined,
            isPending: true,
        });
    }

    onIdentityPasswordRemove(idn: IdentityInfo, message: string) {
        this.setState({
            entity: idn,
            message: message,
            isPending: false,
            screen: "default"
        });
    }

    onIdentityPassword(idn: IdentityInfo, message: string) {
        this.setState({
            entity: idn,
            message: message,
            isPending: false,
            screen: "default"
        });
    }

    handleCopy = (value: string, label: string) => {
        navigator.clipboard.writeText(value);
    };

    render() {
        const {
            entity,
            message,
            error,
            isPending,
        } = this.state;

        const lxmfHash = entity.lxmf_hash || "";
        const identityHash = entity.hash || "";
        const isActive = entity.is_active;
        const isHardware = entity.is_hardware;

        return (
            <div className="peers-detail-content">
                <div className="identity-detail-hero">
                    <div className="identity-avatar identity-detail-avatar">
                        {(isPending == true) && <>
                            <Circles
                                color="#a4a4a4"
                                height={40}
                                width={40}
                            />
                        </>}
                        {(isPending == false) && <>
                            <Blockie
                                seed={entity.hash}
                                size={72}/>
                        </>}


                    </div>
                    <div className="identity-detail-heading">
                        <div className="identity-card-nickname">
                            {entity.display_name || "Unnamed"}
                        </div>
                        <div className="identity-status-row">
                            <span className="identity-active-badge">
                                {isActive ? 'Active' : 'Stored'}
                            </span>
                            {isHardware ? (
                                <span className="identity-hardware-badge">
                                    <svg viewBox="0 0 24 24" className="identity-badge-icon"><path
                                        d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v4h10V4H7zm0 6v10h10V10H7z"/></svg>
                                    Hardware Key
                                </span>
                            ) : (
                                <span className="identity-private-badge">Private Key</span>
                            )}
                        </div>
                    </div>
                </div>

                {(message && message?.length > 0) && <>
                    <div className="modal-message">
                        {message}
                    </div>
                </>}


                {(error && error?.length > 0) && <>
                    <div className="modal-error">
                        {error}
                    </div>
                </>}

                {(["default"]).includes(this.state.screen) && <>
                    <div className="identity-address-stack">
                        <button type="button" className="identity-address-row" onClick={() => this.handleCopy(lxmfHash, 'Address')}>
                        <span className="identity-address-meta">
                            <span className="identity-label">LXMF Address</span>
                            <span className="identity-value mono">{lxmfHash}</span>
                        </span>
                            <span className="identity-address-action">
                            <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><rect x="2" y="2" width="13" height="13" rx="2"/></svg>
                        </span>
                        </button>
                        <button type="button" className="identity-address-row" onClick={() => this.handleCopy(identityHash, 'Hash')}>
                        <span className="identity-address-meta">
                            <span className="identity-label">Identity Hash</span>
                            <span className="identity-value mono">{identityHash}</span>
                        </span>
                            <span className="identity-address-action">
                            <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><rect x="2" y="2" width="13" height="13" rx="2"/></svg>
                        </span>
                        </button>
                    </div>

                    <div className="identity-detail-actions">
                        {(!entity?.is_active) && <>
                            <button className="identity-action-row"
                                    onClick={this.onIdentitySwitch.bind(this, entity)}
                                    disabled={isPending}>
                                <TbSwitch size={20}/>
                                <span>{"Switch"}</span>
                            </button>
                        </>}

                        <button className="identity-action-row"
                                onClick={() => this.setState({screen: "password"})}
                                disabled={isPending}>
                            <IoKeyOutline size={20}/>
                            <span>{entity.passcode_protected ? 'Change PIN' : 'Set PIN'}</span>
                        </button>

                        {entity?.passcode_protected &&
                            <button className="identity-action-row"
                                    onClick={() => this.setState({screen: "passwordRemove"})}
                                    disabled={isPending}>
                                <IoKeyOutline size={20}/>
                                <span>{'Remove PIN'}</span>
                            </button>}
                        <button className="identity-action-row"
                                onClick={() => this.setState({screen: "share"})}
                                disabled={isPending}>
                            <MdOutlineQrCode size={20}/>
                            <span>Share</span>
                        </button>
                        <button className="identity-action-row"
                                onClick={() => this.setState({screen: "export"})}
                                disabled={isPending}>
                            <PiExport size={20}/>
                            <span>Export</span>
                        </button>
                        {(!entity?.is_active) && <>
                            <button className="identity-action-row identity-action-row--danger"
                                    onClick={this.onIdentityDelete.bind(this, entity)}
                                    disabled={isPending}>
                                <RiDeleteBin7Line size={20}/>

                                <span>{'Remove'}</span>
                            </button>
                        </>}
                    </div>
                </>}

                {(["share"]).includes(this.state.screen) && <>
                    <Share
                        entity={entity}
                        onCancel={() => this.setState({screen: "default"})}
                        onSuccess={() => this.setState({screen: "default"})}
                    />
                </>}

                {(["export"]).includes(this.state.screen) && <>
                    <Export
                        entity={entity}
                        onCancel={() => this.setState({screen: "default"})}
                        onSuccess={() => this.setState({screen: "default"})}
                    />
                </>}

                {(["password"]).includes(this.state.screen) && <>
                    <Password
                        entity={entity}
                        isPasswordRemove={false}
                        onCancel={() => this.setState({screen: "default"})}
                        onSuccess={this.onIdentityPassword.bind(this)}
                        onError={(error) => this.setState({error})}
                        onPending={(isPending) => this.setState({
                            isPending: isPending,
                            error: undefined,
                            message: undefined
                        })}
                    />
                </>}

                {(["passwordRemove"]).includes(this.state.screen) && <>
                    <Password
                        entity={entity}
                        isPasswordRemove={true}
                        onCancel={() => this.setState({screen: "default"})}
                        onSuccess={this.onIdentityPasswordRemove.bind(this)}
                        onError={(error) => this.setState({error})}
                        onPending={(isPending) => this.setState({
                            isPending: isPending,
                            error: undefined,
                            message: undefined
                        })}
                    />
                </>}


            </div>
        );
    }
}
