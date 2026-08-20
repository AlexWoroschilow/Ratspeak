"use strict";
import React from "react";
import {Switcher} from "../components/Switcher";

interface PrivacyProps {
}

interface PrivacyState {
}

export class Privacy extends React.Component<PrivacyProps, PrivacyState> {
    constructor(props: PrivacyProps) {
        super(props);
    }

    render() {

        return <>
            <section className="settings-detail-pane" aria-labelledby="settings-detail-title">
                <div className="settings-page-inner settings-detail-panels">


                    <div className="panel settings-panel settings-panel-selected" id="panel-settings-privacy" aria-hidden="false">
                        <div className="panel-header">Privacy</div>
                        <div className="panel-body">
                            <div className="settings-row" style={{borderBottom: "none"}}>
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Announce Ratspeak usage</span>
                                    <span className="settings-row-desc">Let others know you support games, calls, and extra features.</span>
                                </div>
                                <Switcher/>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    }
}
