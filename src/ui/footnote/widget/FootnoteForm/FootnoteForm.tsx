import styles from "./FootnoteForm.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Footnote, Id} from "@type";
import {JSX, Accessor, createResource} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {Tab, Tabs} from "@ui/widget";
import {EntityForm, TextField} from "@ui/entity/widget";
import {NamespaceProvider} from "@ui/app/context";
// import {FigureSelect} from "@ui/figure/widget";

i18next.addResourceBundle("en", "footnote", {FootnoteForm: en}, true, true);

type Props = {
    entityId: Accessor<Id | null>;
};

export function FootnoteForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [entity] = createResource(props.entityId, (entityId) => {
        return entityId
            ? editorCtx.store.entity.getById<Footnote>(entityId) ?? undefined
            : undefined;
    });

    return (
        <NamespaceProvider namespace={"FootnoteForm"}>
            <EntityForm entityId={props.entityId} class={styles.FootnoteForm}>
                <Tabs>
                    <Tab
                        title={
                            i18next.t(
                                "footnote:FootnoteForm.textTabTitle",
                                {postProcess: ["capitalize"]}
                            )
                        }
                    >
                        <TextField entity={entity}/>
                    </Tab>
                    {/* <Tab
                        title={
                            i18next.t(
                                "footnote:FootnoteForm.figureTabTitle",
                                {postProcess: ["capitalize"]}
                            )
                        }
                    >
                        <FigureSelect entity={entity}/>
                    </Tab> */}
                </Tabs>
            </EntityForm>
        </NamespaceProvider>
    );
}