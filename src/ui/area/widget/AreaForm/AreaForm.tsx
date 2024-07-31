import styles from "./AreaForm.module.scss";
import {Accordion} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Accessor, createResource, createEffect, on} from "solid-js";
import {Area, Footnote, Id, Parent} from "@type";
import {
    EntityForm,
    FootnoteSection,
    PositionSection,
    SystemSection,
} from "@ui/entity/widget";
import {NamespaceProvider, useSignalContext, useStoreContext} from "@ui/app/context";

i18next.addResourceBundle("en", "area", {AreaForm: en}, true, true);

type Props = {
    entityId: Accessor<Id | null>;
};

export function AreaForm(props: Props): JSX.Element {
    const {store} = useStoreContext();
    const {signal} = useSignalContext();

    const [entity, {refetch}] = createResource(props.entityId, (entityId) =>
        store.entity.getById<Area>(entityId) ?? undefined
    );

    createEffect(on(
        signal.entity.getUpdateById,
        async (id) => id == props.entityId() && await refetch(),
        {defer: true}
    ));

    function handleDelete(id: Id): void {
        const area = store.entity.getById<Area>(id);

        if (!area) throw new Error();

        if (area.footnoteId) {
            const footnote = store.entity.getById<Footnote>(area.footnoteId);

            if (!footnote) throw new Error();

            store.entity.delete(footnote.id);
        }

        if (area.parentId) {
            const parent = store.entity.getById<Parent>(area.parentId);

            if (!parent) throw new Error();

            parent.childIds = parent.childIds.filter(id => id != area.id);

            signal.entity.setUpdateById(area.parentId);
        }

        store.entity.delete(area.id);
    }

    return (
        <NamespaceProvider namespace={"AreaForm"}>
            <EntityForm
                entityId={props.entityId}
                class={styles.AreaForm}
                onDelete={handleDelete}
            >
                <Accordion>
                    <SystemSection entity={entity}/>
                    <PositionSection entity={entity}/>
                    <FootnoteSection entity={entity}/>
                </Accordion>
            </EntityForm>
        </NamespaceProvider>
    );
}