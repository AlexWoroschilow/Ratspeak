"use strict";
import React from "react";
import {IdentityInfo} from "../../ApplicationStore/Identity";

interface RowProps {
    identity: IdentityInfo;
    isActive: boolean;
    onActivate: (hash: string) => void;
    onSelected: (identity: IdentityInfo) => void;
    onDelete: (hash: string) => void;
}

export class Row extends React.PureComponent<RowProps> {

    render() {
        const {identity, isActive, onActivate, onDelete} = this.props;

        return (
            <div className={`peers-row ${isActive ? "selected" : ""}`} onClick={this.props.onSelected.bind(this, identity)}>
                <span className={`conn-status-dot ${isActive ? "status-online" : ""}`}></span>

                <span className="peers-row-main">
                    <span className="peers-row-name">
                        {identity.nickname || "Unnamed Identity"}
                    </span>
                    <span className="peers-row-status" title={identity.hash}>
                        {identity.hash}
                    </span>
                </span>

                <span className="peers-row-meta">
                    {identity.is_hardware && (
                        <div className="peer-meta" title="Hardware Security Key">
                            HW
                        </div>
                    )}
                    {identity.has_passcode && (
                        <div className="peer-meta" title="Passcode Protected">
                            🔒
                        </div>
                    )}
                    {!isActive && (
                        <div className="peer-meta action-delete" onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Are you sure you want to delete this identity?")) {
                                onDelete(identity.hash);
                            }
                        }}>
                            🗑️
                        </div>
                    )}
                </span>
            </div>
        );
    }
}
