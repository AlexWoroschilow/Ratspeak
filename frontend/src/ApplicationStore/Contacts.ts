// Based on the investigation of the `@dashboard/static/js/*` files, here are the `RS.invoke` methods related to contact management:
//
// ### Contact Lifecycle and Management
// *   `add_contact`: Adds a new contact or updates an existing one (e.g., renaming). It takes a hash and an optional display name.
// *   `remove_contact`: Removes a contact from the address book using their hash.
// *   `api_contacts`: Retrieves the list of all saved contacts.
// *   `check_contact_status`: Triggers a status check for contacts (likely checking online/reachability status).
//
// ### Blocking and Security
// *   `block_contact`: Blocks a contact. It can optionally "escalate to blackhole" (completely ignoring all traffic from the identity).
// *   `unblock_contact`: Unblocks a previously blocked contact.
// *   `api_blocked_contacts`: Retrieves the list of currently blocked identities.
//
// ### Contact Cards and Portability
// *   `api_contact_card`: Retrieves the contact card information (containing identity details and metadata) for a specific hash.
// *   `api_preview_contact_card`: Previews the contents of a contact card payload before importing.
// *   `import_contact_card`: Imports a contact card from a provided payload.
//
// ### Communication Context
// *   `get_conversation`: Retrieves the message history or conversation state for a specific contact (often used in the LXMF/messaging context).
//
// ### Summary of Locations
// These methods are primarily used in the following files:
// *   `dashboard/static/js/lxmf.js`: Managing contacts within the messaging interface (adding, removing, renaming, blocking).
// *   `dashboard/static/js/contact_card.js`: Handling the display, preview, and import of contact cards.
// *   `dashboard/static/js/settings.js`: Managing blocked contacts and unblocking actions.
// *   `dashboard/static/js/peers.js`: Allowing users to add peers as contacts or block them directly from the peer list.
// *   `dashboard/static/js/nav.js`: Loading the contact list for navigation.
//
// ### Contacts and Identities
// *   `contacts_update`: Triggered when the contact list is modified.
// *   `contact_added`: Triggered when a new contact is successfully added.
// *   `contact_error`: Reports errors during contact operations.
// *   `contact_blocked` / `contact_unblocked`: Triggered when a contact's block status changes.
// *   `contact_identity_status`: Updates the online/reachability status of a contact.
// *   `identity_switching` / `identity_switched`: Triggered during and after an identity change.
// *   `identity_reset` / `identity_error`: Triggered during identity management lifecycle events.
// *   `hardware_locked`: Triggered when a hardware security key (e.g., YubiKey) requires a PIN or is locked.
//
import {action, makeAutoObservable} from "mobx";
import {invoke} from "@tauri-apps/api/core";
import {listen} from "@tauri-apps/api/event";
import {Peer, PeerEnriched, Peers} from "./Peers";
import {info} from "@tauri-apps/plugin-log";

export class Contacts {
    public collection: Array<PeerEnriched> = [];

    constructor(private peersStore: Peers) {
        makeAutoObservable(this, {
            setCollection: action,
        });

        this.listeners();

        this.fetchContacts()
            .then((contacts: Array<PeerEnriched>) => {
                this.setCollection(contacts);
            });
    }

    setCollection(collection: Array<PeerEnriched>) {
        this.collection = collection;
    }

    async fetchContacts() {
        return new Promise((resolve: (value: Array<PeerEnriched>) => void, reject) => {
            invoke<Array<PeerEnriched>>('api_contacts')
                .then((collection: Array<Peer>) => {
                    return resolve(collection?.map?.((peer: Peer) => {
                        const peerEnriched: PeerEnriched | undefined = this.peersStore.collection?.[`${peer?.hash}`];
                        if (peerEnriched != undefined) {
                            return peerEnriched;
                        }

                        return {
                            ...peer, ...{
                                status: 'unreachable',
                                activity_tier: 'older',
                                activity_label: "string",
                                hops: null,
                                iface_is_live: false,
                                route_label: "string",
                                path_age: 0,
                                via: "",
                            }
                        } as PeerEnriched;

                    }));
                }).catch(reject);
        });

    }

    async addContact(peer: PeerEnriched, name?: string) {
        return new Promise((resolve: (value: PeerEnriched) => void, reject) => {
            invoke<PeerEnriched>('add_contact', {args: {hash: peer.hash, display_name: name}})
                .then((peer: any) => {
                    resolve(peer);
                }).catch(reject);
        });
    }

    async removeContact(peer: PeerEnriched) {
        return new Promise((resolve: (value: PeerEnriched) => void, reject) => {
            invoke<PeerEnriched>('remove_contact', {hash: peer.hash})
                .then((result: any) => {
                    return resolve(peer);
                }).catch(reject);
        });
    }

    async blockContact(peer: PeerEnriched) {
        return new Promise((resolve: (value: PeerEnriched) => void, reject) => {
            invoke('block_contact', {args: {hash: peer.hash}})
                .then((result: any) => {
                    info(`\n\nblockContact: ${JSON.stringify(result)}\n`)
                    return resolve(peer);
                }).catch(reject);
        });
    }

    listeners() {
        listen("contacts_update", (data) => {
            this.fetchContacts()
                .then((contacts: Array<PeerEnriched>) => {
                    this.setCollection(contacts);
                });
        });

        listen("contact_added", (data) => {
            this.fetchContacts()
                .then((contacts: Array<PeerEnriched>) => {
                    this.setCollection(contacts);
                });
        });
    }
}
