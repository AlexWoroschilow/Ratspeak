"use strict";
import React from "react";
import {Bluetooth} from "./NetworkRadio/Bluetooth";
import {Serial} from "./NetworkRadio/Serial";
import {USB} from "./NetworkRadio/USB";
import {TCP} from "./NetworkRadio/TCP";
import {LoRaSettings} from "./NetworkRadio/LoRaSettings";

import "./NetworkRadio.scss";

interface NetworkRadioProps {
}

interface NetworkRadioState {
}


export class NetworkRadio extends React.Component<NetworkRadioProps, NetworkRadioState> {
    constructor(props: NetworkRadioProps) {
        super(props);
    }

    render() {

        return <>
            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" id="rnode-modal-title" data-sheet-icon="lora">
                    <span className="bottom-sheet-title-icon">
                        <svg
                            viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20v-14"></path><path d="M12 6l-3 3"></path><path d="M12 6l3 3"></path><path
                            d="M6 14a6 6 0 0 0 0-6"></path><path d="M18 14a6 6 0 0 1 0-6"></path><path d="M3 16a10 10 0 0 0 0-10"></path><path
                            d="M21 16a10 10 0 0 1 0-10"></path>
                </svg>
                </span>
                    <span className="bottom-sheet-title-label">Add LoRa Device</span>
                </div>
            </div>
            <div className="bottom-sheet-body">

                <div id="rnode-step-1">

                    <details style={{marginTop: "var(--space-3)"}} open="">
                        <summary className="rs-dialog-advanced-summary">Bluetooth</summary>
                        <div style={{paddingTop: "var(--space-2)"}}>
                            <Bluetooth>
                                <LoRaSettings/>
                            </Bluetooth>
                        </div>
                    </details>

                    <details style={{marginTop: "var(--space-3)"}} open="">
                        <summary className="rs-dialog-advanced-summary">Serial</summary>
                        <div style={{paddingTop: "var(--space-2)"}}>
                            <Serial>
                                <LoRaSettings/>
                            </Serial>
                        </div>
                    </details>

                    <details style={{marginTop: "var(--space-3)"}} open="">
                        <summary className="rs-dialog-advanced-summary">USB</summary>
                        <div style={{paddingTop: "var(--space-2)"}}>
                            <USB>
                                <LoRaSettings/>
                            </USB>
                        </div>
                    </details>


                    <details style={{marginTop: "var(--space-3)"}} open="">
                        <summary className="rs-dialog-advanced-summary">TCP</summary>
                        <div style={{paddingTop: "var(--space-2)"}}>
                            <TCP>
                                <LoRaSettings/>
                            </TCP>
                        </div>
                    </details>

                    <div className="bottom-sheet-footer">
                        <a href={"#network"} className="rs-dialog-cancel">Cancel</a>
                    </div>
                </div>

            </div>

        </>
    }
}
