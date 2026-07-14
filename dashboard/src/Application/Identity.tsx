"use strict";
import React from "react";

interface IdentityProps {
}

interface IdentityState {
}


export class Identity extends React.Component<IdentityProps, IdentityState> {
    constructor(props: IdentityProps) {
        super(props);
    }

    render() {

        return <>
            <div className="view" id="view-identity">
                <div className="identity-page">
                    <div className="identity-page-header">
                        <div className="identity-title-block">
                            <div className="identity-page-kicker">Identity</div>
                            <div className="identity-page-title" id="identity-page-title">Identity Management</div>
                        </div>
                        <div className="identity-toolbar">
                            <a href={"#identity-import"} className="identity-toolbar-btn" id="identity-import-btn" title="Import or restore identity"
                               aria-label="Import or restore identity">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 3v12"/>
                                    <path d="M7 10l5 5 5-5"/>
                                    <path d="M5 21h14"/>
                                </svg>
                                <span>Import</span>
                            </a>
                            <a href={"#identity-hardware"} className="identity-toolbar-btn" id="identity-hardware-btn" title="Hardware key" aria-label="Hardware key">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M2.6 17.4A2 2 0 0 0 2 18.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8A6.5 6.5 0 1 0 9.4 10.6z"/>
                                    <circle cx="16.5" cy="7.5" r="1.5"/>
                                </svg>
                                <span>Hardware</span>
                            </a>
                            <a href={"#identity-create"} className="identity-toolbar-btn identity-toolbar-btn--primary" id="identity-add-btn" title="Create identity"
                               aria-label="Create identity">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 5v14"/>
                                    <path d="M5 12h14"/>
                                </svg>
                                <span>Create</span>
                            </a>
                        </div>
                    </div>
                    <div className="identity-management-grid">
                        <div className="panel identity-panel-list" id="panel-identity-list">
                            <div className="panel-header">Identities</div>
                            <div className="panel-body identity-list-body">
                                <div id="identity-list">
                                    <div className="loading-state p-6"><span className="loading-spinner"></span>Loading...</div>
                                </div>
                            </div>
                        </div>
                        <div className="panel identity-panel-active" id="panel-identity-active">
                            <div className="panel-header">Identity Detail</div>
                            <div className="panel-body">
                                <div id="identity-active-card">
                                    <div className="loading-state"><span className="loading-spinner"></span>Loading...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}
