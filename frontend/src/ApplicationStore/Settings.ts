// Based on the investigation of the `@dashboard/static/js/settings.js` file, here are the `RS.invoke` methods related to application settings, global configurations, and system-wide maintenance:
//
// ### Global Application Settings
// *   `api_app_settings`: Retrieves the global application settings payload (e.g., peer sorting, transport preferences).
// *   `api_version`: Fetches the current application and backend version information.
// *   `api_notification_settings`: Retrieves current notification preferences.
// *   `set_desktop_notifications`: Enables or disables desktop/system notifications.
// *   `set_announce_ratspeak_usage`: Toggles whether the application automatically announces its presence to the network.
// *   `set_auto_announce`: Configures the interval for automatic identity announcements.
// *   `set_hardware_lock_timeout`: Sets the inactivity timeout for hardware security keys (e.g., YubiKeys).
//
// ### Network and Connectivity Settings
// *   `api_hub_interfaces`: Retrieves a list of available Hub interfaces/gateways.
// *   `api_ble_peer_status`: Checks the current status and availability of the Bluetooth (BLE) Peer interface.
// *   `trigger_announce`: Manually triggers a network announcement for the current identity.
//
// ### Identity and Privacy
// *   `api_identity`: Retrieves details of the currently active identity.
// *   `api_list_identities`: Retrieves a list of all locally stored software identities.
// *   `set_identity_status`: Updates the status message (presence) for the current identity.
// *   `api_blocked_contacts`: Retrieves the list of currently blocked identities.
// *   `unblock_contact`: Removes a contact from the block list.
//
// ### Maintenance and Data Management (Danger Zone)
// These methods are used to clear specific cached data or reset the application state:
// *   `api_clear_paths`: Clears the Reticulum network path table (forcing re-discovery).
// *   `api_clear_announces`: Deletes the history of received identity announcements.
// *   `api_clear_messages`: Deletes all LXMF message history across all conversations.
// *   `api_clear_contacts`: Deletes all saved contacts from the address book.
// *   `api_reset_database`: Performs a combined reset of messages and contacts.
// *   `api_factory_reset`: Wipes all local data, including identities, settings, and databases, returning the app to its initial state.
//
// ### Summary of Locations
// *   `dashboard/static/js/settings.js`: The primary file containing logic for the settings view, toggles, and data maintenance actions.
// *   `dashboard/static/js/identity.js`: Often called by settings to manage identities and status updates.
// *   `dashboard/static/js/tauri_events.js`: Updates the settings UI when backend configuration changes occur.
//
// ### System and Application
// *   `app_settings_updated`: Triggered when global application settings are changed.
// *   `transport_mode_updated`: Triggered when the transport configuration (e.g., bridge mode) changes.
// *   `desktop_notifications_updated`: Confirms changes to notification preferences.
// *   `auto_announce_updated`: Triggered when auto-announcement intervals are changed.
// *   `event` / `event_log` / `network_event`: Generic streams for system and network event logging.
// *   `system_status`: General health and status updates from the backend.
// *   `alert` / `clone_warning`: Critical system warnings or notifications for the user.
//
import {invoke} from "@tauri-apps/api/core";
import {action, makeAutoObservable} from "mobx";
import {info} from "@tauri-apps/plugin-log";
import {Interfaces} from "./Network";

export interface GeneralSettings {
    activity_identity_protection: boolean;
    channel_hosting_enabled: boolean;
    auto_announce_interval: number;
    haptics_enabled?: boolean;
    desktop_notifications?: boolean;
    hide_known_spam_peers: boolean;
    public_channel_consent_required_version: number;
    public_channel_consent_version: number;
    text_scale_percent: number;
    transport_mode?: "on" | "off" | "auto" | undefined;
    theme_family: string;
    theme_mode: string;
    lxmf_limit_1mb: boolean;
    announce_ratspeak_usage: boolean;
    peers_sort: 'name' | 'hops' | 'last_seen';
    hardware_session_timeout: number;
    developer_mode: boolean;
    window_decorations: string;
}

export interface NotificationSettings {
    enabled: boolean;
    ios_stubbed?: boolean;
}

export interface HapticsSettings {
    enabled: boolean;
}

export interface AnnounceSettings {
    enabled: boolean;
}

export interface VersionInfo {
    version: string;
    name: string;
}

export interface DeveloperMode {
    developer_mode: boolean
}

export interface TransportModeSettings {
    configured_enabled: boolean;
    enabled: boolean;
    mode: "on" | "off" | "auto";
    suppressed: boolean;
}

export interface InboxSettings {
    auto_active_node: boolean | null;
    awaiting_discovery: boolean | null;
    client_state: string;
    connected: boolean;
    enabled: boolean;
    enforce_stamps: boolean;
    favor_static: boolean;
    hosting_enabled: boolean;
    local_node_hash: string;
    local_node_message_count: number;
    local_node_stamp_cost: number;
    message_count: number;
    mode: string;
    node_hash: string | null;
    pn_parse_failures: number;
    propagation_node: string | null;
    required_stamp_cost: number;
    static_nodes_known: number;
    sync_state: string;
    transfer_progress: number | null;
    transfer_result: string | null;
    transfer_size: number | null;
}

