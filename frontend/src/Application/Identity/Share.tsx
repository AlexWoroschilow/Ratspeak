"use strict";
import React from 'react';
import {ContactCard, Identity as IdentityStore, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";
import {info} from "@tauri-apps/plugin-log";
import QRCode from "react-qr-code";
import "./Share.scss";


interface ShareProps {
    entity: IdentityInfo;
    identity?: IdentityStore;
    onSuccess: () => void;
    onCancel: () => void;
}

interface ShareState {
    card: ContactCard | undefined;
}

@inject("identity")
@observer
export class Share extends React.PureComponent<ShareProps, ShareState> {
    constructor(props: ShareProps) {
        super(props);
        this.state = {
            card: undefined,
        };
    }


    componentDidMount() {
        const {entity, identity} = this.props;

        identity?.getContactCard?.(entity)
            .then((card: ContactCard) => {
                this.setState({card: card});
            });
    }

    render() {
        const {card} = this.state;

        return <div className={"Share"}>
            <div className="identity-passcode-fields">
                {(card?.payload != undefined) && <>
                    <QRCode
                        size={400}
                        value={card.payload}
                        viewBox={`0 0 256 256`}
                    />
                </>}
            </div>


            <div className="bottom-sheet-footer">
                <button
                    className="rs-dialog-confirm"
                    id="identity-modal-confirm"
                    onClick={this.props.onSuccess}>
                    {"Close"}
                </button>
            </div>
        </div>
    }
}
