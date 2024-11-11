import styles from "./StartupDialog.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {Dynamic} from "solid-js/web";

import {Dialog} from "@shared/widget";
import {CreatePage, StartPage} from "@feature/editor/widget";
import {useStartupContext} from "@feature/editor/context";

i18next.addResourceBundle("en", "editor", {StartupDialog: en}, true, true);

export function StartupDialog(): JSX.Element {
    const startupCtx = useStartupContext();

    const [page] = startupCtx.pageSignal;

    const pages = {
        start: () => <StartPage/>,
        create: () => <CreatePage/>,
    };

    return (
        <Dialog
            class={styles.StartupDialog}
            title={i18next.t(
                "editor:StartupDialog.title",
                {postProcess: ["capitalize"]}
            )}
        >
            <Dynamic component={pages[page()]}/>
        </Dialog>
    );
}