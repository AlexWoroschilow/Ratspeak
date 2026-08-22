"use strict";
import React from "react";
import {Switcher, SwitchFailed, SwitchSuccessful} from "../components/Switcher";
import {inject, observer} from "mobx-react";
import {Settings as SettingsStore, TransportModeSettings} from "../../ApplicationStore/Settings";

interface NetworkProps {
    settings?: SettingsStore | undefined;
}


interface PrivacyNetwork {
}

@inject("settings")
@observer
export class Network extends React.Component<NetworkProps, PrivacyNetwork> {
    constructor(props: NetworkProps) {
        super(props);
    }


    onChangedTransportMode(mode: string | number): Promise<SwitchSuccessful> {
        const {settings} = this.props;

        return new Promise((resolve: (value: SwitchSuccessful) => void, reject: (reason: SwitchFailed) => void) => {
            settings?.setTransportMode?.(`${mode}`)
                .then((settings: TransportModeSettings) => {
                    return resolve({
                        message: `Successful!`
                    } as SwitchSuccessful);
                })
                .catch((error: any) => {
                    return reject({
                        error: error?.message || `Failed!`
                    } as SwitchFailed);
                });
        });
    }

    render() {

        const {settings} = this.props;
        const {generalSettings} = settings || {};


        return <>
            <section className="settings-detail-pane" aria-labelledby="settings-detail-title">
                <div className="settings-page-inner settings-detail-panels">
                    <div className="panel settings-panel settings-panel-selected" id="panel-settings-network" aria-hidden="false">
                        <div className="panel-header">Network</div>
                        <div className="panel-body">
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Transport Mode</span>
                                    <span className="settings-row-desc">Relay packets for other nodes on the network</span>
                                </div>

                                <Switcher value={generalSettings?.transport_mode} states={[
                                    {name: 'AUTO', value: 'auto'},
                                    {name: 'ON', value: 'on'},
                                    {name: 'OFF', value: 'off'}
                                ]} onChanged={this.onChangedTransportMode.bind(this)}/>
                            </div>
                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Auto-Announce</span>
                                    <span className="settings-row-desc">Periodically announce your presence on the network</span>
                                </div>
                                <button className="selector-badge" id="auto-announce-select">30 min</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    }
}
