"use strict";
import React, {ReactHTMLElement} from "react";
import {LoRaSettingsProps} from "./LoRaSettings";

interface BluetoothProps {
    children?: React.ReactNode;
}

interface BluetoothState {
    device: boolean
}


export class Bluetooth extends React.Component<BluetoothProps, BluetoothState> {
    constructor(props: BluetoothProps) {
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
                <div id="rnode-ble-section">
                    <div id="rnode-ble-ready">
                        <div className="rnode-pairing-tip">Tip: enable pairing mode on your device before connecting if unpaired.</div>
                        <div className="ble-device-list" id="ble-device-list">
                            <div className="ble-scan-placeholder">Click "Scan" to find nearby RNode devices.</div>
                        </div>
                        <div id="rnode-handoff-hint-ble" className="rnode-handoff-hint" style={{display: "none"}}>Connecting will disconnect your active USB LoRa radio.
                        </div>
                    </div>
                </div>
                <div className="bottom-sheet-footer">
                    <button className="rs-dialog-confirm">Start Scan</button>
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
