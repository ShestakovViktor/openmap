import styles from "./EntityForm.module.scss";
import en from "./string/en.json";

import {JSX} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {useViewerContext} from "@ui/viewer/context";
import {Entity, Layer, Id} from "@type";
import i18next from "i18next";
import {LAYER} from "@enum";

i18next.addResourceBundle("en", "entity", {EntityForm: en}, true, true);

type Props = {
    children?: JSX.Element | JSX.Element[];
    id?: string;
    class?: string;
};

export function EntityForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    const viewerCtx = useViewerContext();

    function handleChange(event: Event): void {
        const form = event.currentTarget as HTMLFormElement;
        const input = event.target as HTMLInputElement;
        const type = input.getAttribute("data-type");

        const idInput = form.querySelector("input[name=\"id\"]") as HTMLInputElement;
        const id = Number(idInput.value);
        if (!id) return;

        let data: {id: Id} & Partial<Entity>;

        if (type == "id") {
            data = {id, [input.name]: Number(input.value) || null};
        }
        else if (type == "number") {
            data = {id, [input.name]: Number(input.value)};
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

        const form = event.currentTarget as HTMLFormElement;
        const idInput = form.querySelector("input[name=\"id\"]") as HTMLInputElement;
        const id = Number(idInput.value);

        editorCtx.store.entity.del(id);

        const overlay = editorCtx.store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        const index = overlay.childIds.indexOf(id);
        if (index > -1) {
            overlay.childIds.splice(index, 1);
        }

        editorCtx.store.entity.set(overlay);

        form.reset();
        viewerCtx.reRender();
    }

    return (
        <form
            id={props.id}
            class={styles.EntityForm}
            classList={{[props.class ?? ""]: "class" in props}}
            onChange={handleChange}
            onSubmit={handleDelete}
        >
            {props.children}
            <input
                type="submit"
                name="delete"
                value={i18next.t(
                    "entity:EntityForm.delete",
                    {postProcess: ["capitalize"]}
                )}
            />
        </form>
    );
}