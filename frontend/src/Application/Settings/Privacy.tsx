"use strict";
import React from "react";
import {Switcher, SwitchFailed, SwitchSuccessful} from "../components/Switcher";
import {inject, observer} from "mobx-react";
import {HapticsSettings, Settings as SettingsStore} from "../../ApplicationStore/Settings";
import {info} from "@tauri-apps/plugin-log";

interface PrivacyProps {
    settings?: SettingsStore | undefined;
}

interface PrivacyState {
}

@inject("settings")
@observer
export class Privacy extends React.Component<PrivacyProps, PrivacyState> {
    constructor(props: PrivacyProps) {
        super(props);
    }


    onChangedHosting(enabled: string | number): Promise<SwitchSuccessful> {
        const {settings} = this.props;

        return new Promise((resolve: (value: SwitchSuccessful) => void, reject: (reason: SwitchFailed) => void) => {
            settings?.setHostingEnabled?.(enabled == 1)
                .then((settings: any) => {
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


    onChangedAnnounce(enabled: string | number): Promise<SwitchSuccessful> {
        const {settings} = this.props;

        return new Promise((resolve: (value: SwitchSuccessful) => void, reject: (reason: SwitchFailed) => void) => {
            settings?.setHostingStampSettings?.(enabled == 1)
                .then((settings: any) => {
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

    render() {
        const {settings} = this.props;
        const {general} = settings || {};

        return <>
            <section className="settings-detail-pane" aria-labelledby="settings-detail-title">
                <div className="settings-page-inner settings-detail-panels">


                    <div className="panel settings-panel settings-panel-selected" id="panel-settings-privacy" aria-hidden="false">
                        <div className="panel-header">Privacy</div>
                        <div className="panel-body">
                            <div className="settings-row" style={{borderBottom: "none"}}>
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Announce Ratspeak usage</span>
                                    <span className="settings-row-desc">Let others know you support games, calls, and extra features.</span>
                                </div>
                                <Switcher value={general?.announce_ratspeak_usage ? 1 : 0} onChanged={this.onChangedAnnounce.bind(this)}/>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    }
}
