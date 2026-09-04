"use strict";
import React from "react";
import {Switcher, SwitchFailed, SwitchSuccessful} from "../components/Switcher";
import {InboxSettings, Settings as SettingsStore} from "../../ApplicationStore/Settings";
import {inject, observer} from "mobx-react";
import {info} from "@tauri-apps/plugin-log";
import {IoMdAdd} from "react-icons/io";

interface InboxHostProps {
    settings?: SettingsStore | undefined;
}

interface InboxHostState {
}

@inject("settings")
@observer
export class InboxHost extends React.Component<InboxHostProps, InboxHostState> {
    constructor(props: InboxHostProps) {
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
                            Hosted Offline Inbox
                        </div>
                        <div className="panel-body">
                            <div className="settings-row propagation-settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Host inbox node</span>
                                    <span className="settings-row-desc">Store offline LXMF messages for other people using this device.</span>
                                </div>
                                <Switcher value={inbox?.hosting_enabled ? 1 : 0} onChanged={this.onChangedHosting.bind(this)}/>
                            </div>

                            <div className="settings-row propagation-settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Host inbox node</span>
                                    <span className="settings-row-desc">Store offline LXMF messages for other people using this device.</span>
                                </div>
                                <button className="nr-btn nr-btn-sm" id="prop-host-announce-btn">Announce</button>
                            </div>
                            <div className="settings-row propagation-settings-row" style={{borderBottom: "none"}}>
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Inbox Stamp Cost</span><span className="settings-row-desc">Higher values make spam harder but slow down senders.</span>
                                </div>
                                <Switcher value={inbox?.required_stamp_cost} states={[
                                    {name: '8', value: '8'},
                                    {name: '12', value: '12'},
                                    {name: '16', value: '16'}
                                ]}/>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </>
    }
}
