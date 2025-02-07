import styles from "./TileWidget.module.scss";
import {Accessor, JSX, createMemo} from "solid-js";
import {Tile} from "@feature/tile/type";
import {useStoreContext} from "@feature/store/context";
import {useViewerContext} from "@feature/viewer/context";

type Props = {
    entity: Accessor<Tile>;
};

export function TileWidget({entity}: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const viewerCtx = useViewerContext();

    const style = createMemo((): JSX.CSSProperties => {
        return {transform: `translate3d(${entity().x}px, ${entity().y}px, 0)`};
    });

    const src = createMemo((): string => {
        const imageId = entity().imageId;

        if (!imageId) {
            return "";
        }
        else {
            const tile = storeCtx.store.asset.getById(imageId);

            if (!tile) throw new Error();

            const src = viewerCtx.path + tile.path;

            return src;
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