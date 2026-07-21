"use strict";
import React, {lazy, Suspense} from "react";
import {Peer, PeerEnriched} from "../../ApplicationStore/Peers";
import {PeerInterfaceBadge} from "./PeerNetworkView";

const Blockie = lazy(() => import('./Blockie'));

interface PeersProps {
    peer: PeerEnriched
}

interface PeersState {
    test: boolean
}

export default class PeerView extends React.PureComponent<PeersProps, PeersState> {

    constructor(props: PeersProps) {
        super(props);
    }

    getShortHash(fullHash: string, front: number = 8, back: number = 4) {
        if (!fullHash) return '';
        front = front || 8;
        back = back || 4;
        if (fullHash.length <= front + back + 1) return fullHash;
        return fullHash.substring(0, front) + '\u2026' + fullHash.slice(-back);
    }

    getPeerName(peer: Peer, truncate = true): string {
        if (!peer) return '';
        let displayName = peer.display_name || this.getShortHash(peer.hash, 8, 4);
        // Apply truncation logic consistent with the UI (line 378)
        if (truncate && displayName.length > 40) {
            displayName = displayName.substring(0, 40) + '\u2026';
        }
        return displayName;
    }

    getAvatar(size: number = 50) {
        var color = 'var(--text-muted)';
        var radius = size / 2;
        return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
                    style={{
                        display: "block",
                        borderRadius: "50%",
                        clipPath: "circle(50% at 50% 50%)",
                        overflow: "hidden"
                    }}>
            <circle cx={radius} cy={radius} r={radius} fill={color} opacity="0.3"/>
        </svg>
    }

    render() {

        return <>
            <div className="peers-row [selected] [has-profile-status]" data-hash={this.props.peer.hash}>
                <span className={`conn-status-dot status-${this.props.peer?.status}`}></span>

                <div className="peers-row-avatar">
                    <Suspense fallback={<div>{this.getAvatar()}</div>}>
                        <Blockie seed={this.props.peer.identity_hash} size={50}/>
                    </Suspense>
                </div>

                <span className="peers-row-main">
                    <span className="peers-row-name [is-hash]">
                        {this.getPeerName(this.props.peer)}
                    </span>
                    <span className="peers-row-status" title={`${this.props.peer?.profile_status}`}>
                        {this.props.peer?.profile_status}
                    </span>
                </span>
                <span className="peers-row-meta">
                    Hops: {this?.props?.peer?.hops}
                    <div className="peer-meta">
                        <PeerInterfaceBadge peer={this.props.peer}/>
                    </div>
                </span>
            </div>
        </>
    }
}
