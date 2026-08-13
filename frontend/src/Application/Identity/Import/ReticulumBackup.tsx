"use strict";
import React from 'react';
import {Identity as IdentityStore, IdentityImportError, IdentityImportPreview} from "../../../ApplicationStore/Identity";
import {inject, observer} from "mobx-react";
import {open} from '@tauri-apps/plugin-dialog';
import {readFile} from '@tauri-apps/plugin-fs';
import {info} from "@tauri-apps/plugin-log";
import {MdClear} from "react-icons/md";
import {CiImport} from "react-icons/ci";

interface ReticulumBackupProps {
    identity?: IdentityStore;
}

interface ReticulumBackupState {
    message: string | undefined;
    error: string | undefined;
    file: string | null;
    preview: IdentityImportPreview | undefined;
}

@inject("identity")
@observer
export class ReticulumBackup extends React.PureComponent<ReticulumBackupProps, ReticulumBackupState> {
    public downloadRef: React.RefObject<HTMLAnchorElement | null>;


    constructor(props: ReticulumBackupProps) {
        super(props);
        this.state = {
            preview: undefined,
            message: undefined,
            error: undefined,
            file: null,
        };

        this.downloadRef = React.createRef();
    }

    onError(error: IdentityImportError) {
        info(`onError: ${JSON.stringify(error)}`);
        this.setState({error: error.message})
    }


    onSelectFile() {
        const {identity} = this.props;

        open({
            multiple: false,
            directory: false,
            filters: [
                {
                    name: 'Reticulum Identity Backup',
                    extensions: ["identity", "txt"],
                },
            ],
        }).then((filePath: string | null) => {
            this.setState({file: filePath});
        }).catch(this.onError.bind(this));
    }

    onImportFile() {
        const {identity} = this.props;
        const {file, preview} = this.state;

        (file && preview == undefined) &&
        readFile(file).then((content: Uint8Array) => {
            identity?.importIdentityBase64Preview?.(content)
                .then((preview: IdentityImportPreview) => {
                    this.setState({
                        error: undefined,
                        preview: preview
                    });
                }).catch(this.onError.bind(this));
        }).catch(this.onError.bind(this));


        (file && preview != undefined) &&
        readFile(file).then((content: Uint8Array) => {
            identity?.importIdentityBase64?.(content)
                .then((preview: IdentityImportPreview) => {
                    this.setState({
                        error: undefined,
                        preview: preview
                    });
                }).catch(this.onError.bind(this));
        }).catch(this.onError.bind(this));

    }


    render() {

        const {
            error,
            message,
            preview,
        } = this.state;

        return <div className={"ReticulumBackup"}>
            {(error != undefined) && <>
                <div className="modal-error">
                    {error}
                </div>
            </>}

            <div className="identity-passcode-fields">
                {(preview == undefined) && <>
                    <div className="modal-field">
                        <label>Recovery File</label>
                        <p>
                            {(!this?.state?.file) && <>
                                <button className="nr-btn nr-btn-xs"
                                        onClick={this.onSelectFile.bind(this)}>
                                    Select File
                                </button>
                            </>}

                            {(this?.state?.file) && <>
                                <button className="nr-btn nr-btn-xs"
                                        onClick={() => {
                                            this.setState({file: null});
                                        }}>
                                    {this?.state?.file} &nbsp;<MdClear size={20}/>
                                </button>
                            </>}
                        </p>
                    </div>
                </>}

                {(preview != undefined) && <>
                    <div className="identity-address-stack">
                        <div className="identity-address-row">
                            <span className="identity-address-meta">
                                <span className="identity-label">LXMF Address</span>
                                <span className="identity-value mono">{preview.lxmf_hash}</span>
                            </span>
                        </div>
                        <div className="identity-address-row">
                            <span className="identity-address-meta">
                                <span className="identity-label">Identity Hash</span>
                                <span className="identity-value mono">{preview.identity_hash}</span>
                            </span>
                        </div>
                        <label className="identity-import-activate">
                            <input type="checkbox" id="identity-import-activate"/>
                            <span>Activate after import</span>
                        </label>
                    </div>
                </>}

                <div className="modal-field">
                    <p>
                        <button className="nr-btn nr-btn-xs"
                                disabled={!(this?.state?.file)}
                                onClick={this.onImportFile.bind(this)}>
                            <CiImport size={20}/> {preview == undefined ? "Preview" : "Import"}
                        </button>
                    </p>
                </div>
            </div>


        </div>
    }
}
