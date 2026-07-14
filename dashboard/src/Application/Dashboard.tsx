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
            <div class="view active" id="view-dashboard">
                <div class="dashboard-page">
                    <div class="dashboard-page-inner">
                        <div class="dashboard-action-row">
                            <a href={"#messages"} class="dashboard-action-btn" title="New Message">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                                <span>New Message</span>
                            </a>
                            <a href={"#network"} class="dashboard-action-btn" title="Add Connection">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M2 12h20"/>
                                    <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10"/>
                                    <path d="M12 2a15 15 0 0 0-4 10 15 15 0 0 0 4 10"/>
                                </svg>
                                <span>Add Connection</span>
                            </a>
                            <a href={"#announce"} class="dashboard-action-btn" title="Announce">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round">
                                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
                                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4"/>
                                    <circle cx="12" cy="12" r="2"/>
                                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4"/>
                                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>
                                </svg>
                                <span>Announce</span>
                            </a>
                        </div>

                        <div class="panel" id="panel-dashboard-messages">
                            <div class="panel-header">
                                Recent Messages
                                <div class="panel-header-actions">
                                    <a href={"#messages"} class="panel-header-btn" id="dash-view-all-messages" title="View all messages">
                                        <span class="text-xs text-accent">View all</span>
                                    </a>
                                </div>
                            </div>
                            <div class="panel-body p-0">
                                <div id="dashboard-recent-messages">
                                    <div class="empty-state p-12">
                                        <span class="empty-state-primary">No messages yet</span>
                                        <span class="empty-state-hint">Send your first encrypted message</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="panel" id="panel-dashboard-contacts">
                            <div class="panel-header">
                                Contacts
                                <div class="panel-header-actions">
                                    <button class="panel-header-btn" id="dashboard-contacts-add-btn" title="Add contact">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <line x1="12" y1="5" x2="12" y2="19"/>
                                            <line x1="5" y1="12" x2="19" y2="12"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="panel-body p-0">
                                <div class="contacts-list-scroll" id="dashboard-contacts-list">
                                    <div class="empty-state p-10">
                                        <span class="empty-state-primary">No contacts yet</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="panel" id="panel-dashboard-peers">
                            <div class="panel-header">
                                <div class="dashboard-peers-header-info">
                                    Recent Peers
                                </div>
                                <div class="panel-header-actions">
                                    <a href={"#peers"} class="panel-header-btn" id="dash-view-network" title="View network">
                                        <span class="text-xs text-accent">View all &rarr;</span>
                                    </a>
                                </div>
                            </div>
                            <div class="panel-body dashboard-peers-scroll p-0">
                                <div id="dashboard-peers-list">
                                    <div class="dashboard-peers-empty">Discovering peers...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    }
}
