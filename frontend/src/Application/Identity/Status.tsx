"use strict";
import React from "react";

import "./Status.scss";
import {TfiImport} from "react-icons/tfi";
import {FiTool} from "react-icons/fi";
import {IoMdAdd} from "react-icons/io";

interface StatusProps {
}

interface StatusState {
}

export default class Status extends React.PureComponent<StatusProps, StatusState> {
    constructor(props: StatusProps) {
        super(props);

    }

    render() {

        return <>
            <div className={"Status"}>
                <div className="network-pulse" id="network-pulse">
                    <div className="pulse-throughput">
                        <input type="text" className="conn-search-input"
                               placeholder="Search..." autoCorrect="off" autoCapitalize="none"
                               spellCheck="false"/>
                    </div>

                    <div className="pulse-actions">
                        <button className={`nr-btn nr-btn-xs`}
                                data-filter={"all"}
                                data-type={'all'}>
                            <TfiImport size={12}/>
                            Import
                        </button>
                        <button className={`nr-btn nr-btn-xs`}
                                data-filter={"all"}
                                data-type={'all'}>
                            <FiTool size={12}/>
                            Hardware
                        </button>
                        <button className={`nr-btn nr-btn-xs`}
                                data-filter={"all"}
                                data-type={'all'}>
                            <IoMdAdd size={12}/>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </>
    }
}