import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@shared/widget";
import {Accessor, JSX} from "solid-js";
import {DATA_TYPE} from "@enum";
import {useStoreContext} from "@feature/store/context";
import {Entity, Spatial} from "@feature/entity/type";

i18next.addResourceBundle("en", "entity", {XField: en}, true, true);

type Props = {
    entity: Accessor<Entity & Spatial>;
};

export function XField(props: Props): JSX.Element {
    const {store} = useStoreContext();

    function handleChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        store.entity.set<Entity & {x: number}>(
            props.entity().id,
            {x: Number(target.value)}
        );
    }

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
                value={props.entity().x}
                data-type={DATA_TYPE.NUMBER}
                onChange={handleChange}
            />
        </Field>
    );
}