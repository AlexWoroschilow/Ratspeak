import React from 'react';
import {PeerEnriched} from '../../ApplicationStore/Peers';
import {info} from "@tauri-apps/plugin-log";


interface PeerInterfaceBadgeProps {
    peer?: PeerEnriched | undefined;
}

export const PeerHops: React.FC<PeerInterfaceBadgeProps> = ({peer}) => {


    return <>
        <span
            className={`peers-iface-badge`}
            style={{
                fontSize: '10px',
                fontWeight: 'bold',
                padding: '2px 4px',
                borderRadius: '4px',
                backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                color: 'var(--accent-color)',
                textTransform: 'uppercase'
            }}>
            Hops: {peer?.hops}
        </span>
    </>;
};