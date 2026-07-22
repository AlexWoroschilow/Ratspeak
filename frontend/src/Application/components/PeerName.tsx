import React from "react";
import {PeerEnriched} from "../../ApplicationStore/Peers";

interface PeerNameProps {
    peer?: PeerEnriched | undefined;
    truncate?: boolean;
    className?: string;
}

const getShortHash = (fullHash: string, front: number = 8, back: number = 4): string => {
    if (!fullHash) return '';
    if (fullHash.length <= front + back + 1) return fullHash;
    return fullHash.substring(0, front) + '\u2026' + fullHash.slice(-back);
};

const getPeerName = (peer: PeerEnriched | undefined, truncate: boolean = true): string => {
    if (!peer) return '';
    let displayName = peer?.display_name || getShortHash(peer?.hash, 8, 4);

    if (truncate && displayName.length > 40) {
        displayName = displayName.substring(0, 40) + '\u2026';
    }
    return displayName;
};

export const PeerName: React.FC<PeerNameProps> = ({peer, truncate = true, className}) => {
    return (
        <span className={`peer-name ${className || ''}`}>
            {getPeerName(peer, truncate)}
        </span>
    );
};
