import en from "./string/en.json";
import i18next from "i18next";

import {Field, Input} from "@shared/widget";
import {Accessor, JSX} from "solid-js";

i18next.addResourceBundle("en", "entity", {IdField: en}, true, true);

type Props = {
    entity: Accessor<{id: number} | undefined>;
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
            <Input
                name="id"
                value={String(props.entity()?.id)}
                readonly
            />
        </Field>
    );
}