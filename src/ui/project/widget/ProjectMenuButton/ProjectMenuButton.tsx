import GearIconSvg from "@public/icon/gear.svg";
import en from "./string/en.json";

import {Button} from "@ui/widget";
import i18next from "i18next";
import {JSX} from "solid-js";

i18next.addResourceBundle("en", "layout", {SystemBar: en}, true, true);

export function ProjectMenuButton(): JSX.Element {
    return (
        <Button
            icon={ GearIconSvg }
            tooltip={i18next.t(
                "layout:SystemBar.projectSettings",
                {postProcess: ["capitalize"]}
            )}
            onClick={(): void => {
            //context.modal.show(ProjectMenu());
            }}
        />
    );
}