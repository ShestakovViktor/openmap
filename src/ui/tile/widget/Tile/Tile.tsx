import styles from "./Tile.module.scss";
import {JSXElement} from "solid-js";
import {Id, Tile as TileData} from "@type";
import {useViewerContext} from "@ui/viewer/context";

type Props = {
    entityId: Id;
};

export function Tile(props: Props): JSXElement {
    const context = useViewerContext();
    const entity = context.store.entity
        .getById<TileData>(props.entityId);
    const src = context.store.source
        .getById(entity.sourceId);

    return (
        <img
            class={styles.Tile}
            src={src.path || src.content}
            draggable={false}
            style={{
                transform: `translate3d(${entity.x + "px"}, ${entity.y + "px"}, 0)`,
                // width: String(entity.width) + "px",
                // height: String(entity.height) + "px",
            }}
        />
    );
}