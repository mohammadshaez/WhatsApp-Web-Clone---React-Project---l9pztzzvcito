import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StateProvider } from "./Compnents/StateProvider";
import reducer, { initialState } from "./Compnents/reducer";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <StateProvider initialState={initialState} reducer={reducer} >
      <App />
    </StateProvider>
  </BrowserRouter>
);
