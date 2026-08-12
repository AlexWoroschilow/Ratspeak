"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";

interface ShareProps {
    entity: IdentityInfo;
    identity?: IdentityStore;
    onSuccess: () => void;
    onCancel: () => void;
}

interface ShareState {
}

@inject("identity")
@observer
export class Share extends React.PureComponent<ShareProps, ShareState> {
    constructor(props: ShareProps) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            entity,
        } = this.props;

        const {} = this.state;

        return <div className={"Share"}>
            <div className="identity-passcode-fields">
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
