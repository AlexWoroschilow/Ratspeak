// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to identity management, including local software identities and hardware security keys (e.g., YubiKeys).
//
// ### Local Identity Lifecycle and Management
// *   `api_list_identities`: Retrieves a list of all identities currently loaded in the application.
// *   `api_identity`: Retrieves the details of the currently active identity.
// *   `api_create_identity`: Creates a new local software identity with a given nickname.
// *   `api_activate_identity`: Sets a specific identity (by hash) as the active one.
// *   `api_delete_identity`: Deletes a local software identity.
// *   `api_set_display_name`: Sets the display name (nickname) for the current identity.
// *   `api_contact_card`: Retrieves the contact card for an identity, which contains its public keys and metadata.
// *   `switch_identity`: Switches the active identity to the one specified by the hash.
// *   `set_identity_status`: Updates the status message or availability state of the current identity.
//
// ### Security and Encryption
// *   `set_identity_passcode`: Sets or changes the passcode for a local software identity.
// *   `remove_identity_passcode`: Removes the passcode protection from a local software identity.
// *   `unlock_identity`: Unlocks a password-protected identity using the provided secret.
// *   `reveal_identity_mnemonic`: Retrieves the recovery mnemonic (seed phrase) for a software identity.
// *   `restore_seed_identity`: Restores an identity from a recovery mnemonic or seed.
//
// ### Identity Portability (Import/Export)
// *   `api_preview_identity_import_base64`: Previews the details of an identity from a Base64-encoded string before importing.
// *   `api_import_identity_base64`: Imports an identity from a Base64-encoded backup.
// *   `api_export_identity_backup_base64`: Exports the current identity as a password-protected Base64 backup.
// *   `api_export_identity_reticulum_base64`: Exports the identity in Reticulum-compatible Base64 format.
// *   `api_export_identity_reticulum_base32`: Exports the identity in Reticulum-compatible Base32 format.
//
// ### Hardware Security Key (USB/PIV) Support
// *   `hw_detect`: Scans for and identifies connected hardware security keys.
// *   `hw_provision_recoverable`: Provisions a hardware key with an identity that can be recovered via a mnemonic.
// *   `hw_provision_hardware_only`: Provisions a hardware key where the private keys are generated on-device and cannot be exported.
// *   `hw_import_existing`: Imports an existing identity already stored on a hardware security key.
// *   `hw_activate_and_unlock`: Activates a hardware-bound identity and unlocks it using a PIN.
// *   `hw_stage_unlock`: Stages a hardware key for unlocking (often used during initial setup or PIN verification).
// *   `hw_change_pin`: Changes the PIN for a hardware security key.
// *   `hw_remove`: Removes the association of a hardware identity from the application.
// *   `hw_reset_piv`: Resets the PIV application on the hardware key, erasing existing identities and PINs.
// *   `hw_restore`: Restores an identity onto a hardware key from a recovery payload.
//
// ### Summary of Locations
// These methods are primarily used in:
// *   `dashboard/static/js/identity.js`: The central location for software and hardware identity logic.
// *   `dashboard/static/js/settings.js`: Used for status updates and identity switching.
// *   `dashboard/static/js/setup.js`: Handling hardware key activation during the initial application setup.
import {action, makeAutoObservable} from "mobx";
import {invoke} from "@tauri-apps/api/core";
import {listen} from "@tauri-apps/api/event";
import {info} from "@tauri-apps/plugin-log";


export interface IdentityInfo {
    created_at: number;
    last_used: number;

    display_name?: string;
    nickname: string;

    hash: string;
    lxmf_hash: string;
    lxmf_destination?: string;

    is_active: boolean;
    is_hardware: boolean;
    has_mnemonic?: boolean;
    exists?: boolean;

    passcode_protected?: boolean;

    propagation_auto_favor_static: number;
    propagation_enabled: number;
    propagation_mode: string;
    propagation_node: string;

    status: string;
}

export interface ContactCard {
    hash: string;
    nickname: string;
    keys: string[];
    metadata: Record<string, any>;
}

