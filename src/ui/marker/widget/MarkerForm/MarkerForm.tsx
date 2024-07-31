import styles from "./MarkerForm.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Footnote, Id, Marker, Parent} from "@type";
import {Accessor, JSX, createEffect, createResource, on} from "solid-js";
import {Accordion} from "@ui/widget";
import {
    EntityForm,
    PositionSection,
    SystemSection,
    AppearanceSection,
    SizeSection,
    FootnoteSection,
} from "@ui/entity/widget";

import {
    NamespaceProvider,
    useSignalContext,
    useStoreContext,
} from "@ui/app/context";

i18next.addResourceBundle("en", "marker", {MarkerForm: en}, true, true);

type Props = {
    entityId: Accessor<Id | null>;
};

export function MarkerForm(props: Props): JSX.Element {
    const {store} = useStoreContext();
    const {signal} = useSignalContext();

    const [entity, {refetch}] = createResource(props.entityId, (entityId) =>
        store.entity.getById<Marker>(entityId) ?? undefined
    );

    createEffect(on(
        signal.entity.getUpdateById,
        async (id) => id == props.entityId() && refetch(),
        {defer: true}
    ));

    function handleDelete(id: Id): void {
        const marker = store.entity
            .getById<Marker>(id);

        if (!marker) throw new Error();

        if (marker.footnoteId) {
            const footnote = store.entity.getById<Footnote>(marker.footnoteId);

            if (!footnote) throw new Error();

            store.entity.delete(footnote.id);
        }

        if (marker.parentId) {
            const parent = store.entity.getById<Parent>(marker.parentId);

            if (!parent) throw new Error();

            parent.childIds = parent.childIds.filter(id => id != marker.id);

            signal.entity.setUpdateById(marker.parentId);
        }

        store.entity.delete(marker.id);
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
                    <AppearanceSection entity={entity}/>
                    <FootnoteSection entity={entity}/>
                </Accordion>
            </EntityForm>
        </NamespaceProvider>
    );
}