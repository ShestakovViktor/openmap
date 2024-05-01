import DisketteIconSvg from "@public/icon/diskette.svg";

import {Button} from "@ui/widget";
import i18next from "i18next";
import {JSX} from "solid-js";
import {useEditorContext} from "@ui/editor/context";

export function ProjectSaveButton(): JSX.Element {
    const editorCtx = useEditorContext();

    async function handleProjectSave(): Promise<void> {
        const persistent = await navigator.storage.persist();
        if (persistent) {
            console.log("Storage will not be cleared except by explicit user action");
        }
        else {
            console.log("Storage may be cleared by the UA under storage pressure.");
        }

        const root = await navigator.storage.getDirectory();

        const dataFileHandle = await root.getFileHandle("data.om", {create: true});
        const dataFileWritableStream = await dataFileHandle.createWritable();
        await dataFileWritableStream.write(
            JSON.stringify(editorCtx.store.getData())
        );
        await dataFileWritableStream.close();
    }

    return (
        <Button
            icon={DisketteIconSvg}
            tooltip={i18next.t(
                "layout:SystemBar.exportProject",
                {postProcess: ["capitalize"]}
            )}
            onClick={() => void handleProjectSave()}
        />
    );
}