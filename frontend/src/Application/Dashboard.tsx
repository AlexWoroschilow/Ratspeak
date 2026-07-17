"use strict";
import React from "react";

interface DashboardProps {
}

interface DashboardState {
}


export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
    }

    render() {

        return <>
            <div className="view active" id="view-dashboard">
                <div className="dashboard-page">
                    <div className="dashboard-page-inner">
                        <div className="dashboard-action-row">
                            <a href={"#messages"} className="dashboard-action-btn" title="New Message">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                                <span>New Message</span>
                            </a>
                            <a href={"#network"} className="dashboard-action-btn" title="Add Connection">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M2 12h20"/>
                                    <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10"/>
                                    <path d="M12 2a15 15 0 0 0-4 10 15 15 0 0 0 4 10"/>
                                </svg>
                                <span>Add Connection</span>
                            </a>
                            <a href={"#announce"} className="dashboard-action-btn" title="Announce">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
                                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4"/>
                                    <circle cx="12" cy="12" r="2"/>
                                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4"/>
                                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>
                                </svg>
                                <span>Announce</span>
                            </a>
                        </div>

                        <div className="panel" id="panel-dashboard-messages">
                            <div className="panel-header">
                                Recent Messages
                                <div className="panel-header-actions">
                                    <a href={"#messages"} className="panel-header-btn" id="dash-view-all-messages" title="View all messages">
                                        <span className="text-xs text-accent">View all</span>
                                    </a>
                                </div>
                            </div>
                            <div className="panel-body p-0">
                                <div id="dashboard-recent-messages">
                                    <div className="empty-state p-12">
                                        <span className="empty-state-primary">No messages yet</span>
                                        <span className="empty-state-hint">Send your first encrypted message</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel" id="panel-dashboard-contacts">
                            <div className="panel-header">
                                Contacts
                                <div className="panel-header-actions">
                                    <button className="panel-header-btn" id="dashboard-contacts-add-btn" title="Add contact">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="12" y1="5" x2="12" y2="19"/>
                                            <line x1="5" y1="12" x2="19" y2="12"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="panel-body p-0">
                                <div className="contacts-list-scroll" id="dashboard-contacts-list">
                                    <div className="empty-state p-10">
                                        <span className="empty-state-primary">No contacts yet</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel" id="panel-dashboard-peers">
                            <div className="panel-header">
                                <div className="dashboard-peers-header-info">
                                    Recent Peers
                                </div>
                                <div className="panel-header-actions">
                                    <a href={"#peers"} className="panel-header-btn" id="dash-view-network" title="View network">
                                        <span className="text-xs text-accent">View all &rarr;</span>
                                    </a>
                                </div>
                            </div>
                            <div className="panel-body dashboard-peers-scroll p-0">
                                <div id="dashboard-peers-list">
                                    <div className="dashboard-peers-empty">Discovering peers...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    }
}
