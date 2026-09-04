"use strict";
import React from "react";
import {Switcher, SwitchFailed, SwitchSuccessful} from "../components/Switcher";
import {InboxNode, InboxSettings, Settings as SettingsStore} from "../../ApplicationStore/Settings";
import {inject, observer} from "mobx-react";
import {info} from "@tauri-apps/plugin-log";
import {IoMdAdd} from "react-icons/io";
import "./Inbox.scss";

interface InboxProps {
    settings?: SettingsStore | undefined;
}

interface InboxState {
    nodes: Array<InboxNode> | undefined;
}

@inject("settings")
@observer
export class Inbox extends React.Component<InboxProps, InboxState> {
    constructor(props: InboxProps) {
        super(props);

        this.state = {
            nodes: undefined
        }
    }


    componentDidMount() {
        const {settings} = this.props;

        settings?.getInboxNodes?.()?.then?.((nodes) => {
            this.setState({nodes: nodes});
        });
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
            <section className="Inbox settings-detail-pane" aria-labelledby="settings-detail-title">
                <div className="settings-page-inner settings-detail-panels">


                    <div className="panel settings-panel settings-panel-selected" id="panel-settings-offline-inbox" aria-hidden="false">
                        <div className="panel-header">
                            Offline Inbox
                        </div>
                        <div className="panel-body">

                            <label className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Offline Inbox</span>
                                    <span className="settings-row-desc">Store messages on an Offline Inbox when you're away</span>
                                </div>
                                <Switcher value={inbox?.mode} states={[
                                    {value: "manual", name: "On"},
                                    {value: "auto", name: "Auto", isDefault: true},
                                    {value: "off", name: "Off"},
                                ]} onChanged={this.onChangedInboxMode.bind(this)}/>
                            </label>

                            {inbox?.mode == "manual" && <>
                                <div className="relay-node-list">
                                    {this.state.nodes?.map((node: InboxNode) => (
                                        <div className="relay-node-row">
                                            {node.static && <>
                                                <span className="relay-static-badge" title="Bundled Ratspeak inbox node">★</span>
                                            </>}

                                            {/*<span className="text-muted-color text-xs">tracked</span>*/}
                                            <span className="relay-node-name">{node.display_name}</span>
                                            <span className="relay-node-hops">{node.hops} hops</span>

                                            {node.hash == inbox.node_hash && <>
                                                <span className="relay-node-badge">Active</span>
                                            </>}

                                            {node.hash != inbox.node_hash && <>
                                                <button className="nr-btn nr-btn-xs relay-select-btn">
                                                    Select
                                                </button>
                                            </>}

                                        </div>
                                    ))}
                                </div>
                            </>}


                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Inbox Node</span>
                                    <span className="settings-row-desc">{inbox?.auto_active_node}</span>
                                    <span className="settings-row-desc">Messages: {inbox?.message_count}</span>
                                </div>
                                <div className="settings-row-desc">
                                    <button className="nr-btn nr-btn-sm">Check Now</button> &nbsp;
                                    <button className="nr-btn nr-btn-sm">Dsconnect</button>
                                </div>

                                {/*{!inbox?.connected &&*/}
                                {/*    <span className="settings-relay-badge">*/}
                                {/*        {inbox?.mode != "off" && "Finding inbox..."}*/}
                                {/*        {inbox?.mode == "off" && "Off"}*/}
                                {/*</span>}*/}

                                {/*{inbox?.connected &&*/}
                                {/*    <span className="settings-relay-badge connected">*/}
                                {/*        {inbox?.mode == "auto" && "Auto: ready"}*/}
                                {/*</span>}*/}
                            </div>

                            <label className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Favor Ratspeak inbox nodes</span><span className="settings-row-desc">Prefer reachable Ratspeak inbox nodes, with fallback when none can be reached.</span>
                                </div>
                                <Switcher value={inbox?.favor_static ? 1 : 0} onChanged={this.onChangedInboxFavorStatic.bind(this)}/>
                            </label>

                            <div className="settings-row propagation-settings-row">
                                <div className="settings-row-info"><span className="settings-row-label">Require stamps</span>
                                    <span className="settings-row-desc">Advertise and require proof-of-work on messages sent directly to you.</span>
                                </div>
                                <Switcher value={inbox?.enforce_stamps ? 1 : 0} onChanged={this.onChangedStampEnforce.bind(this)}/>
                            </div>

                            <div className="settings-row propagation-settings-row">
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

                        </div>
                    </div>

                </div>
            </section>
        </>
    }
}
