"use strict";
import React from "react";
import {IoGitNetworkOutline} from "react-icons/io5";
import {inject, observer} from "mobx-react";
import {Localhost, LocalhostInterface, Network as NetworkStore} from "../../../ApplicationStore/Network";
import {invoke} from "@tauri-apps/api/core";
import {info} from "@tauri-apps/plugin-log";

interface FormProps {
    network?: NetworkStore;
    onCancel?: () => void;
}

interface FormState {
    error?: string;
    interfaces: Array<LocalhostInterface>;
    config: {
        name: string;
        group_id: string;
        discovery_scope: string;
        discovery_port: number;
        data_port: number;
        devices: string[];
    };
}

@inject("network")
@observer
export class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            interfaces: [],
            config: {
                name: "Local Network",
                group_id: "reticulum",
                discovery_scope: "link",
                discovery_port: 29716,
                data_port: 42671,
                devices: [],
            },
        };
    }

    componentDidMount() {
        const {network} = this.props;

        network?.getInterfacesLocal?.()
            .then((localhost: Localhost) => {
                const ifaces: Array<LocalhostInterface> = (localhost?.interfaces) || [];

                this.setState({
                    interfaces: ifaces.filter((i: any) => !i.is_loopback),
                });

            }).catch((error) => this.setState({error: error}));

        this.setState({error: undefined});
    }

    onEnableNetwork() {
        const {name, ...options} = this.state.config;

        invoke("enable_auto_interface", {name, options})
            .then(() => {
                this.props.network?.getInterfaces();
                this.props.onCancel?.();
            })
            .catch((err) => {
                this.setState({error: err?.message || "Failed to enable Local Network"});
            });
    }

    render() {
        const {error, config, interfaces} = this.state;

        return (
            <>
                <div className="bottom-sheet-header">
                    <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="local">
                        <IoGitNetworkOutline size={20}/>
                        <span className="bottom-sheet-title-label">Enable Local Network</span>
                    </div>
                </div>

                <div className="bottom-sheet-body">
                    {error && <div className="rs-dialog-field-error">{error}</div>}

                    <div className="modal-field">
                        <label>Interface Name</label>
                        <input
                            type="text"
                            className="modal-input"
                            value={config.name}
                            onChange={(e) => this.setState({config: {...config, name: e.target.value}})}
                        />
                    </div>

                    <div className="modal-field">
                        <label>Group ID</label>
                        <input
                            type="text"
                            className="modal-input"
                            value={config.group_id}
                            onChange={(e) => this.setState({config: {...config, group_id: e.target.value}})}
                        />
                        <div className="rs-dialog-field-help">Devices with the same Group ID auto-discover each other.</div>
                    </div>

                    <details className="mt-4">
                        <summary className="rs-dialog-advanced-summary">Advanced Settings</summary>
                        <div className="pt-2">
                            <label className="rs-dialog-field-label">Discovery Scope</label>
                            <select
                                className="rs-dialog-input"
                                value={config.discovery_scope}
                                onChange={(e) => this.setState({config: {...config, discovery_scope: e.target.value}})}
                            >
                                <option value="link">Link (Same Wi-Fi/LAN)</option>
                                <option value="admin">Admin Boundary</option>
                                <option value="site">Site (Cross-router)</option>
                                <option value="organisation">Organisation</option>
                                <option value="global">Global (IPv6 Multicast)</option>
                            </select>

                            <label className="rs-dialog-field-label mt-2">Network Interfaces</label>
                            <div className="nic-list">
                                {(interfaces?.length == 0) && <>
                                    <div className="inline-hint">Loading...</div>
                                </>}

                                {(interfaces?.length == 0) && <>
                                    {interfaces?.map?.((iface) => (
                                        <label key={iface.name} className="rs-dialog-checkbox-wrap">
                                            <input
                                                type="checkbox"
                                                checked={config.devices.includes(iface.name)}
                                                onChange={(e) => {
                                                    const devices = e.target.checked
                                                        ? [...config.devices, iface.name]
                                                        : config.devices.filter((d) => d !== iface.name);
                                                    this.setState({config: {...config, devices}});
                                                }}
                                            />
                                            <span className="rs-dialog-checkbox-label">
                                                {iface.name} ({iface.addr_v4 || iface.addr_v6_link_local})
                                            </span>
                                        </label>
                                    ))}
                                </>}

                            </div>
                        </div>
                    </details>

                    <div className="bottom-sheet-footer">
                        <button className="rs-dialog-confirm" onClick={this.props.onCancel}>Cancel</button>
                        <button className="rs-dialog-confirm" onClick={() => this.onEnableNetwork()}>
                            Enable
                        </button>
                    </div>
                </div>
            </>
        );
    }
}