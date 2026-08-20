"use strict";
import React from "react";
import {info} from "@tauri-apps/plugin-log";

interface SwitcherProps {
    name?: string,
    states?: Array<{
        value: string | number;
        name: string;
        isDefault?: boolean;
    }>
}

interface SwitcherState {
}

export class Switcher extends React.Component<SwitcherProps, SwitcherState> {
    constructor(props: SwitcherProps) {
        super(props);
    }

    onStateChanged(event: any) {
        info(`${JSON.stringify(event)}`);
    }

    render() {

        let {states, name} = this?.props;

        (states == undefined) &&
        (states = [
            {value: "on", name: "On"},
            {value: "off", name: "Off", isDefault: true},
        ])


        return <>
            <div className="settings-radio-group" role="radiogroup">
                {states?.map?.((item) => {
                    return <label className="settings-radio-option">
                        <input type="radio"
                               name={`${name}`}
                               value={item.value}
                               defaultChecked={item?.isDefault || false}
                               onChange={this.onStateChanged}/>

                        <span>{item.name}</span>
                    </label>
                })}
            </div>

        </>
    }
}
