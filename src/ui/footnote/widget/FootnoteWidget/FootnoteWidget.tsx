import styles from "./FootnoteWidget.module.scss";
import {JSX, Show, createMemo, createSignal} from "solid-js";
import {Figure} from "@type";
import {FigureGallery} from "@ui/footnote/widget";
import {Footnote} from "@type";
import {useViewerContext} from "@ui/viewer/context";
import {updateEffect} from "@ui/viewer/utility";

type Props = {
    entity: Footnote;
};

export function FootnoteWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const fetchEntity = (): Footnote => {
        const entity = viewerCtx.store.entity
            .getById<Footnote>(props.entity.id);

        if (!entity) throw new Error(String(props.entity.id));

        return entity;
    };

    const equals = (prev: Footnote, next: Footnote): boolean => {
        return prev.text == next.text
            && prev.figureIds == next.figureIds;
    };

    const [entity, setEntity] = createSignal<Footnote>(props.entity, {equals});

    updateEffect(viewerCtx.render, fetchEntity, setEntity, props.entity.id);

    const text = createMemo(() => entity().text);

    const figures = createMemo((): Figure[] => {
        return entity().figureIds.map((id) => {
            const figure = viewerCtx.store.asset.getById<Figure>(id);
            if (!figure) throw new Error();
            return figure;
        });
    });

    return (
        <div class={styles.InfoPopup}>
            <p class={styles.Text} innerHTML={text()}></p>
            <Show when={figures().length > 0}>
                <FigureGallery figures={figures()}/>
            </Show>
        </div>
    );
}

