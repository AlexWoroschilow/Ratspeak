"use strict";
import React, {MouseEvent} from "react";
import {VscDebugDisconnect} from "react-icons/vsc";
import {inject, observer} from "mobx-react";
import {ConfigTCP, Interfaces, InterfaceTCP, Network as NetworkStore} from "../../../ApplicationStore/Network";
import {PiPlugsConnectedLight} from "react-icons/pi";
import "./List.scss";
import {info} from "@tauri-apps/plugin-log";

interface ListProps {
    network?: NetworkStore;
    onCancel: () => void;
}

interface ListState {
    error?: {
        code: string;
        message: string
    } | undefined;
}

@inject("network")
@observer
export class List extends React.Component<ListProps, ListState> {
    constructor(props: ListProps) {
        super(props);

        this.state = {}
    }

    onPause(iface: any) {
        this.props.network?.pauseInterface(iface.name, 'auto');
    }

    onResume(iface: any) {
        this.props.network?.resumeInterface(iface.name, 'auto');
    }

    onRemove(iface: any) {
        this.props.network?.removeInterface(iface.name, 'auto');
    }

    render() {

        const {network} = this.props;
        let interfaces: Array<any> = network?.interfaces?.auto || [];

        return <>
            <div className="bottom-sheet-body" style={{flex: 1, overflowY: 'auto'}}>
                <div className="connect-tab-panel active" id="connect-custom-panel" role="tabpanel" aria-labelledby="connect-tab-custom">
                    <div className="modal-field" id="connect-quick-field">
                        <div className="quick-connect-options" id="quick-connect-list">
                            {(!interfaces?.length) && <>
                                <div id="qc-empty" className="inline-hint" style={{padding: "8px 0"}}>
                                    No local reticulum networks connected.
                                </div>
                            </>}

                            {(interfaces?.length > 0) && <>
                                <div className="public-server-list" id="public-server-list">
                                    {interfaces?.map?.((iface: any) => (
                                        <span className={`public-server-card`}>
                                            <span className="public-server-mark">
                                                {(iface.enabled) && <PiPlugsConnectedLight size={20}/>}
                                                {(!iface.enabled) && <VscDebugDisconnect size={20}/>}
                                            </span>
                                            <span className="public-server-main">
                                                <span className="public-server-name">
                                                    {iface.name}
                                                </span>
                                                <span className="public-server-tags">
                                                    {iface.group_id && `Group: ${iface.group_id}`}
                                                    {iface.discovery_scope && ` | Scope: ${iface.discovery_scope}`}
                                                </span>
                                            </span>
                                            <span className="public-server-action">
                                                <button className="danger-btn-sm" title="Toggle this interface"
                                                        onClick={() => iface.enabled ? this.onPause(iface) : this.onResume(iface)}>
                                                    {(iface.enabled) && <>Pause</>}
                                                    {(!iface.enabled) && <>Resume</>}
                                                </button>

                                                <button className="danger-btn-sm" title="Remove this interface" onClick={() => this.onRemove(iface)}>
                                                    Remove
                                                </button>
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            </div>

        </>
    }
}

