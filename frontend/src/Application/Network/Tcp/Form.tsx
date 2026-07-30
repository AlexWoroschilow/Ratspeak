"use strict";
import React from "react";
import {IoGitNetworkOutline} from "react-icons/io5";
import {inject, observer} from "mobx-react";
import {ConfigTCP, Network as NetworkStore} from "../../../ApplicationStore/Network";

interface FormProps {
    network?: NetworkStore;
    onCancel?: () => void
    iface?: ConfigTCP;
}

interface FormState {
    error?: {
        code: string;
        message: string
    } | undefined;

    iface?: Partial<ConfigTCP>;
}

@inject("network")
@observer
export class Form extends React.Component<FormProps, FormState> {
    declare protected hostRef: React.RefObject<HTMLInputElement | null>;
    declare protected portRef: React.RefObject<HTMLInputElement | null>;
    declare protected nameRef: React.RefObject<HTMLInputElement | null>;
    declare protected ifacEnabledRef: React.RefObject<HTMLInputElement | null>;
    declare protected ifacNameRef: React.RefObject<HTMLInputElement | null>;
    declare protected ifacPassRef: React.RefObject<HTMLInputElement | null>;
    declare protected backboneRef: React.RefObject<HTMLInputElement | null>;


    constructor(props: FormProps) {
        super(props);

        this.hostRef = React.createRef();
        this.portRef = React.createRef();
        this.nameRef = React.createRef();
        this.ifacEnabledRef = React.createRef();
        this.ifacNameRef = React.createRef();
        this.ifacPassRef = React.createRef();
        this.backboneRef = React.createRef();

        this.state = {
            iface: this?.props?.iface || {
                port: 4242,
            } as Partial<ConfigTCP>
        }
    }

    onConnectNetwork(event: any) {
        const {network} = this.props;

        const iface = {
            name: this.nameRef.current?.value,
            host: this.hostRef.current?.value,
            port: Number(this.portRef.current?.value),
            ifac_enabled: Boolean(this.ifacEnabledRef.current?.value),
            ifac_network_name: this.ifacNameRef.current?.value,
            ifac_passphrase: this.ifacPassRef.current?.value
        } as ConfigTCP;

        network?.addConnectionTCP?.(iface)
            .then((status: boolean) => {
                this?.props?.onCancel?.();
            }).catch((error: any) => {
            this.setState({error: error});
        })


        this.setState({error: undefined});
    }

    render() {

        const {network} = this.props;
        const {error} = this.state;

        return <>
            <div className="bottom-sheet-header">
                <div className="bottom-sheet-title bottom-sheet-title-with-icon" data-sheet-icon="tcp">
                    <IoGitNetworkOutline size={20}/>
                    <span className="bottom-sheet-title-label">
                        Custom Network
                    </span>
                </div>
            </div>

            <div className="bottom-sheet-body">
                {(error?.message != undefined) && <>
                    <div className="rs-dialog-field-error" id="rnode-public-map-error">
                        {error?.message}
                    </div>
                </>}
                <div className="connect-tab-panel active" id="connect-custom-panel" role="tabpanel" aria-labelledby="connect-tab-custom">
                    <div className="modal-field" id="connect-name-field">
                        <label>Name</label>
                        <input type="text" id="connect-name" className="modal-input" placeholder="Ratspeak Hub" maxLength={32} autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"
                               value={this.state.iface?.name}
                               ref={this.nameRef}/>
                    </div>
                    <div className="modal-field">
                        <label>Host</label>
                        <input type="text" id="connect-host" className="modal-input" placeholder="e.g. rns.ratspeak.org" autoCorrect="off" autoCapitalize="none"
                               value={this.state.iface?.host}
                               spellCheck="false"
                               ref={this.hostRef}/>
                    </div>
                    <div className="modal-field">
                        <label>Port</label>
                        <input type="number" id="connect-port" className="modal-input" placeholder="4242" min="1" max="65535" autoCorrect="off" autoCapitalize="none"
                               value={this.state.iface?.port}
                               spellCheck="false"
                               ref={this.portRef}/>
                    </div>
                    {/*<label className="rs-dialog-checkbox-wrap mt-4" id="connect-backbone-row">*/}
                    {/*    <input type="checkbox" id="connect-use-backbone" className="rs-dialog-checkbox"*/}
                    {/*           ref={this.backboneRef}/>*/}
                    {/*    <span className="rs-dialog-checkbox-label">Experimental: Use Backbone</span>*/}
                    {/*</label>*/}
                    <label className="rs-dialog-checkbox-wrap mt-4" id="connect-ifac-row">
                        <input type="checkbox" className="rs-dialog-checkbox"
                               checked={this.state.iface?.ifac_enabled}
                               onChange={() => this.setState({iface: {...this.state.iface, ...{ifac_enabled: !this.state.iface?.ifac_enabled}}})}
                               ref={this.ifacEnabledRef}/>
                        <span className="rs-dialog-checkbox-label">Use IFAC</span>
                    </label>

                    {(this.state.iface?.ifac_enabled) && <>
                        <div id="connect-ifac-fields">
                            <div className="modal-field">
                                <label>IFAC Network Name</label>
                                <input type="text" id="connect-ifac-network-name" className="modal-input" placeholder="Optional" maxLength={128} autoCorrect="off"
                                       autoCapitalize="none" spellCheck="false"
                                       value={this.state.iface?.ifac_network_name}
                                       ref={this.ifacNameRef}/>
                            </div>
                            <div className="modal-field">
                                <label>IFAC Passphrase</label>
                                <input type="password" id="connect-ifac-passphrase" className="modal-input" placeholder="Required for most IFAC networks" maxLength={256}
                                       autoCorrect="off" autoCapitalize="none" spellCheck="false"
                                       value={this.state.iface?.ifac_passphrase}
                                       ref={this.ifacPassRef}/>
                            </div>
                        </div>
                    </>}
                </div>
            </div>

            <div className="bottom-sheet-footer">
                <button className="rs-dialog-confirm" onClick={this?.props?.onCancel}>Cancel</button>
                <button className="rs-dialog-confirm" onClick={this.onConnectNetwork.bind(this)}>
                    Connect
                </button>
            </div>
        </>
    }
}

