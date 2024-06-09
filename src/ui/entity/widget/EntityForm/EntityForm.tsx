import styles from "./EntityForm.module.scss";
import en from "./string/en.json";

import {JSX, Accessor, Show} from "solid-js";
import {Entity, Id} from "@type";
import i18next from "i18next";
import {DATA} from "@enum";
import {useStoreContext} from "@ui/app/context";
import {useEditorContext} from "@ui/editor/context";

i18next.addResourceBundle("en", "entity", {EntityForm: en}, true, true);

type Props = {
    entityId: Accessor<Id | null>;
    children?: JSX.Element | JSX.Element[];
    class?: string;
    onDelete?: (id: Id) => void;
};

export function EntityForm(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const editorCtx = useEditorContext();

    function handleChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const type = Number(input.getAttribute("data-type"));

        const id = props.entityId();
        if (!id) return;

        let data: {id: Id} & Partial<Entity>;

        if (type == DATA.REFERENCE) {
            data = {id, [input.name]: Number(input.value) || null};
        }
        else if (type == DATA.NUMBER) {
            data = {id, [input.name]: Number(input.value)};
        }
        else if (type == DATA.ARRAY) {
            data = {id, [input.name]: JSON.parse(input.value) || []};
        }
        else {
            data = {id, [input.name]: String(input.value)};
        }

        storeCtx.store.entity.set<Entity>(data);
        storeCtx.update.entity.set(id);
    }

    function handleSubmit(event: SubmitEvent): void {
        event.preventDefault();

        if (event.submitter instanceof HTMLButtonElement) {
            if (event.submitter.name == "delete" && props.onDelete) {
                const entityId = props.entityId();
                if (entityId) props.onDelete(entityId);

                editorCtx.dockArea.clear();
            }
        }
    }

    return (
        <form
            class={styles.EntityForm}
            classList={{[props.class ?? ""]: "class" in props}}
            onChange={handleChange}
            onSubmit={handleSubmit}
        >
            {props.children}
        </form>
    );
}