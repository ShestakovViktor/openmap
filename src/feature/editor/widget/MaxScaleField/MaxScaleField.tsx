import en from "./string/en.json";
import i18next from "i18next";

import {Field, Input} from "@shared/widget";
import {createMemo, JSX} from "solid-js";
import {useStoreContext} from "@feature/store/context";
import {Param} from "@type";

i18next.addResourceBundle("en", "project", {MaxScaleField: en}, true, true);

export function MaxScaleField(): JSX.Element {
    const storeCtx = useStoreContext();

    const maxScale = createMemo(
        () => storeCtx.store.config.getByParams({name: "maxScale"})[0]
    );

    function handleChange (event: Event): void {
        const target = event.target as HTMLInputElement;
        storeCtx.store.config.set<Param>(
            maxScale().id,
            {value: Number(target.value)}
        );
    }

    return (
        <Field>
            <label for="maxScale">
                {i18next.t(
                    "project:MaxScaleField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <Input
                type="number"
                name="maxScale"
                step="0.1"
                // min="0"
                // max="10"
                value={String(maxScale().value)}
                onChange={handleChange}
            />
        </Field>
    );
}