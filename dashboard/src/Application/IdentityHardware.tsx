"use strict";
import React from "react";

interface IdentityHardwareProps {
}

interface IdentityHardwareState {
}

// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to USB connectivity, including standard Serial (USB-Serial) and Android-specific USB (USB-OTG):
//
// ### USB/Serial Interface Management
// *   `api_serial_ports`: Scans for and retrieves a list of available serial ports (typically USB-to-TTL adapters or RNodes connected via USB) on desktop platforms.
//
// ### Hardware Security Keys (USB)
// The following methods interact with hardware security keys (like YubiKeys) connected via USB for identity management:
// *   `hw_detect`: Detects connected hardware security keys.
// *   `hw_provision_recoverable`: Provisions a hardware security key with a recoverable identity.
// *   `hw_provision_hardware_only`: Provisions a hardware key where the private key never leaves the device.
// *   `hw_activate_and_unlock`: Activates and unlocks a hardware identity using a PIN.
// *   `hw_change_pin`: Changes the PIN on the hardware security key.
// *   `hw_reset_piv`: Resets the PIV application on a hardware security key (erasing existing Ratspeak identities).
// *   `hw_remove`: Removes a hardware-bound identity from the application.
//
//
// ### Summary of Locations
// *   `dashboard/static/js/modals.js`: Contains the logic for scanning serial ports (`refreshSerialPorts`) and adding/updating RNode interfaces (`submitRnodeInterface`).
// *   `dashboard/static/js/identity.js`: Contains all the hardware security key (`hw_*`) interaction logic.
// *   `dashboard/static/js/ui_shared.js`: Handles generic interface actions for RNodes, including those connected via USB.
//
export class IdentityHardware extends React.Component<IdentityHardwareProps, IdentityHardwareState> {
    constructor(props: IdentityHardwareProps) {
        super(props);
    }

    render() {

        return <>
            <div className="view" id="view-identity">
                <div className="bottom-sheet-header">
                    <div className="bottom-sheet-title">Hardware Key</div>
                </div>
                <div className="bottom-sheet-body">
                    <div className="rs-dialog-message">Use a YubiKey 5+ security key as your identity. The private key is generated on the device and never leaves it.</div>
                    <div className="rs-dialog-choices">
                        <button type="button" className="rs-dialog-choice"><span className="rs-dialog-choice-text"><span
                            className="rs-dialog-choice-label">Set up a new key</span><span
                            className="rs-dialog-choice-hint">Provision a factory-fresh or reset security key.</span></span></button>
                        <button type="button" className="rs-dialog-choice"><span className="rs-dialog-choice-text"><span
                            className="rs-dialog-choice-label">Use an existing key</span><span
                            className="rs-dialog-choice-hint">Register a key that is already provisioned.</span></span></button>
                    </div>
                </div>
                <div className="bottom-sheet-footer">
                    <a href={"#identity"} className="rs-dialog-cancel">Cancel</a>
                </div>
            </div>
        </>
    }
}
