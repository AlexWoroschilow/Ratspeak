"use strict";
import React from "react";

import "./Status.scss";
import {TfiImport} from "react-icons/tfi";
import {FiTool} from "react-icons/fi";
import {IoMdAdd} from "react-icons/io";

interface StatusProps {
    onChangedSearch?: (query: string) => void;
}

interface StatusState {
    searchQuery: string;
}

export default class Status extends React.PureComponent<StatusProps, StatusState> {
    constructor(props: StatusProps) {
        super(props);

        this.state = {
            searchQuery: "",
        }
    }

    onChangedSearch(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchQuery: event.target.value
        }, () => {
            this?.props?.onChangedSearch?.(this.state.searchQuery);
        });
    }

    render() {

        const {searchQuery} = this.state;

        return <>
            <div className={"Status"}>
                <div className="network-pulse" id="network-pulse">
                    <div className="pulse-throughput">
                        <input type="text" className="conn-search-input"
                               placeholder="Search..." autoCorrect="off" autoCapitalize="none"
                               spellCheck="false" value={searchQuery} onChange={this.onChangedSearch.bind(this)}/>
                    </div>

                    <div className="pulse-actions">
                        <a className={`nr-btn nr-btn-xs`}
                           href={"#identity-import"}
                           data-filter={"all"}
                           data-type={'all'}>
                            <TfiImport size={12}/>
                            Import
                        </a>
                        <a className={`nr-btn nr-btn-xs`}
                           href={"#identity-hardware"}
                           data-filter={"all"}
                           data-type={'all'}>
                            <FiTool size={12}/>
                            Hardware
                        </a>
                        <a className={`nr-btn nr-btn-xs`}
                           href={"#identity-create"}
                           data-filter={"all"}
                           data-type={'all'}>
                            <IoMdAdd size={12}/>
                            Create
                        </a>
                    </div>
                </div>
            </div>
        </>
    }
}