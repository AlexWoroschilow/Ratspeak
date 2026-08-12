"use strict";
import React from "react";
import {info} from "@tauri-apps/plugin-log";

interface IdentityShareProps {
    hash?: string;
}


interface IdentityShareState {
}


export class IdentityShare extends React.Component<IdentityShareProps, IdentityShareState> {
    constructor(props: IdentityShareProps) {
        super(props);

        info(`${JSON.stringify(this?.props)}`)

    }

    render() {

        return <>
            <div className="view" id="view-identity">
                <div className="bottom-sheet-header">
                    <div className="bottom-sheet-title">Share Identity</div>
                </div>
                <div className="bottom-sheet-body">
                </div>
                <div className="bottom-sheet-footer">
                    <a href={"#identity"} className="rs-dialog-cancel">Cancel</a>
                </div>
            </div>
        </>
    }
}
