"use strict";
import React from "react";
import {inject, Provider} from "mobx-react";
import {info,} from '@tauri-apps/plugin-log';

import {Layout} from "./Application/Layout";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./Application/Dashboard";
import {Messages} from "./Application/Messages";
import {Contacts} from "./Application/Contacts";
import {Identity} from "./Application/Identity";

const Peers = React.lazy(() => import("./Application/Peers"));

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
import {ApplicationStore, store, network, peers} from "./ApplicationStore";

import "./Application.scss";

interface ApplicationProps {
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
            <Provider store={store} network={network} peers={peers}>
                <HashRouter>
                    <Routes>
                        <Route element={<Layout/>}>


                            {(this?.state?.isSetupRequired === true) && <>
                                <Route index element={<Setup/>}/>
                            </>}

                            {(this?.state?.isSetupRequired === false) && <>
                                <Route index element={<Dashboard/>}/>
                                <Route path="setup" element={<Setup/>}/>
                                <Route path="dashboard" element={<Dashboard/>}/>
                                <Route path="messages" element={<Messages/>}/>
                                <Route path="contacts" element={<Contacts/>}/>
                                <Route path="identity" element={<Identity/>}/>
                                <Route path="identity" element={<Identity/>}/>
                                <Route path="identity-import" element={<IdentityImport/>}/>
                                <Route path="identity-create" element={<IdentityCreate/>}/>
                                <Route path="identity-hardware" element={<IdentityHardware/>}/>
                                <Route path="peers" element={
                                    <React.Suspense fallback={<div className="peers-row-loading">Loading...</div>}>
                                        <Peers/>
                                    </React.Suspense>
                                }/>
                                <Route path="network" element={<Network/>}/>
                                <Route path="network-internet" element={<NetworkInternet/>}/>
                                <Route path="network-bluetooth" element={<NetworkBluetooth/>}/>
                                <Route path="network-local" element={<NetworkLocal/>}/>
                                <Route path="network-radio" element={<NetworkRadio/>}/>
                                <Route path="network-host" element={<NetworkHost/>}/>
                                <Route path="settings" element={<Settings/>}/>
                            </>}

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
