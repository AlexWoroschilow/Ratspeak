"use strict";
import React from "react";
import Status from "./Identity/Status";
import "./Identity.scss";
import {inject, observer} from "mobx-react";
import {Row} from "./Identity/Row";
import {Preview} from "./Identity/Preview";
import {Identity as IdentityStore, IdentityInfo} from "../ApplicationStore/Identity";
import {info} from "@tauri-apps/plugin-log";

interface IdentityProps {
    identity: IdentityStore;
}

interface IdentityState {
    searchQuery: string;
    selected: IdentityInfo | undefined;
}

@inject("identity")
@observer
export class Identity extends React.Component<IdentityProps, IdentityState> {
    constructor(props: IdentityProps) {
        super(props);

        this.state = {
            searchQuery: "",
            selected: undefined,
        }
    }

    onChangedSearch(query: string) {
        this.setState({
            searchQuery: `${query}`
        });
    }

    onIdentityDelete(entity: IdentityInfo) {
        this.setState({selected: undefined});
    }

    onIdentitySelected(identity: IdentityInfo) {
        this.setState({selected: identity});
    }

    render() {
        const {collection, active} = this?.props?.identity;
        let {searchQuery, selected} = this.state;

        let filtered = collection;
        if (searchQuery?.length > 0) {
            filtered = filtered.filter((identity: IdentityInfo) => {
                const name = `${identity?.nickname || identity?.hash}`;
                return name.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }

        (selected == undefined && filtered?.length > 0) &&
        (selected = filtered[0] as IdentityInfo);


        return <>
            <div className={"Identity"}>
                <div className="view view-peers">
                    <div className="network-layout">

                        <Status onChangedSearch={this.onChangedSearch.bind(this)}/>

                        <div className="network-main">

                            <nav className="scrollable">
                                {filtered.map((item) => (
                                    <Row
                                        key={item.hash}
                                        identity={item}
                                        isActive={selected?.hash === item.hash}
                                        onSelected={this.onIdentitySelected.bind(this, item)}
                                    />
                                ))}
                            </nav>


                            <div className="peers-detail">
                                {selected && (
                                    <Preview onIdentityDelete={this.onIdentityDelete.bind(this, selected)} entity={selected}/>
                                )}
                            </div>

                        </div>


                    </div>
                </div>


            </div>
        </>
    }
}