export interface InboxNode {
    backoff_until: any;
    display_name: string;
    failure_count: number;
    hash: string;
    hops: number;
    last_failure_reason: any;
    last_path_success: number;
    last_seen: number;
    last_success: number;
    node_state: string;
    path_status: string;
    priority: any;
    region: any;
    role: any;
    stamp_cost: number;
    static: boolean;
    transfer_limit_kb: number;
}

export class Settings {

    public general: GeneralSettings | undefined;
    public inbox: InboxSettings | undefined;

    constructor() {

        makeAutoObservable(this, {
            setSettingsInbox: action,
            setSettings: action,
        });

        this.getAppSettings()
            .then((settings: GeneralSettings) => {
                this.setSettings(settings);
            });

        this.getInboxSettings()
            .then((settings: InboxSettings) => {
                this.setSettingsInbox(settings);
            })
    }

    setSettings(settings: GeneralSettings) {
        const previous = this?.general || {};
        this.general = {
            ...previous,
            ...settings
        };
    }

    setSettingsInbox(settings: InboxSettings) {
        const previous = this?.inbox || {};
        this.inbox = {
            ...previous,
            ...settings
        };
    }

    onNetworkInterfacesUpdated(interfaces: Interfaces) {
        const previous = this?.general || {};

        this.setSettings({
            ...previous, ...{
                transport_mode: interfaces.transport.mode
            }
        } as GeneralSettings);
    }

    async getAppSettings(): Promise<GeneralSettings> {
        return new Promise(async (resolve: (value: GeneralSettings) => void, reject: (value: any) => void) => {

            try {

                let settings: GeneralSettings = await invoke<GeneralSettings>('api_app_settings');

                const hsettings: HapticsSettings = await this.getHapticsSettings();
                const nsettings: NotificationSettings = await this.getNotificationSettings();

                return resolve({
                    ...settings, ...{
                        haptics_enabled: hsettings.enabled,
                        desktop_notifications: nsettings.enabled
                    }
                });

            } catch (e) {
                reject(e);
            }
        });
    }

    async getVersion(): Promise<VersionInfo> {
        return await invoke<VersionInfo>('api_version');
    }


    getHapticsSettings(): Promise<HapticsSettings> {
        return new Promise((resolve: (value: HapticsSettings) => void, reject: (value: any) => void) => {
            try {
                return resolve({
                    enabled: localStorage.getItem("rs-haptics-enabled") === '1'
                } as HapticsSettings);

            } catch (e) {
                reject({error: `${e}`});
            }
        });
    }


    setHapticsSettings(enabled: boolean) {
        return new Promise((resolve: (value: HapticsSettings) => void, reject: (value: any) => void) => {
            try {

                localStorage.setItem("rs-haptics-enabled", enabled ? '1' : '0');

                const previous = this?.general || {};

                this.setSettings({
                    ...previous, ...{
                        haptics_enabled: enabled
                    }
                } as GeneralSettings);

                return resolve({
                    enabled: enabled
                } as HapticsSettings);

            } catch (e) {
                reject({error: `${e}`});
            }
        });
    }


    async getNotificationSettings(): Promise<NotificationSettings> {
        return new Promise((resolve: (value: NotificationSettings) => void, reject: (value: any) => void) => {
            invoke<NotificationSettings>('api_notification_settings')
                .then(resolve)
                .catch(reject);
        });
    }

    async setDesktopNotifications(enabled: any): Promise<NotificationSettings> {
        return new Promise((resolve: (value: NotificationSettings) => void, reject: (value: any) => void) => {
            invoke<NotificationSettings>('set_desktop_notifications', {enabled})
                .then((settings: NotificationSettings) => {
                    const previous = this?.general || {};

                    this.setSettings({
                        ...previous, ...{
                            desktop_notifications: settings.enabled
                        }
                    } as GeneralSettings);

                    return resolve(settings);

                }).catch(reject);
        });
    }

    async setAnnounceRatspeakUsage(enabled: boolean): Promise<AnnounceSettings> {
        return new Promise((resolve: (value: NotificationSettings) => void, reject: (value: any) => void) => {
            invoke<AnnounceSettings>('set_announce_ratspeak_usage', {enabled})
                .then((settings: AnnounceSettings) => {
                    const previous = this?.general || {};

                    this.setSettings({
                        ...previous, ...{
                            announce_ratspeak_usage: settings.enabled
                        }
                    } as GeneralSettings);

                    return resolve(settings);

                }).catch(reject);
        });
    }


    async setHostingEnabled(enabled: boolean): Promise<InboxSettings> {
        return new Promise((resolve: (value: any) => void, reject: (value: any) => void) => {
            invoke<InboxSettings>('set_propagation_hosting', {
                args: {enabled: enabled, stamp_cost: this.inbox?.local_node_stamp_cost || 0}
            }).then((settings: InboxSettings) => {
                this.setSettingsInbox(settings);
                return resolve(this.inbox);
            }).catch(reject);
        });
    }


