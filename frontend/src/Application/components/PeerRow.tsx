"use strict";
import React, {lazy} from "react";
import {PeerEnriched} from "../../ApplicationStore/Peers";
import {PeerInterfaceBadge} from "./PeerNetworkView";
import {PeerName} from "./PeerName";

const Blockie = lazy(() => import('./Blockie'));

interface PeersProps {
    peer: PeerEnriched | undefined;
    selected?: PeerEnriched | undefined;
    onSelectedPeer?: (peer: PeerEnriched | undefined) => void
}

interface PeersState {

}

export default class PeerRow extends React.PureComponent<PeersProps, PeersState> {

    onSelectedPeer() {
        this?.props?.onSelectedPeer?.(this.props.peer);
    }

    isSelected() {
        return this?.props?.peer?.hash
            === this?.props?.selected?.hash;
    }

    render() {

        return <>
            <div className={`peers-row ${this?.isSelected() && "selected"} [has-profile-status]`} onClick={this.onSelectedPeer.bind(this)}>
                <span className={`conn-status-dot status-${this.props.peer?.status}`}></span>

                {/*<div className="peers-row-avatar">*/}
                {/*    /!*<Suspense fallback={<div>{this.getAvatar()}</div>}>*!/*/}
                {/*    /!*    <Blockie seed={this.props.peer.identity_hash} size={50}/>*!/*/}
                {/*    /!*</Suspense>*!/*/}
                {/*</div>*/}

                <span className="peers-row-main">
                    <span className="peers-row-name [is-hash]">
                        <PeerName peer={this?.props?.peer}/>
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
