"use strict";
import React from "react";

import "./Status.scss";

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
                    <input type="text" className="conn-search-input" placeholder="Search..." autoCorrect="off" autoCapitalize="none"
                           spellCheck="false" value={searchQuery} onChange={this.onChangedSearch.bind(this)}/>
                </div>
            </div>
        </>
    }
}