"use strict";
import React, {ReactHTMLElement} from "react";
import {LoRaSettingsProps} from "./LoRaSettings";

interface USBProps {
    children?: React.ReactNode;
}

interface USBState {
    device: boolean
}


export class USB extends React.Component<USBProps, USBState> {
    constructor(props: USBProps) {
        super(props);

        this.state = {
            device: false
        }
    }

    onSelectedDevice() {
        this.setState({
            device: true
        })
    }

    onReset() {
        this.setState({
            device: false
        })
    }

    render() {

        return <>

            {(this?.state?.device === false) && <>
                <div id="rnode-android-usb-section">
                    <div className="ble-device-list" id="android-usb-device-list">
                        <div className="ble-scan-placeholder">Plug in your RNode via a USB-C OTG cable, then tap "Refresh".</div>
                    </div>
                    <div id="rnode-handoff-hint-usb" className="rnode-handoff-hint" style={{display: "none"}}>
                        Connecting will disconnect your active Bluetooth LoRa radio.
                    </div>
                </div>
                <div className="bottom-sheet-footer">
                    <button className="rs-dialog-confirm">Refresh</button>
                    <button className="rs-dialog-confirm"
                            onClick={this.onSelectedDevice.bind(this)}>
                        Next
                    </button>
                </div>
            </>}

            {this?.state?.device && <>
                {React.isValidElement(this.props.children) &&
                    React.cloneElement(this?.props?.children as ReactHTMLElement<any>, {
                        onReset: this.onReset.bind(this)
                    } as Partial<LoRaSettingsProps>)}
            </>}


        </>
    }
}
