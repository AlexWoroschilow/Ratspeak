import React from "react";
import {createRoot} from 'react-dom/client';

("use strict");

import {Application} from "./Application";

let container = document.body.appendChild(document.createElement("div"));

createRoot(container).render(<><Application/></>);