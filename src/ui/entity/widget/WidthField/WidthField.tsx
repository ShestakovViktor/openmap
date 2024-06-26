import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {DATA} from "@enum";

i18next.addResourceBundle("en", "entity", {WidthField: en}, true, true);

type Props = {
    entity: Resource<{width: number} | undefined>;
};

export function WidthField(props: Props): JSX.Element {
    return (
        <Field>
            <label for="width">
                {i18next.t(
                    "entity:WidthField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                type="number"
                name="width"
                value={props.entity()?.width ?? ""}
                data-type={DATA.NUMBER}
            />
        </Field>
    );
}