    async setHostingStampSettings(enforce: boolean, required_cost: number): Promise<any> {
        return new Promise((resolve: (value: any) => void, reject: (value: any) => void) => {
            invoke<InboxSettings>('set_stamp_settings', {
                args: {enforce: enforce, required_cost: required_cost}
            }).then((settings: InboxSettings) => {
                this.setSettingsInbox(settings);
                return resolve(this.inbox);
            }).catch(reject);
        });
    }


    async getInboxSettings(): Promise<InboxSettings> {
        return new Promise((resolve: (value: InboxSettings) => void, reject: (value: any) => void) => {
            invoke<InboxSettings>('api_propagation')
                .then((settings: InboxSettings) => {
                    return resolve(settings);
                }).catch(reject);
        });
    }


    async getInboxNodes(): Promise<InboxNode[]> {
        return new Promise((resolve: (value: InboxNode[]) => void, reject: (value: any) => void) => {
            invoke<InboxNode[]>('api_propagation_nodes')
                .then(resolve)
                .catch(reject);
        });
    }


    async setInboxSettings(mode: string, favorStatic: boolean): Promise<any> {
        return new Promise((resolve: (value: any) => void, reject: (value: any) => void) => {
            invoke<InboxSettings>('set_propagation_mode', {
                mode: mode, favorStatic: favorStatic
            }).then((settings: InboxSettings) => {
                this.setSettingsInbox(settings);
                return resolve(this.inbox);
            }).catch(reject);
        });
    }


    async setAutoAnnounce(interval: number): Promise<{ interval: number }> {
        return await invoke('set_auto_announce', {interval});
    }

    async setHardwareLockTimeout(seconds: number): Promise<{ hardware_session_timeout: number }> {
        return await invoke('set_hardware_lock_timeout', {seconds});
    }

    async setPeersSort(sort: 'name' | 'hops' | 'last_seen'): Promise<{ sort: string }> {
        return await invoke('set_peers_sort', {sort});
    }

    async getHubInterfaces(): Promise<any> {
        return await invoke('api_hub_interfaces');
    }

    async triggerAnnounce(): Promise<any> {
        return await invoke('trigger_announce');
    }

    setTransportMode(mode: string, network_type: string = "unknown") {
        return new Promise((resolve: (value: TransportModeSettings) => void, reject: (value: any) => void) => {
            invoke<TransportModeSettings>('set_transport_mode', {args: {mode: mode, network_type: network_type}})
                .then((settings: TransportModeSettings) => {
                    const previous = this?.general || {};

                    this.setSettings({
                        ...previous, ...{
                            transport_mode: settings.mode
                        }
                    } as GeneralSettings);

                    return resolve(settings);

                }).catch(reject);
        });
    }

    async setDeveloperMode(enabled: boolean): Promise<DeveloperMode> {
        return new Promise((resolve: (value: DeveloperMode) => void, reject: (value: any) => void) => {
            invoke<DeveloperMode>('set_developer_mode', {enabled})
                .then((settings: DeveloperMode) => {
                    const previous = this?.general || {};

                    this.setSettings({
                        ...previous, ...{
                            developer_mode: settings.developer_mode
                        }
                    } as GeneralSettings);

                    return resolve(settings);

                }).catch(reject);
        });
    }


    async clearPaths(): Promise<{ cleared: number }> {
        return new Promise((resolve: (value: any) => void, reject: (value: any) => void) => {
            invoke<any>('api_clear_paths')
                .then((data: { cleared: number }) => {
                    return resolve(data);
                })
                .catch(reject);
        });
    }

    async clearAnnounces(): Promise<{ recent_cleared: number, peers_cleared: number }> {
        return new Promise((resolve: (value: any) => void, reject: (value: any) => void) => {
            invoke<any>('api_clear_announces')
                .then((data: { peers_cleared: number, recent_cleared: number }) => {
                    return resolve(data);
                })
                .catch(reject);
        });
    }

    async clearMessages(): Promise<null> {
        return new Promise((resolve: (value: null) => void, reject: (value: any) => void) => {
            invoke<null>('api_clear_messages')
                .then(resolve)
                .catch(reject);
        });
    }

    async clearContacts(): Promise<null> {
        return new Promise((resolve: (value: null) => void, reject: (value: any) => void) => {
            invoke<null>('api_clear_contacts')
                .then(resolve)
                .catch(reject);
        });
    }

    async resetDatabase(): Promise<null> {
        return new Promise((resolve: (value: null) => void, reject: (value: any) => void) => {
            invoke<null>('api_reset_database')
                .then(resolve)
                .catch(reject);
        });
    }

    async factoryReset(): Promise<any> {
        return new Promise((resolve: (value: any) => void, reject: (value: any) => void) => {
            invoke<any>('api_factory_reset')
                .then((data: any) => {
                    info(`${JSON.stringify(data)}`)
                    return resolve(data);
                })
                .catch(reject);
        });
    }
}
