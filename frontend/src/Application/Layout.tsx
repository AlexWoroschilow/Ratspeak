"use strict";
import React from "react";

import "./Layout.scss";
import {Outlet} from "react-router-dom";
import {FiActivity} from "react-icons/fi";
import {IoGitNetworkOutline, IoKeyOutline} from "react-icons/io5";
import {PiGearSix} from "react-icons/pi";
import {CiGlobe} from "react-icons/ci";
import {LuMessageSquare, LuUsers} from "react-icons/lu";
import {Teaser} from "./Identity/Teaser";
import {inject, observer} from "mobx-react";
import {Settings as SettingsStore} from "../ApplicationStore/Settings";

interface LayoutProps {
    settings?: SettingsStore | undefined;
    children?: React.ReactNode;
}

interface LayoutState {
    location: string;
}

@inject("settings")
@observer
export class Layout extends React.Component<LayoutProps, LayoutState> {
    protected onUpdatedLocationRef?: EventListenerOrEventListenerObject | undefined;

    constructor(props: LayoutProps) {
        super(props);

        this.state = {
            location: window.location.hash || '/'
        }
    }

    onUpdatedLocation() {
        this.setState({
            location: window.location.hash || '/'
        });
    }

    componentDidMount() {
        this.onUpdatedLocationRef = this.onUpdatedLocation.bind(this)
        window.addEventListener('popstate', this.onUpdatedLocationRef);
    }

    componentWillUnmount() {
        (this?.onUpdatedLocationRef != undefined) &&
        (window.removeEventListener('popstate', this.onUpdatedLocationRef));
    }

    isActive(pathPrefix: string) {
        const currentPath = this.state.location;
        if (pathPrefix === '/') return currentPath === '/' || currentPath === '';
        return currentPath.startsWith(pathPrefix);
    }


