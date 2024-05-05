import styles from "./PropForm.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {Form, Row} from "@ui/widget";
import {JSX} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {Id} from "@type";
import {useViewerContext} from "@ui/viewer/context";

i18next.addResourceBundle("en", "prop", {PropForm: en}, true, true);

type Props = {
    onComplete?: (propId: Id) => void;
    onClose?: () => void;
};

export function PropForm(props?: Props): JSX.Element {
    const editorCtx = useEditorContext();
    const viewerCtx = useViewerContext();

    async function handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        form.reset();

        const name = String(formData.get("name")) || "Asset";
        const width = Number(formData.get("width"));
        const height = Number(formData.get("height"));
        const file = formData.get("file") as File;

        const propId = await editorCtx.core
            .initProp({name, file, width, height});

        viewerCtx.reInit();

        if (props?.onComplete) props.onComplete(propId);
    }

    return (
        <Form
            class={styles.PropForm}
            onSubmit={
                (event) => {
                    handleSubmit(event).catch((err) => {throw new Error(err);});
                }
            }
        >
            <Row>
                <label for="name">
                    {i18next.t(
                        "prop:PropForm.name",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                />
            </Row>
            <Row>
                <label for="width">
                    {i18next.t(
                        "prop:PropForm.width",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input id="width" type="text" name="width"/>
            </Row>
            <Row>
                <label for="height">
                    {i18next.t(
                        "prop:PropForm.height",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input id="height" type="text" name="height"/>
            </Row>
            <Row>
                <label for="file">
                    {i18next.t(
                        "prop:PropForm.file",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                />
            </Row>

            <input type="submit"/>
        </Form>
    );
}