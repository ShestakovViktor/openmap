import styles from "./SystemKit.module.scss";
import {
    ProjectSaveButton,
    ProjectExportButton,
    ProjectCompileButton,
} from "@src/ui/project/widget";
import {JSX} from "solid-js";

export function SystemKit(): JSX.Element {
    return (
        <div class={styles.SystemKit}>
            <ProjectExportButton/>
            <ProjectCompileButton/>
            <ProjectSaveButton/>
        </div>
    );
}