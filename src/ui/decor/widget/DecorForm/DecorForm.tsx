import styles from "./DecorForm.module.scss";
import {Accordion} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Accessor, createResource, createEffect, on} from "solid-js";
import {Decor, Id, Parent} from "@type";
import {
    AppearanceSection,
    EntityForm,
    PositionSection,
    SystemSection,
    SizeSection,
} from "@ui/entity/widget";
import {NamespaceProvider, useStoreContext} from "@ui/app/context";

i18next.addResourceBundle("en", "decor", {DecorForm: en}, true, true);

type Props = {entityId: Accessor<Id | null>};

export function DecorForm(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    const [entity, {refetch}] = createResource(props.entityId, (entityId) =>
        storeCtx.store.entity.getById<Decor>(entityId) ?? undefined
    );

    createEffect(on(
        storeCtx.update.entity.get,
        async (id) => id == props.entityId() && await refetch(),
        {defer: true}
    ));

    function handleDelete(id: Id): void {
        const decor = storeCtx.store.entity
            .getById<Decor>(id);

        if (!decor) throw new Error();

        if (decor.parentId) {
            const parent = storeCtx.store.entity
                .getById<Parent>(decor.parentId);

            if (!parent) throw new Error();

            storeCtx.store.entity.set<Parent>({
                id: parent.id,
                childIds: parent.childIds.filter(id => id != decor.id),
            });

            storeCtx.update.entity.set(decor.parentId);
        }

        storeCtx.store.entity.del(decor.id);
    }

    return (
        <NamespaceProvider namespace={"DecorForm"}>
            <EntityForm
                entityId={props.entityId}
                class={styles.DecorForm}
                onDelete={handleDelete}
            >
                <Accordion>
                    <SystemSection entity={entity}/>
                    <PositionSection entity={entity}/>
                    <SizeSection entity={entity}/>
                    <AppearanceSection entity={entity} motion/>
                </Accordion>
            </EntityForm>
        </NamespaceProvider>
    );
}