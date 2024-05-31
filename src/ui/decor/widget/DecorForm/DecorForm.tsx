import styles from "./DecorForm.module.scss";
import {Accordion} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Signal, createEffect, createResource, on} from "solid-js";
import {Decor, Id} from "@type";
import {
    PropSection,
    EntityForm,
    PositionSection,
    SystemSection,
    MotionSection,
    SizeSection,
} from "@ui/entity/widget";
import {useEditorContext} from "@ui/editor/context";
import {NamespaceProvider} from "@ui/app/context";

i18next.addResourceBundle("en", "decor", {DecorForm: en}, true, true);

type Props = {
    entityId: Signal<Id | null>;
    update: Signal<undefined>;
};

export function DecorForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [getId] = props.entityId;
    const [update] = props.update;

    const [entity, {refetch}] = createResource(() => {
        const entityId = getId();
        if (!entityId) return null;
        const entity = editorCtx.store.entity.getById<Decor>(entityId);
        return entity;
    });

    createEffect(on(getId, refetch));
    createEffect(on(update, refetch));

    return (
        <NamespaceProvider namespace={"DecorForm"}>
            <EntityForm entityId={props.entityId} class={styles.DecorForm}>
                <Accordion>
                    <SystemSection entity={entity}/>
                    <PositionSection entity={entity}/>
                    <SizeSection entity={entity}/>
                    <PropSection entity={entity}/>
                    <MotionSection entity={entity}/>
                </Accordion>
            </EntityForm>
        </NamespaceProvider>
    );
}