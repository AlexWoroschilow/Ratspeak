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

interface ServerAddProps {
    network?: NetworkStore;
}

interface ServerAddState {
    error?: {
        code: string;
        message: string
    } | undefined;
}

@inject("network")
@observer
export class ServerAdd extends React.Component<ServerAddProps, ServerAddState> {
    constructor(props: ServerAddProps) {
        super(props);

        this.state = {}
    }

    render() {

        const {network} = this.props;

        return <>
            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="tcp">
                    <IoGitNetworkOutline size={20}/>
                    <span className="bottom-sheet-title-label">
                        Connect to the Network
                    </span>
                </div>
            </div>

            <div className="bottom-sheet-body">
                <div className="connect-tab-panel active" id="connect-custom-panel" role="tabpanel" aria-labelledby="connect-tab-custom">
                    <div className="modal-field">
                        <label>Host</label>
                        <input type="text" id="connect-host" className="modal-input" placeholder="e.g. rns.ratspeak.org" autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"/>
                    </div>
                    <div className="modal-field">
                        <label>Port</label>
                        <input type="number" id="connect-port" className="modal-input" placeholder="4242" min="1" max="65535" autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"/>
                    </div>
                    <div className="modal-field" id="connect-name-field">
                        <label>Name</label>
                        <input type="text" id="connect-name" className="modal-input" placeholder="Ratspeak Hub" maxLength={32} autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"/>
                    </div>
                    <label className="rs-dialog-checkbox-wrap mt-4" id="connect-backbone-row">
                        <input type="checkbox" id="connect-use-backbone" className="rs-dialog-checkbox"/>
                        <span className="rs-dialog-checkbox-label">Experimental: Use Backbone</span>
                    </label>
                    <label className="rs-dialog-checkbox-wrap mt-4" id="connect-ifac-row">
                        <input type="checkbox" id="connect-use-ifac" className="rs-dialog-checkbox" data-bound="1"/>
                        <span className="rs-dialog-checkbox-label">Use IFAC</span>
                    </label>
                    <div id="connect-ifac-fields">
                        <div className="modal-field">
                            <label>IFAC Network Name</label>
                            <input type="text" id="connect-ifac-network-name" className="modal-input" placeholder="Optional" maxLength={128} autoCorrect="off"
                                   autoCapitalize="none" spellCheck="false"/>
                        </div>
                        <div className="modal-field">
                            <label>IFAC Passphrase</label>
                            <input type="password" id="connect-ifac-passphrase" className="modal-input" placeholder="Required for most IFAC networks" maxLength={256}
                                   autoCorrect="off" autoCapitalize="none" spellCheck="false"/>
                        </div>
                    </div>
                </div>
                <div className="bottom-sheet-footer">
                    <button className="rs-dialog-confirm">Connect</button>
                </div>
            </div>
        </>
    }
}

