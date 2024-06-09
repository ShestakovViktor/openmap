import styles from "./AreaForm.module.scss";
import {Accordion} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Accessor, createResource, createEffect, on} from "solid-js";
import {Area, Footnote, Id, Parent} from "@type";
import {
    EntityForm,
    PositionSection,
    SystemSection,
} from "@ui/entity/widget";
import {NamespaceProvider, useStoreContext} from "@ui/app/context";

i18next.addResourceBundle("en", "area", {AreaForm: en}, true, true);

type Props = {
    entityId: Accessor<Id | null>;
};

export function AreaForm(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    const [entity, {refetch}] = createResource(props.entityId, (entityId) =>
        storeCtx.store.entity.getById<Area>(entityId) ?? undefined
    );

    createEffect(on(
        storeCtx.update.entity.get,
        async (id) => id == props.entityId() && await refetch(),
        {defer: true}
    ));

    function handleDelete(id: Id): void {
        const area = storeCtx.store.entity
            .getById<Area>(id);

        if (!area) throw new Error();

        if (area.footnoteId) {
            const footnote = storeCtx.store.entity
                .getById<Footnote>(area.footnoteId);

            if (!footnote) throw new Error();

            storeCtx.store.entity.del(footnote.id);
        }

        if (area.parentId) {
            const parent = storeCtx.store.entity
                .getById<Parent>(area.parentId);

            if (!parent) throw new Error();

            storeCtx.store.entity.set<Parent>({
                id: parent.id,
                childIds: parent.childIds.filter(id => id != area.id),
            });

            storeCtx.update.entity.set(area.parentId);
        }

        storeCtx.store.entity.del(area.id);
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
                </Accordion>
            </EntityForm>
        </NamespaceProvider>
    );
}