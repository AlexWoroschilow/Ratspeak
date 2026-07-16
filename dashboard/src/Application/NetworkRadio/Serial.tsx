"use strict";
import React, {ReactHTMLElement} from "react";
import {LoRaSettingsProps} from "./LoRaSettings";

interface SerialProps {
    children?: React.ReactNode;
}

interface SerialState {
    device: boolean
}

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
