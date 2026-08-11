"use strict";
import React from 'react';
import {IdentityInfo} from "../../ApplicationStore/Identity";
import {observer} from "mobx-react";
import Blockie from './../components/Blockie';

interface PreviewProps {
    identity: IdentityInfo;
    onUpdateNickname: (nickname: string) => Promise<void>;
}

interface PreviewState {
    isEditing: boolean;
    nickname: string;
    isSaving: boolean;
    error: string | null;
}

@observer
export class Preview extends React.PureComponent<PreviewProps, PreviewState> {
    constructor(props: PreviewProps) {
        super(props);
        this.state = {
            isEditing: false,
            nickname: props.identity.nickname,
            isSaving: false,
            error: null,
        };
    }

    componentDidUpdate(prevProps: PreviewProps) {
        if (prevProps.identity.hash !== this.props.identity.hash) {
            this.setState({
                nickname: this.props.identity.nickname,
                isEditing: false,
                error: null
            });
        }
    }

    handleEdit = () => {
        this.setState({isEditing: true, nickname: this.props.identity.nickname});
    };

    handleCancel = () => {
        this.setState({
            isEditing: false,
            nickname: this.props.identity.nickname,
            error: null
        });
    };

    handleSave = async () => {
        this.setState({isSaving: true, error: null});
        try {
            await this.props.onUpdateNickname(this.state.nickname);
            this.setState({isEditing: false, isSaving: false});
        } catch (e: any) {
            this.setState({error: e.message || "Failed to update nickname", isSaving: false});
        }
    };

    handleCopy = (value: string, label: string) => {
        navigator.clipboard.writeText(value);
        // In the legacy dashboard this shows a toast. 
        // For now we just perform the copy.
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({nickname: e.target.value});
    };

    render() {
        const {identity} = this.props;
        const {isEditing, nickname, isSaving, error} = this.state;

        const lxmfHash = identity.lxmf_destination || "";
        const identityHash = identity.hash || "";
        const isActive = identity.is_active;
        const isHardware = identity.is_hardware;
        // Logic from identity.js: isOriginalIdentity check is missing here, but we'll stick to what we have in props.
        const activeLabel = isActive ? 'Active' : 'Stored';

        return (
            <div className="peers-detail-content">
                <div className="identity-detail-hero">
                    <div className="identity-avatar identity-detail-avatar">
                        <Blockie seed={identity.hash} size={72}/>
                    </div>
                    <div className="identity-detail-heading">
                        <div className="identity-card-nickname">{identity.nickname || "Unnamed"}</div>
                        <div className="identity-status-row">
                            <span className="identity-active-badge">{activeLabel}</span>
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

                {isActive && (
                    <div className="identity-detail-editor">
                        <div className="modal-field">
                            <label>Display Name</label>
                            <div className="settings-display-name-row">
                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Optional"
                                    maxLength={32}
                                    value={nickname}
                                    onChange={this.handleChange}
                                    disabled={isSaving}
                                />
                                {nickname !== identity.nickname && (
                                    <button className="nr-btn" onClick={this.handleSave} disabled={isSaving}>
                                        {isSaving ? "Saving..." : "Save"}
                                    </button>
                                )}
                            </div>
                            {error && <div className="rs-dialog-field-error">{error}</div>}
                        </div>
                    </div>
                )}

                <div className="identity-detail-actions">
                    <button className="identity-action-row">
                        <span className="identity-action-icon">
                            <svg viewBox="0 0 24 24" className="identity-badge-icon"><path
                                d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v4h10V4H7zm0 6v10h10V10H7z"/></svg>
                        </span>
                        <span>{identity.has_passcode ? 'Change PIN' : 'Set PIN'}</span>
                    </button>
                    <a className="identity-action-row"
                       href={`#identity-share/${identity.hash}}`}>
                        <span className="identity-action-icon">
                            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path
                                d="M14 14h3v3h-3z"/><path d="M19 14h2"/><path d="M14 21h7v-2"/><path d="M19 17h2"/></svg>
                        </span>
                        <span>Share</span>
                    </a>
                    <button className="identity-action-row identity-action-row--danger">
                        <span className="identity-action-icon">
                            <svg viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>
                        </span>
                        <span>{isHardware ? 'Remove Identity' : 'Delete Identity'}</span>
                    </button>
                </div>
            </div>
        );
    }
}
