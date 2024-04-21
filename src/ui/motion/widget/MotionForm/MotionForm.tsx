import styles from "./MotionForm.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {Column, Form, Row} from "@ui/widget";
import {JSX} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {Id} from "@type";
import {useViewerContext} from "@ui/viewer/context";

i18next.addResourceBundle(
    "en", "motion", {MotionCreateDialog: en}, true, true
);

type Props = {
    onComplete?: (assetId: Id) => void;
    onClose?: () => void;
};

export function MotionForm(props?: Props): JSX.Element {
    const viewerCtx = useViewerContext();
    const editorCtx = useEditorContext();

    function handleSubmit(event: SubmitEvent): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        form.reset();

        const source = String(formData.get("source"));
        const motionData = {
            name: String(formData.get("name")),
            class: String(formData.get("class")),
            source: `data:text/css;base64,${btoa(source)}`,
        };

        const motionId = editorCtx.core.initMotion(motionData);

        viewerCtx.reInit();

        if (props?.onComplete) props.onComplete(motionId);
    }

    return (
        <Form
            class={styles.ResourceForm}
            onSubmit={(event) => {handleSubmit(event);}}
        >
            <Row>
                <label for="name">
                    {i18next.t(
                        "motion:MotionCreateDialog.name",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                />
            </Row>
            <Row>
                <label for="class">
                    {i18next.t(
                        "motion:MotionCreateDialog.class",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input
                    type="text"
                    id="class"
                    name="class"
                />
            </Row>
            <Column>
                <label for="source">
                    {i18next.t(
                        "motion:MotionCreateDialog.source",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <textarea id="source" name="source"/>
            </Column>
            <input
                type="submit"
                value={i18next.t(
                    "motion:MotionCreateDialog.submit",
                    {postProcess: ["capitalize"]}
                )}
            />
        </Form>
    );
}