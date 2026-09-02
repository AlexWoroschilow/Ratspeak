"use strict";
import React from "react";
import {Switcher, SwitchFailed, SwitchSuccessful} from "../components/Switcher";
import {InboxSettings, Settings as SettingsStore} from "../../ApplicationStore/Settings";
import {inject, observer} from "mobx-react";
import {info} from "@tauri-apps/plugin-log";
import {IoMdAdd} from "react-icons/io";

interface InboxProps {
    settings?: SettingsStore | undefined;
}

interface InboxState {
}

@inject("settings")
@observer
export class Inbox extends React.Component<InboxProps, InboxState> {
    constructor(props: InboxProps) {
        super(props);

        this.state = {}
    }

    onChangedInboxMode(mode: string | number): Promise<SwitchSuccessful> {
        const {settings} = this.props;
        const {inbox} = settings || {};

        return new Promise((resolve: (value: SwitchSuccessful) => void, reject: (reason: SwitchFailed) => void) => {
            settings?.setInboxSettings?.(`${mode}`, inbox?.favor_static || true)
                .then((inbox: InboxSettings) => {
                    return resolve({
                        message: `Mode set to ${inbox?.mode}!`
                    } as SwitchSuccessful);
                })
                .catch((error: any) => {
                    return reject({
                        error: `Failed!`
                    } as SwitchFailed);
                });
        });
    }


    onChangedInboxFavorStatic(favorStatic: string | number): Promise<SwitchSuccessful> {
        const {settings} = this.props;
        const {inbox} = settings || {};

        return new Promise((resolve: (value: SwitchSuccessful) => void, reject: (reason: SwitchFailed) => void) => {
            settings?.setInboxSettings?.(inbox?.mode || "off", favorStatic == 1)
                .then((data: InboxSettings) => {
                    return resolve({
                        message: `Successful!`
                    } as SwitchSuccessful);
                })
                .catch((error: any) => {
                    return reject({
                        error: `Failed!`
                    } as SwitchFailed);
                });
        });
    }


    onChangedHosting(enabled: string | number): Promise<SwitchSuccessful> {
        const {settings} = this.props;

        return new Promise((resolve: (value: SwitchSuccessful) => void, reject: (reason: SwitchFailed) => void) => {
            settings?.setHostingEnabled?.(enabled == 1)
                .then((data: InboxSettings) => {
                    return resolve({
                        message: `Successful!`
                    } as SwitchSuccessful);
                })
                .catch((error: any) => {
                    return reject({
                        error: `Failed!`
                    } as SwitchFailed);
                });
        });
    }

    onChangedStampEnforce(enabled: string | number): Promise<SwitchSuccessful> {
        const {settings} = this.props;
        const {inbox} = settings || {};

        return new Promise((resolve: (value: SwitchSuccessful) => void, reject: (reason: SwitchFailed) => void) => {
            settings?.setHostingStampSettings?.(enabled == 1, inbox?.required_stamp_cost || 0)
                .then((inbox: InboxSettings) => {
                    return resolve({
                        message: `Successful!`
                    } as SwitchSuccessful);
                })
                .catch((error: any) => {
                    return reject({
                        error: `Failed!`
                    } as SwitchFailed);
                });
        });
    }


    onChangedStampCost(value: string | number): Promise<SwitchSuccessful> {
        const {settings} = this.props;
        const {inbox} = settings || {};

        return new Promise((resolve: (value: SwitchSuccessful) => void, reject: (reason: SwitchFailed) => void) => {
            settings?.setHostingStampSettings?.(inbox?.enforce_stamps || false, Number(value))
                .then((inbox: InboxSettings) => {
                    return resolve({
                        message: `New stamp cost set to ${inbox?.required_stamp_cost}!`
                    } as SwitchSuccessful);
                })
                .catch((error: any) => {
                    return reject({
                        error: `Failed!`
                    } as SwitchFailed);
                });
        });
    }

