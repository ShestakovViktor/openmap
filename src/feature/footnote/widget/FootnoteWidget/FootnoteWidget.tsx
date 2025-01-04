import styles from "./FootnoteWidget.module.scss";
import {Accessor, JSX, Show, createMemo} from "solid-js";
import {FigureGallery} from "@feature/footnote/widget";
import {Footnote} from "@feature/footnote/type";

type Props = {
    entity: Accessor<Footnote>;
};

export function FootnoteWidget(props: Props): JSX.Element {
    const text = createMemo(() => props.entity().text);

    return (
        <div class={styles.FootnoteWidget}>
            <p class={styles.Text} innerHTML={text()}></p>
            <Show when={props.entity().figureIds.length > 0}>
                <FigureGallery figureIds={props.entity().figureIds}/>
            </Show>
        </div>
    );
}

