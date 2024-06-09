import styles from "./MarkerForm.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Entity, Footnote, Id, Marker, Parent} from "@type";
import {Accessor, JSX, createEffect, createResource, on} from "solid-js";
import {Accordion} from "@ui/widget";
import {
    EntityForm,
    PositionSection,
    SystemSection,
    PropSection,
    SizeSection,
    FootnoteSection,
} from "@ui/entity/widget";

import {NamespaceProvider, useStoreContext} from "@ui/app/context";

i18next.addResourceBundle("en", "marker", {MarkerForm: en}, true, true);

type Props = {
    entityId: Accessor<Id | null>;
};

export function MarkerForm(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    const [entity, {refetch}] = createResource(props.entityId, (entityId) =>
        storeCtx.store.entity.getById<Marker>(entityId) ?? undefined
    );

    createEffect(on(
        storeCtx.update.entity.get,
        async (id) => id == props.entityId() && await refetch(),
        {defer: true}
    ));

    function handleDelete(id: Id): void {
        const marker = storeCtx.store.entity
            .getById<Marker>(id);

        if (!marker) throw new Error();

        if (marker.footnoteId) {
            const footnote = storeCtx.store.entity
                .getById<Footnote>(marker.footnoteId);

            if (!footnote) throw new Error();

            storeCtx.store.entity.del(footnote.id);
        }

        if (marker.parentId) {
            const parent = storeCtx.store.entity
                .getById<Parent>(marker.parentId);

            if (!parent) throw new Error();

            storeCtx.store.entity.set<Parent>({
                id: parent.id,
                childIds: parent.childIds.filter(id => id != marker.id),
            });

            storeCtx.update.entity.set(marker.parentId);
        }

        storeCtx.store.entity.del(marker.id);
    }

    return (
        <NamespaceProvider namespace={"MarkerForm"}>
            <EntityForm
                entityId={props.entityId}
                class={styles.MarkerForm}
                onDelete={handleDelete}
            >
                <Accordion>
                    <SystemSection entity={entity}/>
                    <PositionSection entity={entity}/>
                    <SizeSection entity={entity}/>
                    <PropSection entity={entity}/>
                    <FootnoteSection entity={entity}/>
                </Accordion>
            </EntityForm>
        </NamespaceProvider>
    );
}