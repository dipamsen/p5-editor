import { jsx as _jsx } from "react/jsx-runtime";
import "./userWorker";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import { globalContext } from "./context/GlobalContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(_jsx(React.StrictMode, { children: _jsx(StoreProvider, { store: globalContext, children: _jsx(App, {}) }) }));
