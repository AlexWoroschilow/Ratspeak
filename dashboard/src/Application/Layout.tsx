"use strict";
import React from "react";

import "./Layout.scss";
import {Outlet} from "react-router-dom";

interface LayoutProps {
    children?: React.ReactNode;
}

interface LayoutState {
    location: string;
}


export class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props: LayoutProps) {
        super(props);

        this.state = {
            location: window.location.hash || '/'
        }
    }

    isActive(pathPrefix) {
        const currentPath = this.state.location;
        if (pathPrefix === '/') return currentPath === '/' || currentPath === '';
        return currentPath.startsWith(pathPrefix);
    }


    render() {

        return <>

            <div className="header">
                <div className="header-left">
                    <button className="hamburger-btn" id="hamburger-btn" aria-label="Toggle menu">
                        <svg width="25" height="25" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                            <line x1="3" y1="5" x2="17" y2="5"/>
                            <line x1="3" y1="10" x2="17" y2="10"/>
                            <line x1="3" y1="15" x2="17" y2="15"/>
                        </svg>
                    </button>
                    <svg className="header-logo-icon" viewBox="243 243 282 282" fill="var(--accent)" width="25" height="25">
                        <path
                            d="M327.97,501.16C314.61,508.03 301.57,514.72 288.56,521.48C283.91,523.91 279.2,524.61 275.05,520.98C271.05,517.49 271.26,512.87 272.63,508.05C275.23,498.93 277.46,489.7 280.08,480.58C281.03,477.27 280.4,475.51 277.14,473.92C255.84,463.53 245.61,446.29 245.66,422.66C245.75,381.16 245.55,339.66 245.75,298.16C245.86,275.62 256.63,259.57 276.93,249.98C283.68,246.79 291.07,246.01 298.4,246C355.74,245.88 413.07,245.83 470.4,245.95C495.22,246.01 516.64,265.69 519.52,290.03C520.6,299.2 520.12,308.32 520.21,317.46C520.37,333.46 520.29,349.46 520.2,365.46C520.17,371.38 518.89,372.03 513.77,369.13C498.9,360.71 498.91,360.71 498.9,343.65C498.88,328.81 498.92,313.98 498.81,299.15C498.66,279.74 486.18,267.28 466.77,267.26C410.94,267.23 355.11,267.23 299.27,267.32C279.54,267.35 267.32,279.36 267.23,299.05C267.05,340.71 267.04,382.38 267.09,424.04C267.11,441.62 277.67,453.85 295.43,456.58C310.83,458.95 307.84,458.98 304.51,471.32C303.3,475.82 302.05,480.31 300.83,484.81C300.35,486.56 299.66,488.32 300.92,490.33C304.48,490.2 307.24,487.87 310.31,486.46C314.99,484.3 319.61,481.95 324.04,479.31C328.78,476.49 333.17,476.59 338.23,478.73C355.38,485.99 373.44,488.84 391.95,487.72C430.98,485.37 461.99,468.13 484.6,436.22C489.79,428.9 493.71,420.74 496.43,412.08C497.17,409.7 496.94,408 494.74,406.52C489.6,403.07 487.33,398.05 487.7,391.96C487.91,388.37 486.58,386.13 483.49,384.24C461.58,370.79 438.6,360.13 412.77,356.87C403.65,355.71 394.49,355.67 385.35,356.73C376.09,357.8 372.64,358.02 369.74,347.74C368.12,341.98 365.71,336.47 362.24,331.47C356.28,322.9 346.68,319.02 337.45,321.63C328.92,324.05 321.83,333.47 321.32,343.14C320.63,356 327.03,371.92 346.66,374.88C350.07,375.39 352.59,376.98 353.16,380.74C353.7,384.21 352.02,386.53 349.33,388.25C347.4,389.48 345.13,389.39 343,389.01C325.7,385.88 313.84,376.01 308.73,359.24C303.68,342.67 306.62,327.49 319.94,315.42C336.41,300.5 361.24,303.86 373.4,322.51C376.14,326.7 378.7,331.06 380.19,335.83C381.41,339.73 383.56,341.03 387.54,340.77C406.5,339.53 425.15,341.26 443.29,347.18C469.21,355.64 492.63,368.82 514.47,384.97C521.5,390.18 521.02,397.62 519.75,405.01C515.1,432.25 501.28,454.4 481.02,472.62C460.48,491.09 436.54,502.92 409.2,507.52C385.77,511.46 362.77,509.7 340.18,502.3C336.39,501.06 332.58,498.31 327.97,501.16z"/>
                        <path
                            d="M414.19,335.38C405.75,335.93 397.65,334.86 389.54,335.84C387,336.15 385.78,334.06 384.8,332.07C380.73,323.83 376.21,315.95 368.77,310.17C366.48,308.38 367.23,307 369.43,305.62C379.53,299.3 389.62,299.22 399.19,306.49C408.52,313.58 414.08,323.09 414.19,335.38z"/>
                        <path
                            d="M417.09,390.21C410.66,388.78 407.34,384.6 408.1,379.44C408.81,374.6 413.31,370.91 418.31,371.05C423.12,371.19 426.94,375.02 427.27,380C427.63,385.61 424.18,389.22 417.09,390.21z"/>
                        <path
                            d="M430.83,418.71C429.47,419.23 428.59,420.25 427.03,419.59C426.81,417.6 428.52,416.83 429.77,416.07C441.62,408.88 453.85,402.56 467.79,400.42C469.45,400.16 471.08,399.82 472.69,400.53C474.42,401.28 475.23,402.66 475.09,404.49C474.92,406.75 473.27,407.6 471.34,407.79C465.71,408.35 460.12,409.05 454.59,410.3C446.44,412.13 438.57,414.68 430.83,418.71z"/>
                        <path
                            d="M448.63,432.62C455.17,424.82 461.54,417.3 470.21,412.35C473.17,410.66 477.33,407.48 479.7,412.18C482.09,416.9 476.91,417.67 473.97,418.99C464.9,423.07 457.39,429.35 449.85,435.63C448.67,436.61 447.95,438.42 445.79,438.04C445.62,435.72 447.39,434.49 448.63,432.62z"/>
                    </svg>
                    <h1>Ratspeak</h1>
                    <div className="header-mobile-identity" id="header-mobile-identity" title="Share contact card" role="button" tabIndex={0} aria-label="Share your contact card">
                        <div className="header-mobile-avatar" id="header-mobile-avatar"></div>
                        <div className="header-mobile-info">
                            <span className="header-mobile-name" id="header-mobile-name"></span>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <button className="header-identity-pill hidden" id="header-identity-pill" title="Share contact card" aria-label="Share your contact card">
                        <span className="header-identity-icon" id="header-identity-icon"></span>
                        <span className="header-identity-hash" id="header-identity-hash"></span>
                    </button>
                </div>
            </div>

            <div className="app-layout">
                <nav className="sidebar" id="sidebar">
                    <button className="sidebar-close-btn" id="sidebar-close-btn" aria-label="Close menu">&times;</button>
                    <div className="sidebar-brand">
                        <svg className="sidebar-brand-logo" viewBox="243 243 282 282" fill="var(--accent)" width="20" height="20">
                            <path
                                d="M327.97,501.16C314.61,508.03 301.57,514.72 288.56,521.48C283.91,523.91 279.2,524.61 275.05,520.98C271.05,517.49 271.26,512.87 272.63,508.05C275.23,498.93 277.46,489.7 280.08,480.58C281.03,477.27 280.4,475.51 277.14,473.92C255.84,463.53 245.61,446.29 245.66,422.66C245.75,381.16 245.55,339.66 245.75,298.16C245.86,275.62 256.63,259.57 276.93,249.98C283.68,246.79 291.07,246.01 298.4,246C355.74,245.88 413.07,245.83 470.4,245.95C495.22,246.01 516.64,265.69 519.52,290.03C520.6,299.2 520.12,308.32 520.21,317.46C520.37,333.46 520.29,349.46 520.2,365.46C520.17,371.38 518.89,372.03 513.77,369.13C498.9,360.71 498.91,360.71 498.9,343.65C498.88,328.81 498.92,313.98 498.81,299.15C498.66,279.74 486.18,267.28 466.77,267.26C410.94,267.23 355.11,267.23 299.27,267.32C279.54,267.35 267.32,279.36 267.23,299.05C267.05,340.71 267.04,382.38 267.09,424.04C267.11,441.62 277.67,453.85 295.43,456.58C310.83,458.95 307.84,458.98 304.51,471.32C303.3,475.82 302.05,480.31 300.83,484.81C300.35,486.56 299.66,488.32 300.92,490.33C304.48,490.2 307.24,487.87 310.31,486.46C314.99,484.3 319.61,481.95 324.04,479.31C328.78,476.49 333.17,476.59 338.23,478.73C355.38,485.99 373.44,488.84 391.95,487.72C430.98,485.37 461.99,468.13 484.6,436.22C489.79,428.9 493.71,420.74 496.43,412.08C497.17,409.7 496.94,408 494.74,406.52C489.6,403.07 487.33,398.05 487.7,391.96C487.91,388.37 486.58,386.13 483.49,384.24C461.58,370.79 438.6,360.13 412.77,356.87C403.65,355.71 394.49,355.67 385.35,356.73C376.09,357.8 372.64,358.02 369.74,347.74C368.12,341.98 365.71,336.47 362.24,331.47C356.28,322.9 346.68,319.02 337.45,321.63C328.92,324.05 321.83,333.47 321.32,343.14C320.63,356 327.03,371.92 346.66,374.88C350.07,375.39 352.59,376.98 353.16,380.74C353.7,384.21 352.02,386.53 349.33,388.25C347.4,389.48 345.13,389.39 343,389.01C325.7,385.88 313.84,376.01 308.73,359.24C303.68,342.67 306.62,327.49 319.94,315.42C336.41,300.5 361.24,303.86 373.4,322.51C376.14,326.7 378.7,331.06 380.19,335.83C381.41,339.73 383.56,341.03 387.54,340.77C406.5,339.53 425.15,341.26 443.29,347.18C469.21,355.64 492.63,368.82 514.47,384.97C521.5,390.18 521.02,397.62 519.75,405.01C515.1,432.25 501.28,454.4 481.02,472.62C460.48,491.09 436.54,502.92 409.2,507.52C385.77,511.46 362.77,509.7 340.18,502.3C336.39,501.06 332.58,498.31 327.97,501.16z"/>
                            <path
                                d="M414.19,335.38C405.75,335.93 397.65,334.86 389.54,335.84C387,336.15 385.78,334.06 384.8,332.07C380.73,323.83 376.21,315.95 368.77,310.17C366.48,308.38 367.23,307 369.43,305.62C379.53,299.3 389.62,299.22 399.19,306.49C408.52,313.58 414.08,323.09 414.19,335.38z"/>
                            <path
                                d="M417.09,390.21C410.66,388.78 407.34,384.6 408.1,379.44C408.81,374.6 413.31,370.91 418.31,371.05C423.12,371.19 426.94,375.02 427.27,380C427.63,385.61 424.18,389.22 417.09,390.21z"/>
                            <path
                                d="M430.83,418.71C429.47,419.23 428.59,420.25 427.03,419.59C426.81,417.6 428.52,416.83 429.77,416.07C441.62,408.88 453.85,402.56 467.79,400.42C469.45,400.16 471.08,399.82 472.69,400.53C474.42,401.28 475.23,402.66 475.09,404.49C474.92,406.75 473.27,407.6 471.34,407.79C465.71,408.35 460.12,409.05 454.59,410.3C446.44,412.13 438.57,414.68 430.83,418.71z"/>
                            <path
                                d="M448.63,432.62C455.17,424.82 461.54,417.3 470.21,412.35C473.17,410.66 477.33,407.48 479.7,412.18C482.09,416.9 476.91,417.67 473.97,418.99C464.9,423.07 457.39,429.35 449.85,435.63C448.67,436.61 447.95,438.42 445.79,438.04C445.62,435.72 447.39,434.49 448.63,432.62z"/>
                        </svg>
                        <span className="sidebar-brand-text">Ratspeak</span>
                    </div>
                    <div className="sidebar-divider"></div>
                    <a className={`nav-item ${this.isActive('#dashboard') && 'active'}`} data-view="dashboard" href="#dashboard" title="Home">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                        <span className="nav-label">Home</span>
                    </a>
                    <a className={`nav-item ${this.isActive('#messages') && 'active'}`} data-view="message" href="#messages" title="Messages">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <span className="nav-label">Messages</span>
                        <span className="nav-unread-dot" id="nav-unread-dot" style={{display: "none"}}></span>
                    </a>
                    <a className={`nav-item ${this.isActive('#contacts') && 'active'}`} data-view="contacts" href="#contacts" title="Contacts">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span className="nav-label">Contacts</span>
                    </a>
                    <a className="nav-item" data-view="identity" href="#identity" title="Identity">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path
                                d="M2.6 17.4A2 2 0 0 0 2 18.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8A6.5 6.5 0 1 0 9.4 10.6z"/>
                            <circle cx="16.5" cy="7.5" r="1.5"/>
                        </svg>
                        <span className="nav-label">Identity</span>
                    </a>
                    <a className="nav-item" data-view="peers" href="#peers" title="Peers">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        <span className="nav-label">Peers</span>
                    </a>
                    <a className="nav-item" data-view="network" href="#network" title="Network">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="6" height="6" rx="1"/>
                            <rect x="16" y="2" width="6" height="6" rx="1"/>
                            <rect x="9" y="16" width="6" height="6" rx="1"/>
                            <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/>
                            <line x1="12" y1="13" x2="12" y2="16"/>
                        </svg>
                        <span className="nav-label">Network</span>
                    </a>
                    <a className="nav-item" data-view="settings" href="#settings" title="Settings">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"/>
                            <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                        </svg>
                        <span className="nav-label">Settings</span>
                    </a>
                    <div className="sidebar-identity sidebar-identity--profile" id="sidebar-identity" title="Open Identity" role="button" tabIndex={0}>
                        <span className="sidebar-identity-icon" id="sidebar-identity-icon"></span>
                        <div className="sidebar-identity-meta">
                            <div className="sidebar-identity-name" id="sidebar-identity-name"></div>
                            <div className="sidebar-identity-hash" id="sidebar-identity-hash"></div>
                        </div>
                        <svg className="header-identity-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
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
