"use strict";
import React from "react";


import "./Network.scss";
import {inject, observer} from "mobx-react";


import {Interfaces, Network as NetworkStore, NetworkLogStatus} from "../ApplicationStore/Network";
import {Status} from "./Network/Status";
import {IoRadioOutline, IoWifi} from "react-icons/io5";
import {RxServer} from "react-icons/rx";
import {IoIosBluetooth} from "react-icons/io";
import {GoGlobe} from "react-icons/go";
import Internet from "./Network/Internet";

interface NetworkProps {
    network?: NetworkStore;
}

interface NetworkState {
    status?: NetworkLogStatus | undefined;
}


@inject("network")
@observer
export class Network extends React.Component<NetworkProps, NetworkState> {
    constructor(props: NetworkProps) {
        super(props);

        this.state = {}
    }

    render() {

        const {network} = this.props;
        const {tcp_client, tcp_server} = network?.interfaces as Interfaces;
        const tcp = tcp_client?.filter?.((iface: any) => {
            return iface.type == "TCPClientInterface";
        })

        const hosts = tcp_server?.filter?.((iface: any) => {
            return iface.type == "TCPServerInterface";
        })

        return <>

            <div className="view" id="view-network">
                <div className="network-layout">
                    <Status/>
                    <div className="network-main">
                        <nav className="sidebar">
                            <a className={`nav-item active`} title="Internet / TCP">
                                <GoGlobe size={20}/>
                                <span className="nav-label">Internet / TCP ({tcp?.length || 0})</span>
                            </a>
                            <a className={`nav-item`} title="Bluetooth Peer">
                                <IoIosBluetooth size={20}/>
                                <span className="nav-label">Bluetooth Peer</span>
                            </a>
                            <a className={`nav-item`} title="Local Network">
                                <IoWifi size={20}/>
                                <span className="nav-label">Local Network</span>
                            </a>
                            <a className={`nav-item`} title="Radio">
                                <IoRadioOutline size={20}/>
                                <span className="nav-label">Radio</span>
                            </a>
                            <a className={`nav-item`} title="Host">
                                <RxServer size={20}/>
                                <span className="nav-label">Host ({hosts?.length || 0})</span>
                            </a>
                        </nav>
                        <div className={"main-content"}>
                            <Internet/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}
