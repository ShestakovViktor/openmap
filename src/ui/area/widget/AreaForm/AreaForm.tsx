import styles from "./AreaForm.module.scss";
import {Accordion} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Signal, createEffect, createResource, on} from "solid-js";
import {Area, Id} from "@type";
import {
    EntityForm,
    PositionSection,
    SystemSection,
} from "@ui/entity/widget";
import {useEditorContext} from "@ui/editor/context";
import {NamespaceProvider} from "@ui/app/context";

i18next.addResourceBundle("en", "area", {AreaForm: en}, true, true);

type Props = {
    entityId: Signal<Id | null>;
    update: Signal<undefined>;
};

export function AreaForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [getId] = props.entityId;
    const [update] = props.update;

    const [entity, {refetch}] = createResource(() => {
        const entityId = getId();
        if (!entityId) return null;
        return editorCtx.store.entity.getById<Area>(entityId);
    });

    createEffect(on(getId, refetch));
    createEffect(on(update, refetch));

    return (
        <NamespaceProvider namespace={"AreaForm"}>
            <EntityForm
                entityId={props.entityId}
                class={styles.AreaForm}
            >
                <Accordion>
                    <SystemSection entity={entity}/>
                    <PositionSection entity={entity}/>
                </Accordion>
            </EntityForm>
        </NamespaceProvider>
    );
}