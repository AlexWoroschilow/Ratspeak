"use strict";
import React from "react";

interface ResetProps {
}

interface ResetState {
}

export class Reset extends React.Component<ResetProps, ResetState> {
    constructor(props: ResetProps) {
        super(props);
    }

    render() {

        return <>
            <section className="settings-detail-pane" aria-labelledby="settings-detail-title">
                <div className="settings-page-inner settings-detail-panels">
                    <div className="panel settings-panel settings-panel-selected">
                        <div className="panel-header">Reset</div>
                        <div className="panel-body">

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Cache</span>
                                    <span className="settings-row-desc">Safe to clear at any time. Data re-populates automatically.</span>
                                </div>
                            </div>
                            <div className="rs-dialog-choices">
                                <span className="rs-dialog-choice">
                                    <span className="rs-dialog-choice-text">
                                        <span className="rs-dialog-choice-label">Clear Paths</span>
                                        <span className="rs-dialog-choice-hint">Cached network routes</span>
                                    </span>
                                </span>
                                <span className="rs-dialog-choice">
                                    <span className="rs-dialog-choice-text">
                                        <span className="rs-dialog-choice-label">Clear Announces</span>
                                        <span className="rs-dialog-choice-hint">Announce history</span>
                                    </span>
                                </span>
                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Data</span>
                                    <span className="settings-row-desc">Permanently removes content. Cannot be undone.</span>
                                </div>
                            </div>
                            <div className="rs-dialog-choices">
                                <span className="rs-dialog-choice">
                                    <span className="rs-dialog-choice-text">
                                        <span className="rs-dialog-choice-label">Delete Messages</span>
                                        <span className="rs-dialog-choice-hint">All conversation history</span>
                                    </span>
                                </span>
                                <span className="rs-dialog-choice">
                                    <span className="rs-dialog-choice-text">
                                        <span className="rs-dialog-choice-label">Delete Contacts</span>
                                        <span className="rs-dialog-choice-hint">All saved contacts</span>
                                    </span>
                                </span>
                                <span className="rs-dialog-choice">
                                    <span className="rs-dialog-choice-text">
                                        <span className="rs-dialog-choice-label">Delete All Data</span>
                                        <span className="rs-dialog-choice-hint">Messages and contacts</span>
                                    </span>
                                </span>
                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Factory Reset</span>
                                    <span className="settings-row-desc">Delete everything. No going back. Fresh start.</span>
                                </div>
                            </div>
                            <div className="rs-dialog-choices">
                                <span className="rs-dialog-choice">
                                    <span className="rs-dialog-choice-text">
                                        <span className="rs-dialog-choice-label">Reset Everything</span>
                                        <span className="rs-dialog-choice-hint">Permanently removes everything.</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    }
}
