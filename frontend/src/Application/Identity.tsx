"use strict";
import React from "react";
import Status from "./Identity/Status";
import {observer} from "mobx-react";
import {identity} from "../ApplicationStore";
import {Row} from "./Identity/Row";
import {Preview} from "./Identity/Preview";

interface IdentityProps {
}

interface IdentityState {
}

@observer
export class Identity extends React.Component<IdentityProps, IdentityState> {
    constructor(props: IdentityProps) {
        super(props);
    }

    render() {
        const {collection, active} = identity;

        return <>
            <div className={"Identity"}>
                <div className="view view-peers">
                    <div className="network-layout">

                        <Status/>

                        <div className="network-main">

                            <nav className="scrollable">
                                {collection.map((item) => (
                                    <Row
                                        key={item.hash}
                                        identity={item}
                                        isActive={active?.hash === item.hash}
                                        onActivate={(hash) => identity.activateIdentity(hash)}
                                        onDelete={(hash) => identity.deleteIdentity(hash)}
                                    />
                                ))}
                            </nav>


                            <div className="peers-detail">
                                {active && (
                                    <Preview
                                        identity={active}
                                        onUpdateNickname={(nickname) => identity.setDisplayName(nickname)}
                                    />
                                )}
                            </div>

                        </div>


                    </div>
                </div>


            </div>
        </>
    }
}
