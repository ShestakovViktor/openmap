import {Panel} from "@ui/widget";
import styles from "./SystemBar.module.scss";
import {
    ProjectSaveButton,
    ProjectExportButton,
    ProjectCompileButton,
} from "@src/ui/project/widget";
import {JSXElement} from "solid-js";

export function SystemBar(): JSXElement {
    return (
        <Panel class={styles.SystemBar}>
            <ProjectSaveButton/>
            <ProjectExportButton/>
            <ProjectCompileButton/>
        </Panel>
    );
}