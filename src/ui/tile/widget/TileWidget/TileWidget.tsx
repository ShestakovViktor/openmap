import styles from "./TileWidget.module.scss";
import {Accessor, JSX, createMemo} from "solid-js";
import {Asset, Tile} from "@type";
import {assetToSrc} from "@ui/app/utiliy";
import {useStoreContext} from "@ui/app/context";

type Props = {
    entity: Accessor<Tile>;
};

export function TileWidget(props: Props): JSX.Element {
    const {entity} = props;
    const {store} = useStoreContext();

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
            const asset = store.asset.getById<Asset>(imageId);

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