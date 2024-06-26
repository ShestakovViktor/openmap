import styles from "./MarkerForm.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Id, Marker} from "@type";
import {Accessor, JSX, createEffect, createResource, on} from "solid-js";
import {Accordion} from "@ui/widget";
import {
    EntityForm,
    PositionSection,
    SystemSection,
    PropSection,
    SizeSection,
} from "@ui/entity/widget";
import {NamespaceProvider, useStoreContext} from "@ui/app/context";
import {FootnoteSection} from "@ui/entity/widget/FootnoteSection/FootnoteSection";

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

    return (
        <NamespaceProvider namespace={"MarkerForm"}>
            <EntityForm
                entityId={props.entityId}
                class={styles.MarkerForm}
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