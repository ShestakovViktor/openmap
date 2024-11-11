import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@shared/widget";
import {Accessor, JSX} from "solid-js";
import {DATA_TYPE} from "@enum";
import {useStoreContext} from "@feature/store/context";
import {Entity, Spatial} from "@feature/entity/type";

i18next.addResourceBundle("en", "entity", {YField: en}, true, true);

type Props = {
    entity: Accessor<Entity & Spatial>;
};

export function YField(props: Props): JSX.Element {
    const {store} = useStoreContext();

    function handleChange (event: Event): void {
        const target = event.target as HTMLInputElement;
        store.entity.set<Entity & {y: number}>(
            props.entity().id,
            {y: Number(target.value)}
        );
    }

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
                value={props.entity().y}
                data-type={DATA_TYPE.NUMBER}
                onChange={handleChange}
            />
        </Field>
    );
}