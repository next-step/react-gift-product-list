import "reflect-metadata";

import { Fragment } from "react";
import { createRoot } from "react-dom/client";

import { GlobalStyles } from "@/app/styles";

import App from "@/App";

createRoot(document.getElementById("root")!).render(
    <Fragment>
        <GlobalStyles />
        <App />
    </Fragment>,
);
