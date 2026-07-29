"use strict";
import React from "react";
import {GoGlobe} from "react-icons/go";
import {IoGitNetworkOutline} from "react-icons/io5";
import {VscDebugDisconnect} from "react-icons/vsc";
import "./Internet.scss";
import {inject, observer} from "mobx-react";
import {ConfigTCP, Interfaces, Network as NetworkStore, PublicServer, Statistic, StatisticInterface, StatisticInterfaces} from "../../ApplicationStore/Network";
import {PiPlugsConnectedLight} from "react-icons/pi";
import {info} from "@tauri-apps/plugin-log";
import {ServerForm} from "./ServerForm";
import {ServerList} from "./ServerList";
import {network} from "../../ApplicationStore";

interface InternetProps {
    network?: NetworkStore;
}

interface InternetState {
    error?: {
        code: string;
        message: string
    } | undefined;
    isEnabledForm: boolean,
    iface?: ConfigTCP;
    servers: Array<{
        id?: string;
        name?: string;
        host?: string;
        port?: number,
        tone?: string;
        mark_icon?: string;
        mark?: string;
        tags?: Array<string>;
        isConnected: boolean;
        aliases?: Array<{
            host: string;
            port: number,
        }>
    }> | undefined;
}

@inject("network")
@observer
class Internet extends React.Component<InternetProps, InternetState> {
    constructor(props: InternetProps) {
        super(props);

        this.state = {
            isEnabledForm: false,
            servers: this.props?.network?.publicServers
        }
    }

    doToggleServer(event: any) {
        const {network} = this.props;
        const servers = network?.publicServers;

        const unique: string = `${event.currentTarget.getAttribute('data-server')}`;
        const serversSelected: any = servers?.filter?.((server) => {
            return server.id == unique;
        });

        serversSelected?.forEach?.((server: any) => {

            (server.isConnected === false) &&
            network?.addConnectionTCP(server)
                .catch((error) => {
                    return this.setState({error: error});
                });

            (server.isConnected === true) &&
            network?.removeConnectionTCP(server)
                .catch((error) => {
                    return this.setState({error: error});
                });
        });

        return this.setState({error: undefined});
    }

    onCloseForm() {
        return this.setState({
            isEnabledForm: false
        });
    }

    onOpenForm(iface?: ConfigTCP | undefined) {
        return this.setState({isEnabledForm: true, iface: iface});
    }

    render() {

        const {network} = this.props;
        const {error} = this.state;

        return <>

            {(this?.state?.isEnabledForm) && <>
                <ServerForm onCancel={this.onCloseForm.bind(this)} iface={this.state.iface}/>
            </>}

            {(!this?.state?.isEnabledForm) && <div className="internet-container">
                <div className="bottom-sheet-header">
                    <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="tcp">
                        <IoGitNetworkOutline size={20}/>
                        <span className="bottom-sheet-title-label">
                        Connected Networks
                    </span>
                    </div>
                    <div className="activity-controls">
                        <button className="nr-btn nr-btn-xs" id="activity-clear-btn"
                                onClick={() => {
                                    this.onOpenForm()
                                }}>
                            Add custom Network
                        </button>
                    </div>
                </div>
                <ServerList onEditServer={this.onOpenForm.bind(this)} onCancel={this.onCloseForm.bind(this)}/>

                <div className="bottom-sheet-header">
                    <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="tcp">
                        <GoGlobe size={20}/>
                        <span className="bottom-sheet-title-label">
                        Public Network
                    </span>
                    </div>
                </div>
                <div className="bottom-sheet-body">
                    {(error?.message != undefined) && <>
                        <div className="rs-dialog-field-error" id="rnode-public-map-error">
                            {error?.message}
                        </div>
                    </>}
                    <div className="connect-tab-panel active" id="connect-public-panel" role="tabpanel" aria-labelledby="connect-tab-public">
                        <div className="public-server-list" id="public-server-list">
                            {network?.publicServers?.map?.((server) => (
                                <span className={`public-server-card public-server-card--${server.tone}`}>
                                <span className="public-server-mark">
                                    {(server?.isConnected === true) && <PiPlugsConnectedLight size={20}/>}
                                    {(server?.isConnected === false) && <VscDebugDisconnect size={20}/>}
                                </span>
                                <span className="public-server-main">
                                    <span className="public-server-name">
                                        {server.name}</span>
                                    <span className="public-server-tags">
                                        {server?.tags?.map?.((tag: string) => (
                                            <span className="public-server-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </span>
                                </span>
                                <span className="public-server-action">
                                    <label className="prop-toggle activity-toggle">
                                        <input type="checkbox" data-server={server.id}
                                               checked={server.isConnected}
                                               onChange={this.doToggleServer.bind(this)}/>
                                        <span className="prop-slider"></span>
                                    </label>
                                </span>
                            </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/*<div className="bottom-sheet-footer">*/}
                {/*</div>*/}
            </div>}

        </>
    }
}

export default Internet
