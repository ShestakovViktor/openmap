import styles from "./EntityForm.module.scss";
import en from "./string/en.json";

import {JSX, Accessor, Show} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {useViewerContext} from "@ui/viewer/context";
import {Entity, Id} from "@type";
import i18next from "i18next";
import {DATA} from "@enum";

i18next.addResourceBundle("en", "entity", {EntityForm: en}, true, true);

type Props = {
    entityId: Accessor<Id | null>;
    children?: JSX.Element | JSX.Element[];
    class?: string;
    onDelete?: () => void;
};

export function EntityForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    const viewerCtx = useViewerContext();

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

        editorCtx.store.entity.set<Entity>(data);
        viewerCtx.reRender(id);
    }

    function handleDelete(event: SubmitEvent): void {
        event.preventDefault();
        const submit = event.submitter as HTMLInputElement;
        if (submit.name != "delete") return;
        if (props.onDelete) props.onDelete();

        // const form = event.currentTarget as HTMLFormElement;
        // const idInput = form.querySelector("input[name=\"id\"]") as HTMLInputElement;
        // const id = Number(idInput.value);

        // editorCtx.store.entity.del(id);

        // const overlay = editorCtx.store.entity
        //     .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        // const index = overlay.childIds.indexOf(id);
        // if (index > -1) {
        //     overlay.childIds.splice(index, 1);
        // }

        // editorCtx.store.entity.set(overlay);

        // form.reset();
        // viewerCtx.reRender();
    }

    return (
        <form
            class={styles.EntityForm}
            classList={{[props.class ?? ""]: "class" in props}}
            onChange={handleChange}
            onSubmit={handleDelete}
        >
            {props.children}
            <Show when={props.onDelete}>
                <input
                    type="submit"
                    name="delete"
                    value={i18next.t(
                        "entity:EntityForm.delete",
                        {postProcess: ["capitalize"]}
                    )}
                />
            </Show>
        </form>
    );
}