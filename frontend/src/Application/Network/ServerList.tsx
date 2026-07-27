"use strict";
import React from "react";
import {IoGitNetworkOutline} from "react-icons/io5";
import {VscDebugDisconnect} from "react-icons/vsc";
import {inject, observer} from "mobx-react";
import {Interfaces, Network as NetworkStore} from "../../ApplicationStore/Network";
import {PiPlugsConnectedLight} from "react-icons/pi";
import "./ServerList.scss";

interface ServerListProps {
    network?: NetworkStore;
}

interface ServerListState {
    error?: {
        code: string;
        message: string
    } | undefined;
}

@inject("network")
@observer
export class ServerList extends React.Component<ServerListProps, ServerListState> {
    constructor(props: ServerListProps) {
        super(props);

        this.state = {}
    }

    render() {

        const {network} = this.props;
        const {tcp_client} = network?.interfaces as Interfaces;
        let interfaces = tcp_client?.filter?.((iface: any) => {
            return iface.type == "TCPClientInterface";
        })

        return <>

            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="tcp">
                    <IoGitNetworkOutline size={20}/>
                    <span className="bottom-sheet-title-label">
                        Connected Networks
                    </span>
                </div>
            </div>

            <div className="bottom-sheet-body">
                <div className="connect-tab-panel active" id="connect-custom-panel" role="tabpanel" aria-labelledby="connect-tab-custom">
                    <div className="modal-field" id="connect-quick-field">
                        <div className="quick-connect-options" id="quick-connect-list">
                            {(!interfaces?.length) && <>
                                <div id="qc-empty" className="inline-hint" style={{padding: "8px 0"}}>
                                    No saved connections. Connect to a node below to save it here.
                                </div>
                            </>}

                            {(interfaces?.length > 0) && <>
                                <div className="public-server-list" id="public-server-list">
                                    {interfaces?.map?.((iface) => (
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
                                                    {`${iface.target_host}:${iface.target_port}`}
                                                </span>
                                            </span>
                                            <span className="public-server-action">
                                                <button className="danger-btn-sm" title=" Edit interface">Pause</button>
                                                <button className="danger-btn-sm" title=" Edit interface">Edit</button>
                                                <button className="danger-btn-sm" title=" Remove this interface">Remove</button>
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