export class Identity {
    public collection: IdentityInfo[] = [];
    public active: IdentityInfo | null = null;

    constructor() {
        makeAutoObservable(this, {
            setCollection: action,
            setActive: action,
        });

        this.listeners();

        this.fetchIdentities();
        this.fetchActiveIdentity();
    }

    setCollection(collection: IdentityInfo[]) {
        this.collection = collection;
    }

    setActive(identity: IdentityInfo | null) {
        this.active = identity;
    }

    async fetchIdentities(): Promise<IdentityInfo[]> {
        return new Promise((resolve: (value: IdentityInfo[]) => void, reject) => {
            invoke<IdentityInfo[]>('api_list_identities')
                .then((collection: Array<IdentityInfo>) => {
                    this.setCollection(collection)
                    return resolve(collection)
                }).catch(reject);
        });
    }

    async fetchActiveIdentity(): Promise<IdentityInfo> {
        return new Promise((resolve: (value: IdentityInfo) => void, reject) => {
            invoke<IdentityInfo>('api_identity')
                .then((identity: IdentityInfo) => {
                    this.setActive(identity);
                    return resolve(identity)
                }).catch(reject);
        });
    }

    async createIdentity(nickname: string): Promise<IdentityInfo> {
        return new Promise((resolve: (value: IdentityInfo) => void, reject) => {
            invoke<IdentityInfo>('api_create_identity', {args: {nickname}})
                .then((identity: IdentityInfo) => {
                    this.fetchIdentities()
                        .then((identities: IdentityInfo[]) => {
                            return resolve(identity)
                        });
                }).catch(reject);
        });
    }

    async activateIdentity(identity: IdentityInfo): Promise<IdentityInfo | undefined> {
        return new Promise((resolve: (value: IdentityInfo | undefined) => void, reject) => {
            invoke<IdentityInfo | undefined>('api_activate_identity', {hashHex: identity.hash})
                .then((data: any) => {
                    this.fetchIdentities()
                        .then((collection: Array<IdentityInfo>) => {
                            return resolve(collection?.find?.((item: IdentityInfo) => {
                                return item.hash === identity.hash
                            }));
                        });
                })
                .catch(reject);
        });
    }

    async deleteIdentity(identity: IdentityInfo): Promise<void> {
        return new Promise((resolve: (value: void) => void, reject) => {
            invoke<void>('api_delete_identity', {hashHex: identity.hash})
                .then((data: any) => {
                    this.fetchIdentities()
                        .then((identities: IdentityInfo[]) => {
                            return resolve();
                        });
                })
                .catch(reject);
        });
    }

    async setDisplayName(nickname: string): Promise<IdentityInfo> {
        return new Promise((resolve: (value: IdentityInfo) => void, reject) => {
            invoke<IdentityInfo>('api_set_display_name', {args: {display_name: nickname}})
                .then((data: any) => {
                    this.fetchActiveIdentity()
                        .then((identity: IdentityInfo) => {
                            info(`fetchActiveIdentity: ${JSON.stringify(identity)}\n`);
                            return resolve(identity)
                        });
                })
                .catch(reject);
        });
    }

    async getContactCard(hash: string): Promise<ContactCard> {
        try {
            return await invoke<ContactCard>('api_contact_card', {hash});
        } catch (error) {
            console.error("Failed to get contact card:", error);
            throw error;
        }
    }

    async setIdentityStatus(status: string): Promise<void> {
        try {
            await invoke('set_identity_status', {status});
        } catch (error) {
            console.error("Failed to set identity status:", error);
            throw error;
        }
    }

    async setPasscode(hash: string, passcode: string): Promise<any> {
        return new Promise((resolve: (value: IdentityInfo) => void, reject) => {
            invoke('set_identity_passcode', {args: {hash, passcode}})
                .then((identity: any) => {
                    return resolve(identity)
                }).catch(reject);
        });
    }

    listeners() {
        listen("identity_switched", () => {
            this.fetchActiveIdentity();
            this.fetchIdentities();
        });

        listen("identity_updated", () => {
            this.fetchActiveIdentity();
            this.fetchIdentities();
        });
    }
}
