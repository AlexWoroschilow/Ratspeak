"use strict";
import React, {lazy, Suspense} from "react";
import {PeerEnriched} from "../../ApplicationStore/Peers";
import {PeerInterfaceBadge} from "./../components/PeerInterface";
import {PeerName} from "./../components/PeerName";
import {PeerHops} from "./../components/PeerHops";

const Blockie = lazy(() => import('./../components/Blockie'));

interface RowProps {
    peer: PeerEnriched | undefined;
    selected?: PeerEnriched | undefined;
    onSelectedPeer?: (peer: PeerEnriched | undefined) => void
}

interface PeersState {

}

export class Row extends React.PureComponent<RowProps, PeersState> {

    onSelectedPeer() {
        this?.props?.onSelectedPeer?.(this.props.peer);
    }

    isSelected() {
        return this?.props?.peer?.hash
            === this?.props?.selected?.hash;
    }

    render() {

        const {peer} = this.props;

        return <>
            <div className={`peers-row ${this?.isSelected() && "selected"} [has-profile-status]`} onClick={this.onSelectedPeer.bind(this)}>
                <span className={`conn-status-dot status-${peer?.status}`}></span>

                {/*<div className="peers-row-avatar">*/}
                {/*    <Suspense fallback={<div>...</div>}>*/}
                {/*        <Blockie seed={peer?.identity_hash} size={50}/>*/}
                {/*    </Suspense>*/}
                {/*</div>*/}

                <span className="peers-row-main">
                    <span className="peers-row-name [is-hash]">
                        <PeerName peer={peer}/>
                    </span>
                    <span className="peers-row-status" title={`${peer?.profile_status}`}>
                        {peer?.profile_status}
                    </span>
                </span>
                <span className="peers-row-meta">
                        {(peer?.hops != undefined) && <>
                            <div className="peer-meta">
                                <PeerHops peer={peer}/>
                            </div>
                        </>}

                    {(peer?.iface_is_live && peer?.iface) && <>
                        <div className="peer-meta">
                            <PeerInterfaceBadge peer={peer}/>
                        </div>
                    </>}


                </span>
            </div>
        </>
    }
}
