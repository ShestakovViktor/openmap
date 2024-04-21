import styles from "./Tile.module.scss";
import {JSX, createMemo} from "solid-js";
import {Id, Tile as TileData} from "@type";
import {useViewerContext} from "@ui/viewer/context";

type Props = {
    entityId: Id;
};

export function Tile(props: Props): JSX.Element {
    const context = useViewerContext();

    const entity = context.store.entity
        .getById<TileData>(props.entityId);

    const source = createMemo(
        () => context.store.source.getById(entity.sourceId),
        "",
        {equals: () => true}
    );

    return (
        <img
            class={styles.Tile}
            src={source().path || source().content}
            draggable={false}
            style={{
                transform: `translate3d(${entity.x + "px"}, ${entity.y + "px"}, 0)`,
            }}
        />
    );
}