    render() {
        const {settings} = this.props;

        const {inbox} = settings || {};

        return <>
            <section className="settings-detail-pane" aria-labelledby="settings-detail-title">
                <div className="settings-page-inner settings-detail-panels">


                    <div className="panel settings-panel settings-panel-selected" id="panel-settings-offline-inbox" aria-hidden="false">
                        <div className="panel-header">
                            Offline Inbox
                            <span className="panel-header-dot" id="settings-relay-dot"></span>
                        </div>
                        <div className="panel-body">
                            <div className="settings-row" style={{borderBottom: "none"}}>
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Offline Inbox</span>
                                    <span className="settings-row-desc">Store messages on an Offline Inbox when you're away</span>
                                </div>

                                {!inbox?.connected &&
                                    <span className="settings-relay-badge">
                                        {inbox?.mode != "off" && "Finding inbox..."}
                                        {inbox?.mode == "off" && "Off"}
                                </span>}

                                {inbox?.connected &&
                                    <span className="settings-relay-badge connected">
                                        {inbox?.mode == "auto" && "Auto: ready"}
                                </span>}


                            </div>
                            <div id="settings-propagation-status">
                                <label className="settings-row">
                                    <div className="settings-row-info">
                                        <span className="settings-row-desc">When contacts can't reach you directly, your Offline Inbox stores their messages until you come back online.</span>
                                    </div>
                                    <Switcher value={inbox?.mode} states={[
                                        {value: "manual", name: "On"},
                                        {value: "auto", name: "Auto", isDefault: true},
                                        {value: "off", name: "Off"},
                                    ]} onChanged={this.onChangedInboxMode.bind(this)}/>
                                </label>

                                <label className="settings-row">
                                    <div className="settings-row-info">
                                        <span className="settings-row-label">Favor Ratspeak inbox nodes</span><span className="settings-row-desc">Prefer reachable Ratspeak inbox nodes, with fallback when none can be reached.</span>
                                    </div>
                                    <Switcher value={inbox?.favor_static ? 1 : 0} onChanged={this.onChangedInboxFavorStatic.bind(this)}/>
                                </label>

                                <div className="relay-card relay-card-empty">
                                    <div className="inline-hint">Looking for a reachable Offline Inbox…</div>
                                </div>
                                <div className="relay-advanced-block">
                                    <div className="propagation-section-title">Hosted Offline Inbox</div>
                                    <div className="settings-row propagation-settings-row">
                                        <div className="settings-row-info">
                                            <span className="settings-row-label">Host inbox node</span>
                                            <span className="settings-row-desc">Store offline LXMF messages for other people using this device.</span>
                                        </div>
                                        <Switcher value={inbox?.hosting_enabled ? 1 : 0} onChanged={this.onChangedHosting.bind(this)}/>
                                    </div>
                                </div>
                                <details className="relay-advanced-block relay-details">
                                    <summary>Message stamp protection</summary>
                                    <div className="settings-row propagation-settings-row">
                                        <div className="settings-row-info"><span className="settings-row-label">Require stamps</span>
                                            <span className="settings-row-desc">Advertise and require proof-of-work on messages sent directly to you.</span>
                                        </div>
                                        <Switcher value={inbox?.enforce_stamps ? 1 : 0} onChanged={this.onChangedStampEnforce.bind(this)}/>
                                    </div>
                                    <div className="settings-row propagation-settings-row" style={{borderBottom: "none"}}>
                                        <div className="settings-row-info">
                                            <span className="settings-row-label">Required work</span><span className="settings-row-desc">Higher values make spam harder but slow down senders.</span>
                                        </div>

                                        <Switcher value={inbox?.required_stamp_cost} states={[
                                            {name: 'Off', value: '0'},
                                            {name: '8', value: '8'},
                                            {name: '12', value: '12'},
                                            {name: '16', value: '16'}
                                        ]} onChanged={this.onChangedStampCost.bind(this)}/>

                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    }
}
