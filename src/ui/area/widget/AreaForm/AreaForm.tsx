import styles from "./AreaForm.module.scss";
import {Accordion} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Resource, Signal, createEffect, createReaction, createResource, on} from "solid-js";
import {Area, Id} from "@type";
import {
    EntityForm,
    PositionSection,
    SystemSection,
    TextSection,
} from "@ui/entity/widget";
import {useEditorContext} from "@ui/editor/context";

i18next.addResourceBundle("en", "area", {AreaForm: en}, true, true);

type Props = {
    entityId: Signal<Id | null>;
};

export function AreaForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [getId] = props.entityId;

    const [entity, {refetch}] = createResource(() => {
        const entityId = getId();
        if (!entityId) return null;
        return editorCtx.store.entity.getById<Area>(entityId);
    });

    createEffect(on(getId, refetch));

    return (
        <EntityForm class={styles.AreaForm}>
            <Accordion>
                <SystemSection entity={entity}/>
                <PositionSection entity={entity}/>
                <TextSection entity={entity}/>
            </Accordion>
        </EntityForm>
    );
}