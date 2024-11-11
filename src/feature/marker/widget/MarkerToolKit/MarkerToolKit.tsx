import {Toolbar} from "@shared/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";

i18next.addResourceBundle("en", "marker", {MarkerToolbar: en}, true, true);

export function MarkerToolKit(): JSX.Element {
    return (<Toolbar></Toolbar>);
}