"use strict";
import React from "react";
import {Import} from "./Identity/Import";

interface IdentityImportProps {
}

interface IdentityImportState {
}


export class IdentityImport extends React.Component<IdentityImportProps, IdentityImportState> {
    constructor(props: IdentityImportProps) {
        super(props);
    }

    render() {

        return <>
            <div className="view" id="view-identity">
                <div className="bottom-sheet-header">
                    <div className="bottom-sheet-title">Import Identity</div>
                </div>
                <div className="bottom-sheet-body">

                    <div className="rs-dialog-message">
                        Choose the source format.
                    </div>
                    <Import/>
                </div>
            </div>
        </>
    }
}
