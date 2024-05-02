import styles from "./EntityForm.module.scss";
import en from "./string/en.json";

import {JSX} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {useViewerContext} from "@ui/viewer/context";
import {Entity, Group, Id} from "@type";
import i18next from "i18next";
import {LayerName} from "@enum";

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
        const {type, name, value} = event.target as HTMLInputElement;

        const form = event.currentTarget as HTMLFormElement;

        const idInput = form.querySelector("input[name=\"id\"]") as HTMLInputElement;
        const id = Number(idInput.value);
        if (!id) return;

        const data: {id: Id} & Partial<Entity> = {id, [name]:value};
        editorCtx.store.entity.set<Entity>(data);
        viewerCtx.reRender();
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
            .getByParams<Group>({name: LayerName.OVERLAY})[0];

        const index = overlay.childrenIds.indexOf(id);
        if (index > -1) {
            overlay.childrenIds.splice(index, 1);
        }

        editorCtx.store.entity.set(overlay);

        form.reset();
        viewerCtx.reRender();
    }

    return (
        <form
            id={props.id}
            class={styles.Form}
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