import styles from "./CreatePage.module.scss";

import {JSX} from "solid-js";
import {ProjectForm} from "../ProjectForm";
import {Page} from "@ui/widget";

type Props = {
    onComplete: () => void;
    onCancel: () => void;
};

export function CreatePage(props: Props): JSX.Element {
    return (
        <Page class={styles.CreatePage}>
            <ProjectForm
                onComplete={props.onComplete}
                onCancel={props.onCancel}
            />
        </Page>
    );
}