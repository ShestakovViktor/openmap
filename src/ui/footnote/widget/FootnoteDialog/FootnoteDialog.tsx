import styles from "./FootnoteDialog.module.scss";
import en from "./string/en.json";
import i18next from "i18next";
import {Accessor, JSX, Signal} from "solid-js";
import {Id} from "@type";
import {Dialog} from "@ui/widget";
import {FootnoteForm} from "@ui/footnote/widget";

i18next.addResourceBundle("en", "footnote", {FootnoteDialog: en}, true, true);

type Props = {
    entityId: Accessor<Id | null>;
    onClose: () => void;
};

export function FootnoteDialog(props: Props): JSX.Element {
    return (
        <Dialog
            class={styles.FootnoteDialog}
            title={
                i18next.t(
                    "footnote:FootnoteDialog.title",
                    {postProcess: ["capitalize"]}
                )
            }
            onClose={props.onClose}
        >
            <FootnoteForm entityId={props.entityId}/>
        </Dialog>
    );
}

