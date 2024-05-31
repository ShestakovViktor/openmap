import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {DATA} from "@enum";

i18next.addResourceBundle("en", "entity", {YField: en}, true, true);

type Props = {
    entity: Resource<{y: number} | null>;
};

export function YField(props: Props): JSX.Element {
    return (
        <Field>
            <label for="x">
                {i18next.t(
                    "entity:YField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                type="number"
                name="y"
                value={props.entity()?.y ?? ""}
                data-type={DATA.NUMBER}
            />
        </Field>
    );
}