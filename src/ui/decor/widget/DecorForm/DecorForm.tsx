import styles from "./DecorForm.module.scss";
import {Accordion} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Signal, createEffect, createResource, on} from "solid-js";
import {Decor, Id} from "@type";
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
    entityId: Signal<Id | null>;
};

export function DecorForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    const [getId] = props.entityId;

    const [entity, {refetch}] = createResource(() => {
        const entityId = getId();
        if (!entityId) return null;
        return editorCtx.store.entity.getById<Decor>(entityId);
    });

    createEffect(on(getId, refetch));

    return (
        <EntityForm class={styles.DecorForm}>
            <Accordion>
                <SystemSection entity={entity}/>
                <PositionSection entity={entity}/>
                <AssetSection entity={entity}/>
                <MotionSection entity={entity}/>
            </Accordion>
        </EntityForm>
    );
}