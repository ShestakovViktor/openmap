import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@ui/widget";
import {JSX, Resource} from "solid-js";

i18next.addResourceBundle("en", "entity", {TypeIdField: en}, true, true);

type Props = {
    entity: Resource<{typeId: number} | null>;
};

export function TypeIdField(props: Props): JSX.Element {
    return (
        <Field>
            <label for="typeId">
                {i18next.t(
                    "entity:TypeIdField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                name="typeId"
                value={props.entity()?.typeId ?? ""}
                data-type="number"
                readonly
            />
        </Field>
    );
}