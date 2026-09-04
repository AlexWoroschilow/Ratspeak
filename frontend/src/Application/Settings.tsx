"use strict";
import React from "react";
import {General} from "./Settings/General";
import {Inbox} from "./Settings/Inbox";
import {Privacy} from "./Settings/Privacy";
import {Network} from "./Settings/Network";
import {Status} from "./Settings/Status";
import "./Settings.scss";
import {MdOutlinePrivacyTip} from "react-icons/md";
import {IoSettingsOutline} from "react-icons/io5";
import {IoIosGitNetwork} from "react-icons/io";
import {CiMail, CiServer} from "react-icons/ci";
import {Reset} from "./Settings/Reset";
import {RxReset} from "react-icons/rx";
import {InboxHost} from "./Settings/InboxHost";

interface SettingsProps {
}


interface SettingsState {
    screen: "general" | "inbox" | "reset" | "privacy" | "network" | "inboxHost";
}

type Screen = SettingsState['screen']

export class Settings extends React.Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps) {
        super(props);

        this.state = {
            screen: "general"
        }
    }


    route(screen: Screen) {
        this.setState({
            screen: screen
        })
    }

    render() {

        return <div className={"Settings"}>

            <div className="view">
                <div className="network-layout">
                    <Status/>
                    <div className="network-main">
                        <nav className="scrollable">
                            <a className={`peers-row ${this.state.screen == "general" && "selected"}`} title="General"
                               onClick={() => this.route("general")}>
                                <IoSettingsOutline size={20}/>
                                <span className="nav-label">General</span>
                                <span className="settings-nav-desc">Theme, vibration, notifications, and blocks</span>
                            </a>
                            <a className={`peers-row ${this.state.screen == "privacy" && "selected"}`} title="Privacy"
                               onClick={() => this.route("privacy")}>
                                <MdOutlinePrivacyTip size={20}/>
                                <span className="nav-label">Privacy</span>
                                <span className="settings-nav-desc">Privacy related preferences</span>
                            </a>
                            <a className={`peers-row ${this.state.screen == "network" && "selected"}`} title="Network"
                               onClick={() => this.route("network")}>
                                <IoIosGitNetwork size={20}/>
                                <span className="nav-label">Network</span>
                                <span className="settings-nav-desc">Transport behavior and announce cadence</span>
                            </a>
                            <a className={`peers-row ${this.state.screen == "inbox" && "selected"}`} title="Offline Inbox"
                               onClick={() => this.route("inbox")}>
                                <CiMail size={20}/>
                                <span className="nav-label">Offline inbox</span>
                                <span className="settings-nav-desc">Offline message storage and relay status</span>
                            </a>
                            <a className={`peers-row ${this.state.screen == "inboxHost" && "selected"}`} title="Offline Inbox"
                               onClick={() => this.route("inboxHost")}>
                                <CiServer size={20}/>
                                <span className="nav-label">Hosted inbox</span>
                                <span className="settings-nav-desc">Offline message storage and relay status</span>
                            </a>
                            <a className={`peers-row ${this.state.screen == "reset" && "selected"}`} title="Offline Inbox"
                               onClick={() => this.route("reset")}>
                                <RxReset size={20}/>
                                <span className="nav-label">Reset</span>
                                <span className="settings-nav-desc">Reset cahge, messages, contacts and other data</span>
                            </a>

                        </nav>
                        <div className={"main-content"}>
                            {this?.state?.screen == "general" && <General/>}
                            {this?.state?.screen == "inbox" && <Inbox/>}
                            {this?.state?.screen == "inboxHost" && <InboxHost/>}
                            {this?.state?.screen == "privacy" && <Privacy/>}
                            {this?.state?.screen == "network" && <Network/>}
                            {this?.state?.screen == "reset" && <Reset/>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
