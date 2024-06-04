import styles from "./FootnoteWidget.module.scss";
import {JSX, Show, createEffect, createMemo, createSignal, on} from "solid-js";
import {Figure} from "@type";
import {FigureGallery} from "@ui/footnote/widget";
import {Footnote} from "@type";
import {useStoreContext} from "@ui/app/context";

type Props = {
    entity: Footnote;
};

export function FootnoteWidget(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    const fetchEntity = (): Footnote => {
        const entity = storeCtx.store.entity
            .getById<Footnote>(props.entity.id);

        if (!entity) throw new Error(String(props.entity.id));

        return entity;
    };

    const equals = (prev: Footnote, next: Footnote): boolean => {
        return prev.text == next.text
            && prev.figureIds == next.figureIds;
    };

    const [entity, setEntity] = createSignal<Footnote>(props.entity, {equals});

    createEffect(on(
        storeCtx.update.entity.get,
        (id) => (!id || id == props.entity.id) && setEntity(fetchEntity),
        {defer: true}
    ));

    const text = createMemo(() => entity().text);

    const figures = createMemo((): Figure[] => {
        return entity().figureIds.map((id) => {
            const figure = storeCtx.store.asset.getById<Figure>(id);
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

