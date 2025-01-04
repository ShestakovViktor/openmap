import styles from "./FootnoteWidget.module.scss";
import {Accessor, JSX, Show, createMemo} from "solid-js";
import {FigureGallery} from "@feature/footnote/widget";
import {Footnote} from "@feature/footnote/type";

type Props = {
    entity: Accessor<Footnote>;
};

export function FootnoteWidget(props: Props): JSX.Element {
    const entity = props.entity();

    const text = createMemo(() => entity.text);

    return (
        <div class={styles.FootnoteWidget}>
            <p class={styles.Text} innerHTML={text()}></p>
            <Show when={entity.figureIds.length > 0}>
                <FigureGallery figureIds={entity.figureIds}/>
            </Show>
        </div>
    );
}

