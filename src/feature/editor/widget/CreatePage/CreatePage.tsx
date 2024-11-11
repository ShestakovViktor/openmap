import styles from "./CreatePage.module.scss";

import {JSX} from "solid-js";
import {ProjectForm} from "@feature/editor/widget";
import {Page} from "@shared/widget";

export function CreatePage(): JSX.Element {
    return (
        <Page class={styles.CreatePage}>
            <ProjectForm />
        </Page>
    );
}