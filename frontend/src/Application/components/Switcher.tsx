"use strict";
import React from "react";


export interface SwitchSuccessful {
    message: string;
}

export interface SwitchFailed {
    error: string;
}

interface SwitcherProps {
    name?: string;
    value?: string | number;
    onChanged?: (value: string | number) => Promise<SwitchSuccessful>;
    states?: Array<{
        value: string | number;
        name: string;
        isDefault?: boolean;
    }>
}

interface SwitcherState {
    message?: string | undefined;
    error?: string | undefined;
}

export class Switcher extends React.Component<SwitcherProps, SwitcherState> {
    constructor(props: SwitcherProps) {
        super(props);

        this.state = {
            message: undefined,
            error: undefined,
        }
    }

    onChanged(event: any) {
        this?.props?.onChanged?.(event.target.value)
            .then(this.onSuccessful.bind(this))
            .catch(this.onFailed.bind(this));

        this.setState({
            message: undefined,
            error: undefined,
        })
    }

    onSuccessful(value: SwitchSuccessful) {
        this.setState({message: value?.message || "Successful!"});
        let timeout = setTimeout(() => {
            clearTimeout(timeout);
            this.setState({message: undefined});
        }, 3000);
    }

    onFailed(value: SwitchFailed) {
        this.setState({error: value?.error || "Successful!"});
        let timeout = setTimeout(() => {
            clearTimeout(timeout);
            this.setState({error: undefined});
        }, 3000);
    }


    getName(length = 16) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(36)).join('').substring(0, length);
    }

    render() {

        let {states, name, value} = this?.props;
        let {error, message} = this?.state;

        (states == undefined) &&
        (states = [
            {value: 1, name: "On"},
            {value: 0, name: "Off", isDefault: true},
        ]);

        (name == undefined) &&
        (name = this.getName());

        return <>
            <div className="settings-radio-group" role="radiogroup">
                {(message != undefined) && <>
                    <div>{message}</div>
                </>}
                {(error != undefined) && <>
                    <div>{error}</div>
                </>}


                {(message == undefined && error == undefined) && <>
                    {states?.map?.((item) => {
                        return <label className="settings-radio-option">
                            <input type="radio"
                                   name={`${name}`}
                                   value={item.value}
                                   defaultChecked={value == item?.value}
                                   onChange={this.onChanged.bind(this)}/>
                            <span>{item.name}</span>
                        </label>
                    })}
                </>}


            </div>

        </>
    }
}
