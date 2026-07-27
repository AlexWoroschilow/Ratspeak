"use strict";
import React from "react";
import {GoGlobe} from "react-icons/go";
import {IoGitNetworkOutline} from "react-icons/io5";
import {VscDebugDisconnect} from "react-icons/vsc";
import "./Internet.scss";
import {inject, observer} from "mobx-react";
import {Interfaces, Network as NetworkStore, Statistic, StatisticInterface, StatisticInterfaces} from "../../ApplicationStore/Network";
import {PiPlugsConnectedLight} from "react-icons/pi";
import {info} from "@tauri-apps/plugin-log";
import {ServerAdd} from "./ServerAdd";
import {ServerList} from "./ServerList";

interface InternetProps {
    network?: NetworkStore;
}

interface InternetState {
    error?: {
        code: string;
        message: string
    } | undefined;
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
    }>
}

@inject("network")
@observer
class Internet extends React.Component<InternetProps, InternetState> {
    constructor(props: InternetProps) {
        super(props);

        this.state = {
            servers: this.getServers()
        }
    }

    getServers() {
        const servers = [
            {
                id: 'ratspeak-ruby',
                name: 'Ruby',
                host: '1.ratspeak.org',
                port: 4141,
                tone: 'ruby',
                mark_icon: 'gem',
                isConnected: false,
                tags: ['OFFICIAL'],
            },
            {
                id: 'ratspeak-emerald',
                name: 'Emerald',
                host: '2.ratspeak.org',
                port: 4242,
                tone: 'emerald',
                mark_icon: 'gem',
                isConnected: false,
                tags: ['OFFICIAL'],
            },
            {
                id: 'ratspeak-diamond',
                name: 'Diamond',
                host: '3.ratspeak.org',
                port: 4343,
                tone: 'diamond',
                mark_icon: 'gem',
                isConnected: false,
                tags: ['OFFICIAL']
            },
            {
                id: 'beleth',
                name: 'Beleth',
                host: 'rns.beleth.net',
                port: 4242,
                tone: 'beleth',
                mark: 'B',
                isConnected: false,
                tags: ['UNOFFICIAL']
            },
            {
                id: 'rmap',
                name: 'RMAP',
                host: 'rmap.world',
                port: 4242,
                tone: 'rmap',
                mark: 'R',
                isConnected: false,
                tags: ['UNOFFICIAL']
            }
        ];

        const {network} = this.props;
        const {tcp_client} = network?.interfaces as Interfaces;
        const enabled = tcp_client?.map?.((server) => {
            return server.name;
        })

        servers.forEach((server) => {
            (enabled?.includes?.(server.name)) &&
            (server.isConnected = true);
        });

        return servers;
    }


    doToggleServer(event: any) {
        const {network} = this.props;
        const servers = this.getServers();

        const unique: string = `${event.currentTarget.getAttribute('data-server')}`;
        const serversSelected: any = servers.filter((server) => {
            return server.id == unique;
        });

        serversSelected?.forEach?.((server: any) => {

            (server.isConnected === false) &&
            network?.addConnectionTCP(server).then(() => {

                servers.forEach((server) => {
                    server.isConnected = server.id == unique;
                });

                return this.setState({servers: servers});
            }).catch((error) => {
                return this.setState({error: error});
            });

            (server.isConnected === true) &&
            network?.removeConnectionTCP(server).then(() => {

                servers.forEach((server) => {
                    (server.id == unique) &&
                    (server.isConnected = false)
                });

                return this.setState({servers: servers});
            }).catch((error) => {
                return this.setState({error: error});
            });
        });

        return this.setState({error: undefined});
    }

    render() {

        const {network} = this.props;
        const {servers, error} = this.state;

        return <>
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
                        {servers?.map?.((server) => (
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

            <ServerList/>
            <div className="bottom-sheet-footer">
                <button className="rs-dialog-confirm">Add new Network</button>
            </div>

            {/*<ServerAdd/>*/}
        </>
    }
}

export default Internet
