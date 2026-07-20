"use strict";
import React from "react";

interface NetworkHostProps {
}

interface NetworkHostState {
}

export class NetworkHost extends React.Component<NetworkHostProps, NetworkHostState> {
    constructor(props: NetworkHostProps) {
        super(props);
    }

    render() {

        return <>
            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="host"><span className="bottom-sheet-title-icon"><svg viewBox="0 0 24 24"
                                                                                                                                                       aria-hidden="true"><rect
                    x="2" y="2" width="20" height="8" rx="2"></rect><rect x="2" y="14" width="20" height="8" rx="2"></rect><circle cx="6" cy="6" r="1" fill="currentColor"
                                                                                                                                   stroke="none"></circle><circle cx="6" cy="18"
                                                                                                                                                                  r="1"
                                                                                                                                                                  fill="currentColor"
                                                                                                                                                                  stroke="none"></circle></svg></span><span
                    className="bottom-sheet-title-label">Host Network</span></div>
                <button className="bottom-sheet-close" id="host-modal-close" aria-label="Close">×</button>
            </div>
            <div className="bottom-sheet-body">
                <p className="inline-hint" style={{margin: "0 0 10px"}}>Accept incoming TCP connections from other Reticulum nodes.</p>
                <div className="modal-field">
                    <label>Listen Port</label>
                    <input type="number" id="host-port" className="modal-input" placeholder="4242" min="1" max="65535" autoCorrect="off" autoCapitalize="none"
                           spellCheck="false"/>
                </div>
                <div className="modal-field">
                    <label>Bind Address</label>
                    <input type="text" id="host-listen-ip" className="modal-input" placeholder="0.0.0.0" autoCorrect="off" autoCapitalize="none" spellCheck="false"/>
                </div>
                <div className="modal-field">
                    <label>Name (optional)</label>
                    <input type="text" id="host-name" className="modal-input" placeholder="My Server" maxLength={32} autoCorrect="off" autoCapitalize="none"
                           spellCheck="false"/>
                </div>
            </div>
            <div className="bottom-sheet-footer">
                <a href={"#network"} className="rs-dialog-cancel">Cancel</a>
                <button className="rs-dialog-confirm">Start Hosting</button>
            </div>

        </>
    }
}
