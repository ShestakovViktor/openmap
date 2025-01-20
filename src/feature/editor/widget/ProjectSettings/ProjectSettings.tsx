import styles from "./ProjectSettings.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";

import {Tab, Tabs} from "@shared/widget";
import {MinScaleField, MaxScaleField} from "@feature/editor/widget";

i18next.addResourceBundle("en", "editor", {ProjectSettings: en}, true, true);

export function ProjectSettings(): JSX.Element {
    return (
        <Tabs>
            {/* <Tab title={i18next.t(
                "editor:ProjectSettings.generalTabTitle",
                {postProcess: ["capitalize"]}
            )}>
            </Tab> */}
            <Tab title={i18next.t(
                "editor:ProjectSettings.scaleTabTitle",
                {postProcess: ["capitalize"]}
            )}>
                <MinScaleField/>
                <MaxScaleField/>
            </Tab>
            {/* <Tab title={ i18next.t(
                "editor:ProjectSettings.styleTabTitle",
                {postProcess: ["capitalize"]}
            )}>
            </Tab> */}
        </Tabs>
    );
}