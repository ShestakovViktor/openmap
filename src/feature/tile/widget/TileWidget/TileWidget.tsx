import styles from "./TileWidget.module.scss";
import {Accessor, JSX, createMemo} from "solid-js";
import {Tile} from "@feature/tile/type";
import {assetToSrc} from "@feature/app/utiliy";
import {useStoreContext} from "@feature/store/context";
import {useViewerContext} from "@feature/viewer/context";

type Props = {
    entity: Accessor<Tile>;
};

export function TileWidget({entity}: Props): JSX.Element {
    const {store} = useStoreContext();
    const {path} = useViewerContext();

    const style = createMemo((): JSX.CSSProperties => {
        return {transform: `translate3d(${entity().x}px, ${entity().y}px, 0)`};
    });

    const src = createMemo((): string => {
        const imageId = entity().imageId;

        if (!imageId) {
            return "";
        }
        else {
            const asset = store.asset.getById(imageId);

            if (!asset) throw new Error();

            return path + asset.path || assetToSrc(asset);
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