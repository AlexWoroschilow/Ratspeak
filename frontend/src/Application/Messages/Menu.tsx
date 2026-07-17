"use strict";
import React from "react";

interface MenuProps {
}

interface MenuState {
}

import "./Menu.scss";


export class Menu extends React.Component<MenuProps, MenuState> {
    constructor(props: MenuProps) {
        super(props);
    }

    render() {

        return <>

            <div className="action-popover open" role="menu">
                <button type="button" className="action-popover-item" role="menuitem">
                    <span className="action-popover-item-icon">
                                        <svg width="18" height="18"
                                             viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"><path
                                            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path
                                            d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                    </span>
                    <span className="action-popover-item-label">Contacts</span>
                </button>
                <button type="button" className="action-popover-item" role="menuitem">
                                        <span className="action-popover-item-icon">
                                        <svg width="18" height="18"
                                             viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"><path
                                            d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></span><span
                    className="action-popover-item-label">New</span>
                </button>
            </div>
        </>
    }
}
