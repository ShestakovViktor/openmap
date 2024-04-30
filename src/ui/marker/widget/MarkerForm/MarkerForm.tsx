import styles from "./MarkerForm.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Id, Marker} from "@type";
import {JSX, Signal, createEffect, createResource, on} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {Accordion} from "@ui/widget";
import {
    EntityForm,
    PositionSection,
    SystemSection,
    TextSection,
    AssetSection,
} from "@ui/entity/widget";

i18next.addResourceBundle("en", "marker", {MarkerForm: en}, true, true);

type Props = {id: Signal<Id | null>};

export function MarkerForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [getId] = props.id;

    const [entity, {refetch}] = createResource(() => {
        const entityId = getId();
        if (!entityId) return null;
        return editorCtx.store.entity.getById<Marker>(entityId);
    });

    createEffect(on(getId, refetch));

    return (
        <EntityForm class={styles.MarkerForm}>
            <Accordion>
                <SystemSection entity={entity} expand/>
                <PositionSection entity={entity} expand/>
                <AssetSection entity={entity}/>
                <TextSection entity={entity}/>
                {/* <Row>
                        <input
                            type="file"
                            name="graphic"
                            accept="image/*"
                            multiple
                        />
                    </Row> */}
            </Accordion>
        </EntityForm>
    );
}