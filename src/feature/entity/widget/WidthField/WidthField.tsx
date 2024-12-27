import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@shared/widget";
import {Accessor, JSX} from "solid-js";
import {DATA_TYPE} from "@enum";
import {useStoreContext} from "@feature/store/context";
import {Entity} from "@feature/entity/type";

i18next.addResourceBundle("en", "entity", {WidthField: en}, true, true);

type Props = {
    entity: Accessor<Entity & {width: number}>;
};

export function WidthField(props: Props): JSX.Element {
    const {store} = useStoreContext();

    function handleChange (event: Event): void {
        const target = event.target as HTMLInputElement;
        store.entity.set<Entity & {width: number}>(
            props.entity().id,
            {width: Number(target.value)}
        );
    }

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
                value={props.entity().width}
                onChange={handleChange}
                data-type={DATA_TYPE.NUMBER}
            />
        </Field>
    );
}