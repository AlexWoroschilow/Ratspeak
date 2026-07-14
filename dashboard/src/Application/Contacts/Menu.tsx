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
                        <svg viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2"
                             stroke-linecap="round"
                             stroke-linejoin="round"><circle cx="9" cy="7"
                                                             r="4"></circle><path
                            d="M15 19a6 6 0 0 0-12 0"></path><path d="M19 8v6"></path><path d="M22 11h-6"></path>
                        </svg>
                    </span><span className="action-popover-item-label">Address</span>
                </button>
                <button type="button" className="action-popover-item" role="menuitem">
                    <span className="action-popover-item-icon">
                        <svg viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2"
                             stroke-linecap="round"
                             stroke-linejoin="round"><rect x="3" y="3"
                                                           width="7"
                                                           height="7"></rect><rect
                            x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><path d="M14 14h3v3h-3z"></path><path d="M19 14h2"></path><path
                            d="M14 21h7v-2"></path><path d="M19 17h2"></path>
                    </svg></span>
                    <span className="action-popover-item-label">QR</span>
                </button>
            </div>
        </>

    }
}
