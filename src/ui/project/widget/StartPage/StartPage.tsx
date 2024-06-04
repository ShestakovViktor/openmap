import styles from "./StartPage.module.scss";
import en from "./string/en.json";

import {Button, Page} from "@ui/widget";

import i18next from "i18next";
import {JSX} from "solid-js";
import {useCoreContext, useStoreContext} from "@ui/app/context";

i18next.addResourceBundle("en", "project", {StartChoice: en}, true, true);

type Props = {
    onCreateChoice: () => void;
    onComplete: () => void;
};

export function StartPage(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const coreCtx = useCoreContext();

    async function handleProjectRestore(): Promise<void> {
        const root = await navigator.storage.getDirectory();
        const dataFileHandle = await root.getFileHandle("data.om");
        const dataFile = await dataFileHandle.getFile();
        const dataString = await dataFile.text();
        const data = JSON.parse(dataString);

        coreCtx.core.converter.loadProject(data);

        storeCtx.initialize();
        storeCtx.update.entity.set();

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

            coreCtx.core.converter.importProject(file)
                .then(() => {
                    storeCtx.initialize();
                })
                .catch(error => {throw new Error(error);});
            props.onComplete();
        });
    }

    return (
        <Page class={styles.StartPage}>
            <Button
                label={i18next.t(
                    "project:StartChoice.create",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => props.onCreateChoice()}
            />

            <Button
                label={i18next.t(
                    "project:StartChoice.continue",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => handleProjectUpload()}
            />

            <Button
                label={i18next.t(
                    "project:StartChoice.load",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {
                    handleProjectRestore()
                        .catch((error) => {throw new Error(error);});
                }}
            />
        </Page>
    );
}