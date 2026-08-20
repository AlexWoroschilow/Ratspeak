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
import {makeAutoObservable} from "mobx";
import {info} from "@tauri-apps/plugin-log";

export interface AppSettings {
    auto_announce_interval: number;
    announce_ratspeak_usage: boolean;
    peers_sort: 'name' | 'hops' | 'last_seen';
    hardware_session_timeout: number;
    developer_mode: boolean;
    window_decorations: string;
}

export interface NotificationSettings {
    enabled: boolean;
    ios_stubbed: boolean;
}

export interface VersionInfo {
    version: string;
    name: string;
}

export class Settings {
    constructor() {
        makeAutoObservable(this);
    }

    async getAppSettings(): Promise<AppSettings> {
        return await invoke<AppSettings>('api_app_settings');
    }

    async getVersion(): Promise<VersionInfo> {
        return await invoke<VersionInfo>('api_version');
    }

    async getNotificationSettings(): Promise<NotificationSettings> {
        return await invoke<NotificationSettings>('api_notification_settings');
    }

    async setDesktopNotifications(enabled: boolean): Promise<{ enabled: boolean }> {
        return await invoke('set_desktop_notifications', {enabled});
    }

    async setAnnounceRatspeakUsage(enabled: boolean): Promise<{ enabled: boolean }> {
        return await invoke('set_announce_ratspeak_usage', {enabled});
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

    async setDeveloperMode(enabled: boolean): Promise<{ developer_mode: boolean }> {
        return await invoke('set_developer_mode', {enabled});
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
