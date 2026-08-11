"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";
import Blockie from './../components/Blockie';
import {info} from "@tauri-apps/plugin-log";
import {RiDeleteBin7Line} from "react-icons/ri";
import {MdOutlineQrCode} from "react-icons/md";
import {IoKeyOutline} from "react-icons/io5";
import {TbSwitch} from "react-icons/tb";

interface PreviewProps {
    entity: IdentityInfo;
    identity?: IdentityStore;
    onIdentityDelete?: () => void;
}

interface PreviewState {
    entity: IdentityInfo;
    error: string | undefined;
    isPending: boolean;
}

@inject("identity")
@observer
export class Preview extends React.PureComponent<PreviewProps, PreviewState> {
    constructor(props: PreviewProps) {
        super(props);


        this.state = {
            entity: props.entity,
            error: undefined,
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
            .then((idn: IdentityInfo | undefined) => {

                (idn != undefined) &&
                info(`onIdentitySwitch: ${JSON.stringify(idn)}`);

                (idn != undefined) &&
                (this.setState({
                    isPending: false,
                    entity: idn
                }));
            })
            .catch((error) => {
                this.setState({
                    isPending: false,
                    error: error
                });
            });

        this.setState({
            error: undefined,
            isPending: true,
        });
    }

    onIdentityDelete(entity: IdentityInfo) {
        const {identity} = this.props;
        identity?.deleteIdentity?.(entity)
            .then(() => {
                this?.props?.onIdentityDelete?.();
                this.setState({isPending: false});
            })
            .catch((error) => {
                this.setState({error: error, isPending: false})
            });

        this.setState({
            error: undefined,
            isPending: true,
        });
    }

    onIdentityPassword(identity: IdentityInfo) {
        info(`onIdentityPassword: ${JSON.stringify(identity)}`)
    }

    onIdentityShare(identity: IdentityInfo) {
        info(`onIdentityShare: ${JSON.stringify(identity)}`)
    }


    handleCopy = (value: string, label: string) => {
        navigator.clipboard.writeText(value);
    };

    render() {
        const {entity, error, isPending} = this.state;

        const lxmfHash = entity.lxmf_hash || "";
        const identityHash = entity.hash || "";
        const isActive = entity.is_active;
        const isHardware = entity.is_hardware;

        return (
            <div className="peers-detail-content">
                <div className="identity-detail-hero">
                    <div className="identity-avatar identity-detail-avatar">
                        <Blockie seed={entity.hash} size={72}/>
                    </div>
                    <div className="identity-detail-heading">
                        <div className="identity-card-nickname">
                            {entity.nickname || "Unnamed"}

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

                {(error && error?.length > 0) && <>
                    <div className="modal-error" id="identity-create-passcode-error">
                        {error}
                    </div>
                </>}

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
                            onClick={this.onIdentityPassword.bind(this, entity)}
                            disabled={isPending}>
                        <IoKeyOutline size={20}/>
                        <span>{entity.passcode_protected ? 'Change PIN' : 'Set PIN'}</span>
                    </button>
                    <button className="identity-action-row"
                            onClick={this.onIdentityShare.bind(this, entity)}
                            disabled={isPending}>
                        <MdOutlineQrCode size={20}/>
                        <span>Share</span>
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
            </div>
        );
    }
}
