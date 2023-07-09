import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StateProvider } from "./Compnents/StateProvider";
import reducer, { initialState } from "./Compnents/reducer";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="https://helpful-jelly-7dee46.netlify.app/">
    <StateProvider initialState={initialState} reducer={reducer} >
      <App />
    </StateProvider>
  </BrowserRouter>
);