    render() {
        const {settings} = this.props;
        const {generalSettings} = settings || {};

        return <>

            <div className="app-layout">
                <nav className="sidebar" id="sidebar">
                    <Teaser/>
                    <div className="sidebar-divider"></div>
                    <a className={`nav-item ${this.isActive('#messages') && 'active'}`} href="#messages" title="Messages">
                        <LuMessageSquare size={20}/>
                        <span className="nav-label">Messages</span>
                        <span className="nav-unread-dot" id="nav-unread-dot"></span>
                    </a>
                    <a className={`nav-item ${this.isActive('#contacts') && 'active'}`} href="#contacts" title="Contacts">
                        <LuUsers size={20}/>
                        <span className="nav-label">Contacts</span>
                    </a>
                    <a className={`nav-item ${this.isActive('#peers') && 'active'}`} href="#peers" title="Peers">
                        <CiGlobe size={20}/>
                        <span className="nav-label">Peers</span>
                    </a>
                    <a className={`nav-item ${this.isActive('#network-interfaces') && 'active'}`} href="#network-interfaces" title="Network">
                        <IoGitNetworkOutline size={20}/>
                        <span className="nav-label">Network</span>
                    </a>
                    {generalSettings?.developer_mode && <>
                        <a className={`nav-item ${this.isActive('#network-activity') && 'active'}`} href="#network-activity" title="Activity">
                            <FiActivity size={20}/>
                            <span className="nav-label">Activity</span>
                        </a>
                    </>}
                    <a className={`nav-item ${this.isActive('#identity') && 'active'}`} href="#identity" title="Identity">
                        <IoKeyOutline size={20}/>
                        <span className="nav-label">Identities</span>
                    </a>
                    <a className={`nav-item ${this.isActive('#settings') && 'active'}`} href="#settings" title="Settings">
                        <PiGearSix size={20}/>
                        <span className="nav-label">Settings</span>
                    </a>
                    <div className="sidebar-identity sidebar-identity--profile" id="sidebar-identity" title="Open Identity" role="button" tabIndex={0}>
                        <span className="sidebar-identity-icon" id="sidebar-identity-icon"></span>
                        <div className="sidebar-identity-meta">
                            <div className="sidebar-identity-name" id="sidebar-identity-name"></div>
                            <div className="sidebar-identity-hash" id="sidebar-identity-hash"></div>
                        </div>
                        <svg className="header-identity-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                             strokeLinecap="round"
                             strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </div>
                    <div className="sidebar-footer">
                        <button className="sidebar-collapse-btn" id="sidebar-collapse-btn" title="Collapse sidebar" aria-label="Toggle sidebar">
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="11 17 6 12 11 7"/>
                                <polyline points="18 17 13 12 18 7"/>
                            </svg>
                        </button>
                    </div>
                </nav>

                <div className={"main-content"}>
                    <Outlet/>
                </div>

                {/*    <div class="lxst-call-strip lxst-call-global" id="lxst-call-global" hidden aria-live="polite">*/}
                {/*        <div class="lxst-call-strip-indicator" aria-hidden="true">*/}
                {/*            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">*/}
                {/*                <path*/}
                {/*                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>*/}
                {/*            </svg>*/}
                {/*        </div>*/}
                {/*        <div class="lxst-call-strip-main">*/}
                {/*            <span class="lxst-call-strip-title" id="lxst-call-global-title"></span>*/}
                {/*            <div class="lxst-call-strip-meta">*/}
                {/*                <span class="lxst-call-strip-status" id="lxst-call-global-status"></span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div class="lxst-call-strip-actions">*/}
                {/*            <button class="lxst-call-action lxst-call-action-answer" id="lxst-call-global-answer-btn" type="button" title="Answer call" aria-label="Answer call">*/}
                {/*                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">*/}
                {/*                    <polyline points="16 2 16 8 22 8"/>*/}
                {/*                    <line x1="22" y1="2" x2="16" y2="8"/>*/}
                {/*                    <path*/}
                {/*                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>*/}
                {/*                </svg>*/}
                {/*                <span>Answer</span>*/}
                {/*            </button>*/}
                {/*            <button class="lxst-call-action" id="lxst-call-global-reject-btn" type="button" title="Reject call" aria-label="Reject call">*/}
                {/*                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">*/}
                {/*                    <path*/}
                {/*                        d="M10.1 13.9a16 16 0 0 0 4.21 2.01l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65"/>*/}
                {/*                    <line x1="2" y1="2" x2="22" y2="22"/>*/}
                {/*                </svg>*/}
                {/*                <span>Reject</span>*/}
                {/*            </button>*/}
                {/*            <div class="lxst-call-strip-controls" id="lxst-call-global-controls" hidden>*/}
                {/*                <button class="lxst-call-toggle" id="lxst-call-global-mute-btn" type="button" title="Mute microphone" aria-label="Mute microphone"*/}
                {/*                        aria-pressed="false"></button>*/}
                {/*                <button class="lxst-call-toggle" id="lxst-call-global-speaker-btn" type="button" title="Use speaker" aria-label="Use speaker"*/}
                {/*                        aria-pressed="false"></button>*/}
                {/*            </div>*/}
                {/*            <button class="lxst-call-action lxst-call-action-hangup" id="lxst-call-global-hangup-btn" type="button" title="Hang up" aria-label="Hang up">*/}
                {/*                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">*/}
                {/*                    <path*/}
                {/*                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6.22 6.22l1.21-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92z"/>*/}
                {/*                </svg>*/}
                {/*                <span>Hang up</span>*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                <nav className="bottom-bar" id="bottom-bar" role="navigation" aria-label="Main navigation">
                    <a className="bottom-bar-item active" data-view="peers" role="button" tabIndex={0} aria-label="Peers">
                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                    </a>
                    <a className="bottom-bar-item" data-view="message" role="button" tabIndex={0} aria-label="Messages">
                        <svg viewBox="0 0 24 24">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <span className="bottom-bar-badge" id="bb-unread" aria-hidden="true"></span>
                    </a>
                    <a className="bottom-bar-item" data-view="contacts" role="button" tabIndex={0} aria-label="Contacts">
                        <svg viewBox="0 0 24 24">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </a>
                    <a className="bottom-bar-item bottom-bar-hamburger" id="bottom-bar-hamburger" role="button" tabIndex={0} aria-label="More options">
                        <svg viewBox="0 0 24 24">
                            <line x1="4" y1="6" x2="20" y2="6"/>
                            <line x1="4" y1="12" x2="20" y2="12"/>
                            <line x1="4" y1="18" x2="20" y2="18"/>
                        </svg>
                        <span className="bottom-bar-badge" id="bb-more-unread" aria-hidden="true"></span>
                    </a>
                </nav>

            </div>


        </>
    }
}
