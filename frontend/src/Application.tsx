"use strict";
import React from "react";
import {inject, observer, Provider} from "mobx-react";

import {Layout} from "./Application/Layout";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Messages} from "./Application/Messages";
import {Contacts} from "./Application/Contacts";
import {Identity} from "./Application/Identity";
import {Network} from "./Application/Network";
import {Settings} from "./Application/Settings";
import {IdentityImport} from "./Application/IdentityImport";
import {IdentityCreate} from "./Application/IdentityCreate";
import {IdentityHardware} from "./Application/IdentityHardware";
import {NetworkInternet} from "./Application/NetworkInternet";
import {NetworkBluetooth} from "./Application/NetworkBluetooth";
import {NetworkLocal} from "./Application/NetworkLocal";
import {NetworkRadio} from "./Application/NetworkRadio";
import {NetworkHost} from "./Application/NetworkHost";
import {Setup} from "./Application/Setup";
import {Peers} from "./Application/Peers";
import {
    contacts,
    identity,
    messages,
    network,
    peers,
    settings,
    store
} from "./ApplicationStore";

import "./Application.scss";
import {NetworkActivity} from "./Application/NetworkActivity";
import {IdentityShare} from "./Application/IdentityShare";
import {Settings as SettingsStore} from "./ApplicationStore/Settings";


interface ApplicationProps {
    settings?: SettingsStore | undefined;
}

interface ApplicationState {
    isSetupRequired?: boolean;
    error?: string;
}

export class Application extends React.Component<ApplicationProps, ApplicationState> {

    constructor(props: ApplicationProps) {
        super(props);

        this.state = {
            isSetupRequired: undefined,
            error: undefined,
        }
    }

    componentDidMount() {
        store?.isSetupRequired()
            .then((response: boolean) => {
                return this.setState({
                    isSetupRequired: response
                });

            })
            .catch((error) => {
                return this.setState({
                    error: error
                });
            });

        return this.setState({
            error: undefined
        });
    }

    render() {

        return <>
            <Provider
                store={store}
                network={network}
                peers={peers}
                contacts={contacts}
                identity={identity}
                messages={messages}
                settings={settings}>

                <HashRouter>
                    <Routes>
                        <Route element={<Layout/>}>


                            {(this?.state?.isSetupRequired === true) && <>
                                <Route index element={<Setup/>}/>
                            </>}

                            {/*{(this?.state?.isSetupRequired === false) && <>*/}
                            <Route index element={<Messages/>}/>
                            <Route path="setup" element={<Setup/>}/>
                            <Route path="messages" element={<Messages/>}/>
                            <Route path="contacts" element={<Contacts/>}/>
                            <Route path="identity" element={<Identity/>}/>
                            <Route path="identity" element={<Identity/>}/>
                            <Route path="peers" element={<Peers/>}/>
                            <Route path="identity-import" element={<IdentityImport/>}/>
                            <Route path="identity-create" element={<IdentityCreate/>}/>
                            <Route path="identity-hardware" element={<IdentityHardware/>}/>
                            <Route path="identity-share/:hash" element={<IdentityShare/>}/>
                            <Route path="network-interfaces" element={<Network/>}/>
                            <Route path="network-activity" element={<NetworkActivity/>}/>
                            <Route path="network-internet" element={<NetworkInternet/>}/>
                            <Route path="network-bluetooth" element={<NetworkBluetooth/>}/>
                            <Route path="network-local" element={<NetworkLocal/>}/>
                            <Route path="network-radio" element={<NetworkRadio/>}/>
                            <Route path="network-host" element={<NetworkHost/>}/>
                            <Route path="settings" element={<Settings/>}/>
                            {/*</>}*/}

                            <Route path="*" element={
                                <h3>{`!!!${this?.state?.error}`}</h3>
                            }/>

                        </Route>
                    </Routes>
                </HashRouter>
            </Provider>
        </>
    }
}
