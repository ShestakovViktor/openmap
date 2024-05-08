import styles from "./InitialDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, ValidComponent, createSignal} from "solid-js";
import {Dynamic} from "solid-js/web";

import {Dialog} from "@ui/widget";
import {CreatePage, StartPage} from "@ui/project/widget";

i18next.addResourceBundle("en", "project", {InitialDialog: en}, true, true);

type Props = {
    onComplete: () => void;
};

export function InitialDialog(props: Props): JSX.Element {
    const [selected, setSelected] = createSignal("start");
    const pages: {[key: string]: ValidComponent} = {
        start: () => (
            <StartPage
                onComplete={() => props.onComplete()}
                onCreateChoice={() => setSelected("create")}
            />
        ),
        create: () => (
            <CreatePage
                onComplete={() => props.onComplete()}
                onCancel={() => setSelected("start")}
            />
        ),
    };

    return (
        <Dialog
            class={styles.InitialDialog}
            title={i18next.t(
                "project:InitialDialog.title",
                {postProcess: ["capitalize"]}
            )}
            onClose={props.onComplete}
        >
            <Dynamic component={pages[selected()]}/>
        </Dialog>
    );
}