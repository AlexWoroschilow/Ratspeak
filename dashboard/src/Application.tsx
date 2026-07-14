"use strict";
import React from "react";

import "./Application.scss";
import {Layout} from "./Application/Layout";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./Application/Dashboard";
import {Messages} from "./Application/Messages";
import {Contacts} from "./Application/Contacts";
import {Identity} from "./Application/Identity";
import {Peers} from "./Application/Peers";
import {Network} from "./Application/Network";
import {Settings} from "./Application/Settings";
import {IdentityImport} from "./Application/IdentityImport";
import {IdentityCreate} from "./Application/IdentityCreate";
import {IdentityHardware} from "./Application/IdentityHardware";

interface ApplicationProps {
}

interface ApplicationState {
}


export class Application extends React.Component<ApplicationProps, ApplicationState> {
    constructor(props: ApplicationProps) {
        super(props);
    }

    render() {

        return <>

            <HashRouter>
                <Routes>
                    <Route element={<Layout/>}>

                        <Route index element={
                            <Dashboard/>
                        }/>

                        <Route path="dashboard" element={
                            <Dashboard/>
                        }/>

                        <Route path="messages" element={
                            <Messages/>
                        }/>

                        <Route path="contacts" element={
                            <Contacts/>
                        }/>

                        <Route path="identity" element={
                            <Identity/>
                        }/>

                        <Route path="identity" element={
                            <Identity/>
                        }/>

                        <Route path="identity-import" element={
                            <IdentityImport/>
                        }/>

                        <Route path="identity-create" element={
                            <IdentityCreate/>
                        }/>

                        <Route path="identity-hardware" element={
                            <IdentityHardware/>
                        }/>

                        <Route path="peers" element={
                            <Peers/>
                        }/>

                        <Route path="network" element={
                            <Network/>
                        }/>

                        <Route path="settings" element={
                            <Settings/>
                        }/>

                        <Route path="*" element={
                            <h3>Not implemented yet</h3>
                        }/>

                    </Route>
                </Routes>
            </HashRouter>
        </>
    }
}
