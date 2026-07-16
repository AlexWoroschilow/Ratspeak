"use strict";
import React, {DetailedReactHTMLElement, ReactHTMLElement} from "react";
import {LoRaSettingsProps} from "./LoRaSettings";

interface TCPProps {
    children?: React.ReactNode;
}

interface TCPState {
    device: boolean
}

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
