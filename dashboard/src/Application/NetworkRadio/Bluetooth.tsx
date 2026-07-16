"use strict";
import React, {ReactHTMLElement} from "react";
import {LoRaSettingsProps} from "./LoRaSettings";

interface BluetoothProps {
    children?: React.ReactNode;
}

interface BluetoothState {
    device: boolean
}

// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to Bluetooth (BLE):
//
// ### General Bluetooth Status and Scanning
// *   `api_ble_available`: Checks if Bluetooth/BLE is available on the system.
// *   `scan_ble_devices`: Initiates a scan for nearby Bluetooth devices (primarily RNodes).
// *   `cancel_ble_connect`: Cancels an ongoing attempt to connect to a Bluetooth device.
//
// ### RNode via Bluetooth
// *   `disconnect_ble_rnode`: Disconnects a Bluetooth-connected RNode.
// *   `submit_ble_rnode_passkey`: Submits a pairing passkey for an RNode.
// *   `cancel_ble_rnode_pairing`: Cancels a pending Bluetooth pairing request with an RNode.
// *   `ble_rnode_bridge_ready`: Signals that the BLE-to-RNode bridge is ready (often used in the context of Android's native bridge).
//
// ### Summary of Locations
// These methods are primarily used in the following files:
// *   `dashboard/static/js/modals.js`: Handling interface configuration, scanning, and peer toggling.
// *   `dashboard/static/js/tauri_events.js`: Handling Bluetooth-related events like pairing and bridge status.
// *   `dashboard/static/js/settings.js`: Reporting and managing Bluetooth peer status.
// *   `dashboard/static/js/ui_shared.js`: Generic UI actions like disconnecting interfaces.
//

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
