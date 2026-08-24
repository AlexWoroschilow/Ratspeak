"use strict";
import React from "react";
import {inject, observer} from "mobx-react";
import {Settings as SettingsStore} from "../../ApplicationStore/Settings";
import {Confirmation} from "./Reset/Confirmation";

interface ResetProps {
    settings?: SettingsStore | undefined;

}

interface ResetState {
}

@inject("settings")
@observer
export class Reset extends React.Component<ResetProps, ResetState> {
    constructor(props: ResetProps) {
        super(props);
    }

    onClearMessages() {
        const {settings} = this.props;

        return new Promise((resolve, reject) => {
            settings?.clearMessages?.()
                .then(resolve)
                .catch(reject)
        });
    }

    onClearContacts() {
        const {settings} = this.props;

        return new Promise((resolve, reject) => {
            settings?.clearContacts?.()
                .then(resolve)
                .catch(reject)
        });
    }

    onClearDatabase() {
        const {settings} = this.props;

        return new Promise((resolve, reject) => {
            settings?.resetDatabase?.()
                .then(resolve)
                .catch(reject)
        });
    }


    onClearEverything() {
        const {settings} = this.props;

        return new Promise((resolve, reject) => {
            settings?.factoryReset?.()
                .then(resolve)
                .catch(reject)
        });
    }


    onClearAnnounces() {
        const {settings} = this.props;

        return new Promise((resolve, reject) => {
            settings?.clearAnnounces?.()
                .then(resolve)
                .catch(reject)
        });
    }


    onClearPathes() {
        const {settings} = this.props;

        return new Promise((resolve, reject) => {
            settings?.clearPaths?.()
                .then(resolve)
                .catch(reject)
        });
    }

    render() {

        return <>
            <section className="settings-detail-pane" aria-labelledby="settings-detail-title">
                <div className="settings-page-inner settings-detail-panels">
                    <div className="panel settings-panel settings-panel-selected">
                        <div className="panel-header">Reset</div>
                        <div className="panel-body">

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Cache</span>
                                    <span className="settings-row-desc">Safe to clear at any time. Data re-populates automatically.</span>
                                </div>
                            </div>
                            <div className="rs-dialog-choices">
                                <Confirmation
                                    title={"Clear Paths"}
                                    description={"Cached network routes"}
                                    message={"The Pathes were successfully cleared"}
                                    onProcess={this.onClearPathes.bind(this)}/>

                                <Confirmation
                                    title={"Clear Announces"}
                                    description={"Announce history"}
                                    message={"The Announces were successfully cleared"}
                                    onProcess={this.onClearAnnounces.bind(this)}/>

                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Data</span>
                                    <span className="settings-row-desc">Permanently removes content. Cannot be undone.</span>
                                </div>
                            </div>
                            <div className="rs-dialog-choices">
                                <Confirmation
                                    title={"Delete Messages"}
                                    description={"All conversation history"}
                                    confirmation={"Are you sure you want to clear the conversation history?"}
                                    message={"The conversation history was successfully cleared"}
                                    onProcess={this.onClearMessages.bind(this)}/>

                                <Confirmation
                                    title={"Delete Contacts"}
                                    description={"All saved contacts"}
                                    confirmation={"Are you sure you want to clear all saved contacts?"}
                                    message={"The contacts were successfully cleared"}
                                    onProcess={this.onClearContacts.bind(this)}/>

                                <Confirmation
                                    title={"Reset database"}
                                    description={"Clear all messages and contacts."}
                                    confirmation={"Are you sure you want to clear all messages and contacts?"}
                                    message={"All messages and contacts cleared"}
                                    onProcess={this.onClearDatabase.bind(this)}/>
                            </div>

                            <div className="settings-row">
                                <div className="settings-row-info">
                                    <span className="settings-row-label">Factory Reset</span>
                                    <span className="settings-row-desc">Delete everything. No going back. Fresh start.</span>
                                </div>
                            </div>
                            <div className="rs-dialog-choices">
                                <Confirmation
                                    title={"Reset Everything"}
                                    description={"Permanently removes everything"}
                                    confirmation={"Are you absolutely sure? All identities and data will be permanently deleted."}
                                    message={"The Factory Reset was successful"}
                                    onProcess={this.onClearEverything.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    }
}
