"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityInfo} from "../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";

interface ExportProps {
    entity: IdentityInfo;
    identity?: IdentityStore;
    onSuccess: () => void;
    onCancel: () => void;
}

interface ExportState {
}

@inject("identity")
@observer
export class Export extends React.PureComponent<ExportProps, ExportState> {
    constructor(props: ExportProps) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            entity,
        } = this.props;

        const {} = this.state;

        return <div className={"Export"}>
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
