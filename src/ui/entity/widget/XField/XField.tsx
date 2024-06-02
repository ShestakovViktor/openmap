import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {DATA} from "@enum";

i18next.addResourceBundle("en", "entity", {XField: en}, true, true);

type Props = {
    entity: Resource<{x: number} | undefined>;
};

export function XField(props: Props): JSX.Element {
    return (
        <Field>
            <label for="x">
                {i18next.t(
                    "entity:XField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                type="number"
                name="x"
                value={props.entity()?.x ?? ""}
                data-type={DATA.NUMBER}
            />
        </Field>
    );
}