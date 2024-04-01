import FileIconSvg from "@public/icon/file.svg";

import {Button} from "@ui/widget";
import i18next from "i18next";
import {JSXElement} from "solid-js";
import {useEditorContext} from "@ui/editor/context";

export function ProjectExportButton(): JSXElement {
    const editorCtx = useEditorContext();

    async function handleProjectExport(): Promise<void> {
        const projectFile = await editorCtx.core.converter.exportAsFile();

        const projectFileUrl = URL.createObjectURL(projectFile);

        const {value: projectName} = editorCtx.store.config
            .getByParams({name: "name"})[0];
        const tempLink = document.createElement("a");
        tempLink.download = projectName + ".om";
        tempLink.href = projectFileUrl;
        tempLink.click();
        tempLink.remove();
    }

    return (
        <Button
            icon={FileIconSvg}
            tooltip={i18next.t(
                "layout:SystemBar.exportProject",
                {postProcess: ["capitalize"]}
            )}
            onClick={() => void handleProjectExport()}
        />
    );
}