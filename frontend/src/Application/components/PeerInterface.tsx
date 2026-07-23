import React from 'react';
import {PeerEnriched} from '../../ApplicationStore/Peers';
import {info} from "@tauri-apps/plugin-log";

/**
 * Maps long interface names to compact labels for the UI.
 * Replicates the logic from dashboard/static/js/peers.js:ifaceShortLabel
 */
const getIfaceShortLabel = (name: string | null): string => {
    if (!name) return '';
    const lower = name.toLowerCase();
    if (lower.indexOf('ble_peer') === 0 || lower.indexOf('ble peer') === 0 ||
        lower.indexOf('ble mesh') === 0 || lower.indexOf('bluetooth peer') === 0) return 'BLE';
    if (lower.indexOf('ble_rnode') === 0 || lower.indexOf('rnode_ble') === 0) return 'LoRa (BLE)';
    if (lower.indexOf('rnode') === 0 || lower.indexOf('serial') === 0 ||
        lower.indexOf('kiss') === 0) return 'LoRa';
    if (lower.indexOf('androidusb') === 0 || lower.indexOf('android_usb') === 0) return 'LoRa (USB)';
    if (lower.indexOf('local') === 0 || lower.indexOf('shared') === 0) return 'Local';
    if (lower.indexOf('udp') === 0) return 'UDP';
    if (lower.indexOf('backbone') === 0) return 'BB';
    if (lower.indexOf('tcp') === 0 || lower.indexOf(':') > 0) return 'TCP';
    return name;
};

interface PeerInterfaceBadgeProps {
    peer?: PeerEnriched | undefined;
    className?: string;
}

export const PeerInterfaceBadge: React.FC<PeerInterfaceBadgeProps> = ({peer, className}) => {
    // Only render the badge if the interface is currently live
    if (!peer?.iface_is_live || !peer?.iface) {
        return null;
    }

    const shortLabel = getIfaceShortLabel(peer?.iface);


    return <>
        <span
            className={`peers-iface-badge ${className || ''}`}
            title={`Live via ${peer.iface}`}
            style={{
                fontSize: '10px',
                fontWeight: 'bold',
                padding: '2px 4px',
                borderRadius: '4px',
                backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                color: 'var(--accent-color)',
                textTransform: 'uppercase'
            }}>
            {shortLabel}
        </span>
    </>;
};