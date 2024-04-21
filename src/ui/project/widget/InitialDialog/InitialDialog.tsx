import styles from "./InitialDialog.module.scss";
import en from "./string/en.json";

import {ProjectCreateDialog} from "@src/ui/project/widget";

import {Button, Dialog} from "@ui/widget";

import i18next from "i18next";
import {JSX} from "solid-js";
import {Modal} from "@ui/widget/Modal";
import {useViewerContext} from "@ui/viewer/context";
import {useEditorContext} from "@ui/editor/context";

i18next.addResourceBundle("en", "project", {InitialDialog: en}, true, true);

type Props = {
    onComplete: () => void;
};

export function InitialDialog(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    const viewerCtx = useViewerContext();

    async function handleProjectRestore(): Promise<void> {
        const root = await navigator.storage.getDirectory();
        const dataFileHandle = await root.getFileHandle("data.om");
        const dataFile = await dataFileHandle.getFile();
        const dataString = await dataFile.text();
        const data = JSON.parse(dataString);

        editorCtx.core.converter.loadProject(data);

        viewerCtx.reInit();
        viewerCtx.reRender();

        props.onComplete();
    }

    function handleProjectUpload(): void {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".om";
        input.click();
        input.addEventListener("change", (): void => {
            if (!input.files?.length) return;
            const file = input.files[0];

            editorCtx.core.converter.importProject(file)
                .then(() => {
                    viewerCtx.reInit();
                    viewerCtx.reRender();
                })
                .catch(error => {throw new Error(error);});
            props.onComplete();
        });
    }

    const projectCreateModal = new Modal();
    projectCreateModal.render(
        <ProjectCreateDialog
            onComplete={() => {
                props.onComplete();
                projectCreateModal.hide();
            }}
        />
    );

    return (
        <Dialog
            class={styles.InitialDialog}
            title={i18next.t(
                "project:InitialDialog.dialogTitle",
                {postProcess: ["capitalize"]}
            )}
            onClose={props.onComplete}
        >
            <Button
                label={i18next.t(
                    "project:InitialDialog.create",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => projectCreateModal.show()}
            />

            <Button
                label={i18next.t(
                    "project:InitialDialog.continue",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => handleProjectUpload()}
            />

            <Button
                label={i18next.t(
                    "project:InitialDialog.load",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {
                    handleProjectRestore()
                        .catch((error) => {throw new Error(error);});
                }}
            />
        </Dialog>
    );
}