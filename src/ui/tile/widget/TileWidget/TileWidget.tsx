import styles from "./TileWidget.module.scss";
import {JSX, createEffect, createMemo, createSignal, on} from "solid-js";
import {Asset, Tile} from "@type";
import {useViewerContext} from "@ui/viewer/context";
import {assetToSrc} from "@ui/app/utiliy";

type Props = {
    entity: Tile;
};

export function TileWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const fetchEntity = (): Tile => {
        const tile = viewerCtx.store.entity.getById<Tile>(props.entity.id);
        if (!tile) throw new Error(`There is no tile with id ${props.entity.id}`);
        return tile;
    };

    const equals = (prev: Tile, next: Tile): boolean => {
        return prev.imageId == next.imageId;
    };

    const [entity, setEntity] = createSignal<Tile>(props.entity, {equals});

    createEffect(on(
        viewerCtx.render,
        (id) => (!id || id == props.entity.id) && setEntity(fetchEntity),
        {defer: true}
    ));

    const style = createMemo((): JSX.CSSProperties => {
        const x = entity().x;
        const y = entity().y;
        return {
            transform: `translate3d(${x}px, ${y}px, 0)`,
        };
    });

    const src = createMemo((): string => {
        const imageId = entity().imageId;

        if (!imageId) {
            return "";
        }
        else {
            const asset = viewerCtx.store.asset
                .getById<Asset>(imageId);

            if (!asset) throw new Error();

            return asset.path || assetToSrc(asset);
        }
    });

    return (
        <img
            class={styles.Tile}
            src={src()}
            style={style()}
            draggable={false}
        />
    );
}