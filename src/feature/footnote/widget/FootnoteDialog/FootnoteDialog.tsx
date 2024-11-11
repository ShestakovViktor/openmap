import styles from "./FootnoteDialog.module.scss";
import en from "./string/en.json";
import i18next from "i18next";
import {Accessor, createMemo, JSX, Show} from "solid-js";
import {Dialog} from "@shared/widget";
import {FootnoteForm} from "@feature/footnote/widget";
import {useStoreContext} from "@feature/store/context";
import {Entity} from "@feature/entity/type";
import {Footnote} from "@feature/footnote/type";

i18next.addResourceBundle("en", "footnote", {FootnoteDialog: en}, true, true);

type Props = {
    entity: Accessor<Entity & {footnoteId: number | null}>;
    onClose: () => void;
};

export function FootnoteDialog(props: Props): JSX.Element {
    const {store} = useStoreContext();

    const footnote = createMemo(() => {
        const id = props.entity().footnoteId;
        if (!id) throw new Error();

        const entity = store.entity.getById<Footnote>(id);

        if (!entity) throw new Error();

        return entity;
    });

    return (
        <Dialog
            class={styles.FootnoteDialog}
            title={i18next.t(
                "footnote:FootnoteDialog.title",
                {postProcess: ["capitalize"]}
            )}
            onClose={props.onClose}
        >
            <Show when={footnote()} fallback={<h1>No entity</h1>}>
                {(footnote) => <FootnoteForm entity={footnote}/>}
            </Show>
        </Dialog>
    );
}

