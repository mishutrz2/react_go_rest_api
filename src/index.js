import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppFooter } from "./AppFooter/AppFooter";
import { AppHeader } from "./AppHeader/AppHeader";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Fragment>
    <AppHeader></AppHeader>
    <App />
    <AppFooter></AppFooter>
  </Fragment>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
