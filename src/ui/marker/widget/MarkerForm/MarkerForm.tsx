import styles from "./MarkerForm.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Id, Marker} from "@type";
import {
    JSX,
    Signal,
    createEffect,
    createResource,
    on,
} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {Accordion} from "@ui/widget";
import {
    EntityForm,
    PositionSection,
    SystemSection,
    TextSection,
    PropSection,
} from "@ui/entity/widget";

i18next.addResourceBundle("en", "marker", {MarkerForm: en}, true, true);

type Props = {entityId: Signal<Id | null>};

export function MarkerForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [getEntityId] = props.entityId;

    const [entity, {refetch}] = createResource(() => {
        const entityId = getEntityId();
        if (!entityId) return null;
        return editorCtx.store.entity.getById<Marker>(entityId);
    });

    createEffect(on(getEntityId, refetch));

    return (
        <EntityForm class={styles.MarkerForm}>
            <Accordion>
                <SystemSection entity={entity}/>
                <PositionSection entity={entity}/>
                <PropSection entity={entity}/>
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