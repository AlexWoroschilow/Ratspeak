"use strict";
import React from "react";
import {GoGlobe} from "react-icons/go";
import {IoGitNetworkOutline, IoStopOutline} from "react-icons/io5";
import {VscDebugConnected, VscDebugDisconnect, VscDebugDisconnectCompact, VscDebugStart} from "react-icons/vsc";
import "./Internet.scss";
import {PiLinkBreak, PiLinkBreakLight, PiLinkBreakThin, PiPlugsConnected, PiPlugsConnectedBold, PiPlugsConnectedLight} from "react-icons/pi";
import {CiPlay1} from "react-icons/ci";
import {IoMdClose} from "react-icons/io";
import {AiOutlineDisconnect} from "react-icons/ai";
import {RxLinkBreak1, RxLinkBreak2} from "react-icons/rx";
import {BallTriangle} from "react-loader-spinner";

interface InternetProps {
}

interface InternetState {
    servers: Array<{
        id?: string;
        name?: string;
        host?: string;
        port?: number,
        tone?: string;
        mark_icon?: string;
        mark?: string;
        tags?: Array<string>;
        aliases?: Array<{
            host: string;
            port: number,
        }>
    }>
}

class Internet extends React.Component<InternetProps, InternetState> {
    constructor(props: InternetProps) {
        super(props);

        this.state = {
            servers: [
                {
                    id: 'ratspeak-ruby',
                    name: 'Ruby',
                    host: '1.ratspeak.org',
                    port: 4141,
                    tone: 'ruby',
                    mark_icon: 'gem',
                    tags: ['OFFICIAL']
                },
                {
                    id: 'ratspeak-emerald',
                    name: 'Emerald',
                    host: '2.ratspeak.org',
                    port: 4242,
                    tone: 'emerald',
                    mark_icon: 'gem',
                    tags: ['OFFICIAL'],
                    aliases: [
                        {
                            host: 'rns.ratspeak.org',
                            port: 4242
                        }
                    ]
                },
                {
                    id: 'ratspeak-diamond',
                    name: 'Diamond',
                    host: '3.ratspeak.org',
                    port: 4343,
                    tone: 'diamond',
                    mark_icon: 'gem',
                    tags: ['OFFICIAL']
                },
                {
                    id: 'beleth',
                    name: 'Beleth',
                    host: 'rns.beleth.net',
                    port: 4242,
                    tone: 'beleth',
                    mark: 'B',
                    tags: ['UNOFFICIAL']
                },
                {
                    id: 'rmap',
                    name: 'RMAP',
                    host: 'rmap.world',
                    port: 4242,
                    tone: 'rmap',
                    mark: 'R',
                    tags: ['UNOFFICIAL']
                }
            ]
        }
    }

    render() {

        const {servers} = this.state;

        return <>
            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="tcp">
                    <GoGlobe size={20}/>
                    <span className="bottom-sheet-title-label">
                        Public Network
                    </span>
                </div>
            </div>
            <div className="bottom-sheet-body">
                <div className="connect-tab-panel active" id="connect-public-panel" role="tabpanel" aria-labelledby="connect-tab-public">
                    <div className="public-server-list" id="public-server-list">
                        {servers?.map?.((server) => (
                            <button type="button" className={`public-server-card public-server-card--${server.tone}`} aria-label="Connect Ruby" title="Connect Ruby">
                            <span className="public-server-mark">
                                <VscDebugDisconnect size={20}/>
                                {/*<PiPlugsConnectedLight size={20}/>*/}
                            </span>
                                <span className="public-server-main">
                                    <span className="public-server-name">
                                        {server.name}</span>
                                    <span className="public-server-tags">
                                        {server?.tags?.map?.((tag: string) => (
                                            <span className="public-server-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </span>
                                </span>
                                <span className="public-server-action">
                                    <label className="prop-toggle activity-toggle">
                                        <input type="checkbox" data-server={server.id} checked={true}/>
                                        <span className="prop-slider"></span>
                                    </label>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="tcp">
                    <IoGitNetworkOutline size={20}/>
                    <span className="bottom-sheet-title-label">
                        Custom Network
                    </span>
                </div>
            </div>
            <div className="bottom-sheet-body">
                <div className="connect-tab-panel active" id="connect-custom-panel" role="tabpanel" aria-labelledby="connect-tab-custom">
                    <div className="modal-field" id="connect-quick-field">
                        <div className="quick-connect-options" id="quick-connect-list">
                            <div id="qc-empty" className="inline-hint" style={{padding: "8px 0"}}>No saved custom connections. Connect to a node below to save it here.</div>
                        </div>
                    </div>
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
                    <div className="modal-field" id="connect-name-field" style={{display: "none"}}>
                        <label>Name</label>
                        <input type="text" id="connect-name" className="modal-input" placeholder="Ratspeak Hub" maxLength={32} autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"/>
                    </div>
                    <label className="rs-dialog-checkbox-wrap mt-4" id="connect-backbone-row" style={{display: "none"}}>
                        <input type="checkbox" id="connect-use-backbone" className="rs-dialog-checkbox"/>
                        <span className="rs-dialog-checkbox-label">Experimental: Use Backbone</span>
                    </label>
                    <label className="rs-dialog-checkbox-wrap mt-4" id="connect-ifac-row" style={{display: "none"}}>
                        <input type="checkbox" id="connect-use-ifac" className="rs-dialog-checkbox" data-bound="1"/>
                        <span className="rs-dialog-checkbox-label">Use IFAC</span>
                    </label>
                    <div id="connect-ifac-fields" style={{display: "none"}}>
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
            </div>


            <div className="bottom-sheet-footer">
                <button className="rs-dialog-confirm">Connect</button>
            </div>
        </>
    }
}

export default Internet
