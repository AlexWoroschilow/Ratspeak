"use strict";
import React, {ReactHTMLElement} from "react";
import {LoRaSettingsProps} from "./LoRaSettings";

interface USBProps {
    children?: React.ReactNode;
}

interface USBState {
    device: boolean
}


// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to USB connectivity, including standard Serial (USB-Serial) and Android-specific USB (USB-OTG):
//
// ### USB/Serial Interface Management
// *   `api_serial_ports`: Scans for and retrieves a list of available serial ports (typically USB-to-TTL adapters or RNodes connected via USB) on desktop platforms.
// *   `add_lora_interface`: Adds a new LoRa/RNode interface. This method is used for all transport types, including standard USB-Serial (where the `port` is a path like `/dev/ttyUSB0` or `COM3`) and Android USB (where the `port` starts with `androidusb://`).
// *   `update_lora_interface`: Updates the configuration for an existing LoRa/RNode interface connected via USB.
//
// ### Android USB (USB-OTG)
// While some Android USB functionality is handled via a native bridge (`window.RatspeakAndroid`), it interacts with the following `RS.invoke` flows:
// *   `add_lora_interface`: When used on Android with a USB device, the application first requests permission via the native bridge and then calls this method with an `androidusb://` URI.
//
// ### Summary of Locations
// *   `dashboard/static/js/modals.js`: Contains the logic for scanning serial ports (`refreshSerialPorts`) and adding/updating RNode interfaces (`submitRnodeInterface`).
// *   `dashboard/static/js/identity.js`: Contains all the hardware security key (`hw_*`) interaction logic.
// *   `dashboard/static/js/ui_shared.js`: Handles generic interface actions for RNodes, including those connected via USB.
//

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
