"use strict";
import React from "react";
import {IdentityInfo} from "../../ApplicationStore/Identity";
import {IoCheckmarkCircleOutline, IoCloseCircleOutline, IoKeyOutline} from "react-icons/io5";
import {FiTool} from "react-icons/fi";
import {FaChevronRight} from "react-icons/fa";
import {RiBaseStationLine} from "react-icons/ri";

interface RowProps {
    identity: IdentityInfo;
    isActive: boolean;
    onSelected: (identity: IdentityInfo) => void;
}

export class Row extends React.PureComponent<RowProps> {

    render() {
        const {identity, isActive} = this.props;

        return (
            <div className={`peers-row ${isActive ? "selected" : ""}`} onClick={this.props.onSelected.bind(this, identity)}>
                <span className="peers-row-main">
                    <span className="peers-row-name">
                        {(identity?.is_active == true) && <>
                            <RiBaseStationLine size={12} color={"#0000ff"}/> &nbsp;
                        </>}
                        {identity.nickname || "Unnamed Identity"}
                    </span>
                    <span className="peers-row-status" title={identity.hash}>
                        {identity.hash}
                    </span>
                </span>

                <span className="peers-row-meta">
                    {identity.is_hardware && (
                        <div className="peer-meta" title="Hardware Security Key">
                            <FiTool size={20}/>
                        </div>
                    )}
                    {identity?.passcode_protected && (
                        <div className="peer-meta" title="Passcode Protected">
                            <IoKeyOutline size={20}/>
                        </div>
                    )}
                </span>
            </div>
        );
    }
}
