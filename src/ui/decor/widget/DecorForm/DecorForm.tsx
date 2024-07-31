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
import {
    NamespaceProvider,
    useSignalContext,
    useStoreContext,
} from "@ui/app/context";

i18next.addResourceBundle("en", "decor", {DecorForm: en}, true, true);

type Props = {entityId: Accessor<Id | null>};

export function DecorForm(props: Props): JSX.Element {
    const {store} = useStoreContext();
    const {signal} = useSignalContext();

    const [entity, {refetch}] = createResource(props.entityId, (entityId) =>
        store.entity.getById<Decor>(entityId) ?? undefined
    );

    createEffect(on(
        signal.entity.getUpdateById,
        async (id) => id == props.entityId() && await refetch(),
        {defer: true}
    ));

    function handleDelete(id: Id): void {
        const decor = store.entity.getById<Decor>(id);

        if (!decor) throw new Error();

        if (decor.parentId) {
            const parent = store.entity
                .getById<Parent>(decor.parentId);

            if (!parent) throw new Error();

            parent.childIds = parent.childIds.filter(id => id != decor.id);

            signal.entity.setUpdateById(decor.parentId);
        }

        store.entity.delete(decor.id);
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