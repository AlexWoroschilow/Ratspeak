import React from "react";
import {createRoot} from 'react-dom/client';

("use strict");
import "../static/fonts/fonts.css";
import "../static/style.css";

import {TestComponent} from "./Dashboard";

import "../static/js/theme.js"

let container = document.body.appendChild(document.createElement("div"));


createRoot(container).render(<><TestComponent / ></>);


