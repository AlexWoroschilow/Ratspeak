import React from "react";
import {createRoot} from 'react-dom/client';
import {Application} from "./Application";
import {store} from "./ApplicationStore";
import {Provider} from "mobx-react";

("use strict");

let container = document.body.appendChild(document.createElement("div"));



createRoot(container).render(<>
    <Provider store={store}>
        <Application/>
    </Provider></>);