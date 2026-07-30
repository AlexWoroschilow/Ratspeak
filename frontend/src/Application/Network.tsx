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
import Tcp from "./Network/Tcp";
import Local from "./Network/Local";
import Bluetooth from "./Network/Bluetooth";
import Radio from "./Network/Radio";
import Host from "./Network/Host";

interface NetworkProps {
    network?: NetworkStore;
}

interface NetworkState {
    status?: NetworkLogStatus | undefined;
    screen: "tcp" | "bluetooth" | "local" | "radio" | "host";
}

type Screen = NetworkState['screen']

@inject("network")
@observer
export class Network extends React.Component<NetworkProps, NetworkState> {
    constructor(props: NetworkProps) {
        super(props);

        this.state = {
            screen: "tcp"
        }
    }

    route(screen: Screen) {
        this.setState({
            screen: screen
        })
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
                            <a className={`nav-item ${this.state.screen == "tcp" && "active"}`} title="Internet / TCP"
                               onClick={() => this.route("tcp")}>
                                <GoGlobe size={20}/>
                                <span className="nav-label">Internet / TCP ({tcp?.length || 0})</span>
                            </a>
                            <a className={`nav-item ${this.state.screen == "bluetooth" && "active"}`} title="Bluetooth Peer"
                               onClick={() => this.route("bluetooth")}>
                                <IoIosBluetooth size={20}/>
                                <span className="nav-label">Bluetooth Peer</span>
                            </a>
                            <a className={`nav-item ${this.state.screen == "local" && "active"}`} title="Local Network"
                               onClick={() => this.route("local")}>
                                <IoWifi size={20}/>
                                <span className="nav-label">Local Network</span>
                            </a>
                            <a className={`nav-item ${this.state.screen == "radio" && "active"}`} title="Radio"
                               onClick={() => this.route("radio")}>
                                <IoRadioOutline size={20}/>
                                <span className="nav-label">Radio</span>
                            </a>
                            <a className={`nav-item ${this.state.screen == "host" && "active"}`} title="Host"
                               onClick={() => this.route("host")}>
                                <RxServer size={20}/>
                                <span className="nav-label">Host ({hosts?.length || 0})</span>
                            </a>
                        </nav>
                        <div className={"main-content"}>
                            {this?.state?.screen == "tcp" && <Tcp/>}
                            {this?.state?.screen == "local" && <Local/>}
                            {this?.state?.screen == "bluetooth" && <Bluetooth/>}
                            {this?.state?.screen == "radio" && <Radio/>}
                            {this?.state?.screen == "host" && <Host/>}


                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}
