import React, { Fragment } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppFooter } from "./AppFooter/AppFooter";
import { AppHeader } from "./AppHeader/AppHeader";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Fragment>
    <AppHeader></AppHeader>
    <App />
    <AppFooter></AppFooter>
  </Fragment>
);
