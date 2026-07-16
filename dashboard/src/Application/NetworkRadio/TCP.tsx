"use strict";
import React, {DetailedReactHTMLElement, ReactHTMLElement} from "react";
import {LoRaSettingsProps} from "./LoRaSettings";

interface TCPProps {
    children?: React.ReactNode;
}

interface TCPState {
    device: boolean
}

// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to the RNode TCP interface (connecting to an RNode over a network via TCP):
//
// ### Interface Configuration
// *   `add_lora_interface`: Used to add a new RNode interface. When the connection type is "TCP", this method is called with a `port` argument in the format `tcp://<host>:<port>` (e.g., `tcp://192.168.1.50:7633`).
// *   `update_lora_interface`: Updates the configuration (frequency, bandwidth, mode, etc.) for an existing RNode connected via TCP.
// *   `api_rnode_presets`: Retrieves the catalog of regional settings and radio parameter presets used to configure the RNode's radio hardware over the TCP connection.
//
// ### Summary of Locations
// *   `dashboard/static/js/modals.js`:
//     *   `_normaliseRnodeTcpEndpoint(raw)` (line 902): Validates and formats the TCP address/endpoint entered by the user.
//     *   `submitRnodeInterface()` (line 1609): Collects the TCP endpoint from the UI, prefixes it with `tcp://`, and invokes `add_lora_interface` or `update_lora_interface`.
//     *   Initial setup (line 1445): Calls `api_rnode_presets` to load the configuration options available for the device.
//
// ### Note on Other TCP Methods
// While the project contains other TCP-related methods (like `add_tcp_connection`, `update_tcp_connection`, `add_tcp_server`, and `update_tcp_server`), these are used for **Reticum Network Stack** TCP links (client/server) rather than for connecting to physical RNode hardware over TCP. For RNode hardware specifically, the `add_lora_interface` flow is the primary mechanism.
//
export class TCP extends React.Component<TCPProps, TCPState> {
    constructor(props: TCPProps) {
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
                <div id="rnode-tcp-section">
                    <div className="modal-field">
                        <label>TCP Endpoint</label>
                        <input type="text" id="rnode-tcp-endpoint" className="modal-input" placeholder="192.168.1.50:7633" inputMode="url" autoComplete="off"
                               autoCorrect="off" autoCapitalize="none" spellCheck="false"/>
                    </div>
                    <p className="inline-hint-sm mt-3" style={{marginBottom: 0}}>
                        Use host or host:port. Default port 7633.
                    </p>
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
