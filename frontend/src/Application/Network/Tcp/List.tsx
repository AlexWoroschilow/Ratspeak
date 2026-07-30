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
    onEditServer: (iface: ConfigTCP) => void;
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

    encodeBase64(str: string): string {
        const bytes = new TextEncoder().encode(str);
        const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
        return btoa(binString);
    }

    decodeBase64(base64Str: string): string {
        const binString = atob(base64Str);
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
        return new TextDecoder().decode(bytes);
    }

    onEditServer(event: MouseEvent) {
        const iface: InterfaceTCP = JSON.parse(this.decodeBase64(
            `${event.currentTarget.getAttribute('data-config')}`
        )) as InterfaceTCP;

        this?.props?.onEditServer?.({
            name: iface.name,
            host: iface.target_host,
            port: Number(iface.target_port),
            // ifac_enabled?: boolean
            // ifac_network_name?: string;
            // ifac_passphrase?: string;
        } as ConfigTCP);
    }

    onToggleServer(event: MouseEvent) {
        const iface: InterfaceTCP = JSON.parse(this.decodeBase64(
            `${event.currentTarget.getAttribute('data-config')}`
        )) as InterfaceTCP;

        const {network} = this.props;

        const config = {
            name: iface.name,
        } as ConfigTCP

        (iface?.enabled == true) &&
        network?.pauseConnectionTCP?.(config)
            .then((status: boolean) => {
            })
            .catch(() => {
            });

        (iface?.enabled == false) &&
        network?.resumeConnectionTCP?.(config)
            .then((status: boolean) => {
                info(`???${JSON.stringify(network?.interfaces.tcp_client)}`);
            })
            .catch(() => {
            });

    }

    onRemoveServer(event: MouseEvent) {
        const iface: InterfaceTCP = JSON.parse(this.decodeBase64(
            `${event.currentTarget.getAttribute('data-config')}`
        )) as InterfaceTCP;

        const {network} = this.props;

        network?.removeConnectionTCP?.({
            name: iface.name,
        } as ConfigTCP)
            .then((status: boolean) => {
                this?.props?.onCancel?.();
            })
            .catch(() => {
            });
    }

    onShareServer(event: MouseEvent) {
        const iface: InterfaceTCP = JSON.parse(this.decodeBase64(
            `${event.currentTarget.getAttribute('data-config')}`
        )) as InterfaceTCP;

        info(`onRemoveServer: ${JSON.stringify(iface)}`)
    }

    render() {

        const {network} = this.props;
        const {tcp_client} = network?.interfaces as Interfaces;
        let interfaces = tcp_client?.filter?.((iface: InterfaceTCP) => {
            return iface.type == "TCPClientInterface";
        })

        return <>
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
                                    {interfaces?.map?.((iface: InterfaceTCP) => (
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
                                                <button className="danger-btn-sm" title="Pause this interface"
                                                        onClick={this.onToggleServer.bind(this)}
                                                        data-config={this.encodeBase64(JSON.stringify(iface))}>
                                                    {(iface.enabled) && <>Pause</>}
                                                    {(!iface.enabled) && <>Resume</>}

                                                </button>
                                                <button className="danger-btn-sm" title="Share this interface"
                                                        onClick={this.onShareServer.bind(this)}
                                                        data-config={this.encodeBase64(JSON.stringify(iface))}>
                                                    Share
                                                </button>

                                                <button className="danger-btn-sm" title="Edit this interface"
                                                        onClick={this.onEditServer.bind(this)}
                                                        data-config={this.encodeBase64(JSON.stringify(iface))}>
                                                    Edit
                                                </button>

                                                <button className="danger-btn-sm" title="Remove this interface"
                                                        onClick={this.onRemoveServer.bind(this)}
                                                        data-config={this.encodeBase64(JSON.stringify(iface))}>
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

