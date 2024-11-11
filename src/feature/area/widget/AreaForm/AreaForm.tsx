import styles from "./AreaForm.module.scss";
import {Accordion, Form} from "@shared/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Accessor} from "solid-js";
import {
    FootnoteSection,
    PositionSection,
    SystemSection,
} from "@feature/entity/widget";
import {NamespaceProvider} from "@feature/app/context";
import {useStoreContext} from "@feature/store/context";
import {useEditorContext} from "@feature/editor/context";
import {Area} from "@feature/area/type";
import {Parent} from "@feature/entity/type";

i18next.addResourceBundle("en", "area", {AreaForm: en}, true, true);

type Props = {
    entity: Accessor<Area>;
};

export function AreaForm(props: Props): JSX.Element {
    const {store} = useStoreContext();
    const editorCtx = useEditorContext();

    function handleDelete(): void {
        const {id, parentId, footnoteId} = props.entity();

        if (parentId) {
            const parent = store.entity.getById<Parent>(parentId);
            if (!parent) throw new Error();

            store.entity.set<Parent>(parentId, {
                childIds: parent.childIds.filter(childId => childId != id),
            });
        }

        if (footnoteId) {
            store.entity.del(footnoteId);
        }

        store.entity.del(id);

        editorCtx.setSelected(undefined);
    }

    function handleSubmit(event: SubmitEvent): void {
        const submit = event.submitter as HTMLInputElement;
        if (submit.name == "delete") handleDelete();
        event.preventDefault();
    }

    return (
        <NamespaceProvider namespace={"AreaForm"}>
            <Form onSubmit={handleSubmit} >
                <Accordion>
                    <SystemSection entity={props.entity}/>
                    <PositionSection entity={props.entity}/>
                    <FootnoteSection entity={props.entity}/>
                </Accordion>
            </Form>
        </NamespaceProvider>
    );
}