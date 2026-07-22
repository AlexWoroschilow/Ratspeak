import {makeAutoObservable, observable} from "mobx";
import {invoke} from '@tauri-apps/api/core';
import {Peers} from "./ApplicationStore/Peers";
import {Network} from "./ApplicationStore/Network";

//
// Based on the investigation of the `@dashboard/static/js/setup.js` and `@dashboard/static/js/tauri_events.js` files, here are the `RS.invoke` methods related to the initial application setup:
//
// ### Setup Status and Completion
// *   `api_setup_status`: Checks if the application requires initial setup (e.g., if no identity exists). Returns a `needs_setup` flag.
// *   `api_setup_complete`: Finalizes the setup process. It can be called during identity generation or at the final step to save the user's display name and lock in the configuration.
// *   `api_setup_restart`: Triggers a restart of the core service to apply the setup configuration and transition to the main dashboard.
//
// ### Startup and Progress Monitoring
// *   `api_startup_progress`: Retrieves the current stage of the backend startup (e.g., `starting`, `hw_locked`, `ready`). This is used during setup to wait for the system to become ready after a restart.
// *   `api_version`: Used as a "heartbeat" check during the connection phase to verify that the backend IPC (Inter-Process Communication) is responsive.
//
// ### Identity Management (during Setup)
// While these methods are also used in the identity manager, they are central to the setup flow:
// *   `hw_activate_and_unlock`: Used when setting up a hardware-bound identity (e.g., YubiKey) to activate and unlock the key with a PIN.
// *   `hw_remove`: Used to clean up a failed hardware setup attempt (e.g., if a PIN is locked and needs resetting).
// *   `restore_seed_identity`: (Invoked via `importIdentity`) Used to restore an existing identity from a recovery mnemonic during the setup wizard.
// *   `api_import_identity_base64`: (Invoked via `importIdentity`) Used to import an identity from a backup file during setup.
//
// ### Utilities
// *   `RS.copyText`: While a utility rather than a backend command, it is used extensively during setup to allow users to copy their new identity hash (address) or recovery mnemonic.
//
// ### Summary of Locations
// *   `dashboard/static/js/setup.js`: The primary controller for the setup wizard, handling step transitions, identity creation, and the final connection sequence.
// *   `dashboard/static/js/tauri_events.js`: Performs an initial bootstrap check using `api_startup_progress` to handle cases where the application starts in a locked state.
//
//
////
// ### Propagation and Sync
// *   `propagation_update` / `propagation_refresh_started`: Status updates for message propagation.
// *   `propagation_sync_result` / `propagation_error`: Outcomes of propagation synchronization attempts.
//
// ### Summary of Locations
// These listeners are primarily defined and handled in:
// *   `dashboard/static/js/tauri_events.js`: The central hub for network, BLE, and system-level event listeners.
// *   `dashboard/static/js/lxmf.js`: Handling all messaging, contact, and voice event logic.
// *   `dashboard/static/js/identity.js`: Handling identity and hardware security key events.
// *   `dashboard/static/js/settings.js`: Monitoring configuration and preference updates.

export interface SetupStatusResponse {
    needs_setup: boolean;
}

export interface SetupCompleteArgs {
    args: {
        display_name: string;
    };
}

export interface SetupCompleteResponse {
    ok: boolean;
    error?: string;
    mnemonic?: string;
    identity_hash?: string;
    lxmf_hash?: string;
}

export interface StartupProgressResponse {
    stage: 'starting' | 'hw_locked' | 'ready';
    hw_locked?: string;
    hw_locked_kind?: 'passcode' | 'hardware';
}

export class ApplicationStore {

    public peers: Peers;
    public network: Network;

    constructor() {
        this.peers = new Peers(this);
        this.network = new Network(this);

        makeAutoObservable(this);
        // makeAutoObservable(this.peers);
        // makeAutoObservable(this.network);
    }

    /**
     *  `api_setup_status`: Checks if the application requires initial setup
     * (e.g., if no identity exists). Returns a `needs_setup` flag.
     *
     */
    async isSetupRequired(): Promise<boolean> {
        return new Promise((resolve: any, reject) => {
            invoke?.('api_setup_status')
                .then(((data: SetupStatusResponse) => {
                    return resolve(data.needs_setup);
                }) as any)
                .catch((error: any) => {
                    return reject(new Error("Failed: api_setup_status"))
                });
        });
    }

    /**
     * `api_setup_restart`: Triggers a restart of the core service to apply
     * the setup configuration and transition to the main dashboard.
     *
     */
    doSetupRestart(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return resolve(true);
        });
    }

    /**
     * `api_setup_complete`: Finalizes the setup process.
     * It can be called during identity generation or at the final step to save the user's display name and lock in the configuration.
     *
     */
    async doSetupComplete(): Promise<SetupCompleteResponse> {
        return new Promise((resolve, reject) => {
            return resolve({
                ok: false,
                error: "Not Implemented",
            } as SetupCompleteResponse);
        });
    }
}

export const store = new ApplicationStore();
export const network = store?.network;
export const peers = store?.peers;
