import styles from "./DecorForm.module.scss";
import {Accordion} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Accessor, createResource} from "solid-js";
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

type Props = {entityId: Accessor<Id | null>};

export function DecorForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [entity] = createResource(props.entityId, (entityId) =>
        editorCtx.store.entity.getById<Decor>(entityId) ?? undefined
    );

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