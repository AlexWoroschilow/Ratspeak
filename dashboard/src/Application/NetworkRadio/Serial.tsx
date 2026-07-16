"use strict";
import React, {ReactHTMLElement} from "react";
import {LoRaSettingsProps} from "./LoRaSettings";

interface SerialProps {
    children?: React.ReactNode;
}

interface SerialState {
    device: boolean
}

// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods specifically related to the RNode serial interface (standard USB-to-Serial connection on desktop platforms):
//
// ### Serial Port Management
// *   `api_serial_ports`: Scans for and retrieves a list of available serial (COM/TTY) ports on the system. This is used by the UI to populate the device selection list for standard RNodes.
//
// ### Interface Configuration
// *   `add_lora_interface`: Used to add a new RNode interface. When a serial port is selected (e.g., `/dev/ttyUSB0` or `COM3`), this method is called with the serial path as the `port` argument.
// *   `update_lora_interface`: Updates the configuration (frequency, bandwidth, etc.) for an existing RNode connected via a serial port.
// *   `api_rnode_presets`: Retrieves a list of regional settings and radio parameter presets used to configure the RNode serial interface.
//
// ### Summary of Locations
// *   `dashboard/static/js/modals.js`:
//     *   `refreshRnodeSerialPorts()` (line 1255): Calls `api_serial_ports` to fetch available hardware.
//     *   `submitRnodeInterface()` (line 1609): Calls `add_lora_interface` or `update_lora_interface` when the "Serial" connection type is selected and a port is chosen.
//     *   Initial setup: Calls `api_rnode_presets` to load radio configuration options.
//
// Note: While Bluetooth and Android-specific USB (USB-OTG) also interact with RNodes, standard serial communication on desktop platforms is handled by the methods listed above.
//

export class Serial extends React.Component<SerialProps, SerialState> {
    constructor(props: SerialProps) {
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
                <div id="rnode-serial-section">
                    <div className="u-flex gap-2">
                        <select id="rnode-port" className="nr-select flex-1">
                            <option value="">Select device...</option>
                        </select>
                        <button className="nr-btn nr-btn-xs" id="rnode-refresh-btn"
                                aria-label="Refresh serial ports"
                                title="Refresh ports">↻
                        </button>
                    </div>
                </div>
                <div className="bottom-sheet-footer">
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
