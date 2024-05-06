import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@ui/widget";
import {JSX, Resource} from "solid-js";

i18next.addResourceBundle("en", "entity", {IdField: en}, true, true);

type Props = {
    entity: Resource<{id: number} | null>;
};

export function IdField(props: Props): JSX.Element {
    return (
        <Field>
            <label for="id">
                {i18next.t(
                    "entity:IdField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                name="id"
                value={props.entity()?.id ?? ""}
                data-type="number"
                readonly
            />
        </Field>
    );
}