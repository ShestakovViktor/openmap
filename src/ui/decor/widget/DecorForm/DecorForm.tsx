import styles from "./DecorForm.module.scss";
import {Accordion} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Resource, Signal, createEffect, createResource, on} from "solid-js";
import {Area, Decor, Id} from "@type";
import {
    AssetSection,
    EntityForm,
    PositionSection,
    SystemSection,
    MotionSection,
} from "@ui/entity/widget";
import {useEditorContext} from "@ui/editor/context";

i18next.addResourceBundle("en", "decor", {DecorForm: en}, true, true);

type Props = {
    id: Signal<Id | null>;
};

export function DecorForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [getId] = props.id;

    const [entity, {refetch}] = createResource(() => {
        const entityId = getId();
        if (!entityId) return null;
        return editorCtx.store.entity.getById<Decor>(entityId);
    });

    createEffect(on(getId, refetch));

    return (
        <EntityForm class={styles.DecorForm}>
            <Accordion>
                <SystemSection expand={true} entity={entity}/>
                <PositionSection expand={true} entity={entity}/>
                <AssetSection expand={true} entity={entity}/>
                <MotionSection entity={entity}/>
            </Accordion>
        </EntityForm>
    );
}