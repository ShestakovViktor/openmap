import {JSX, ValidComponent} from "solid-js";
import {TileWidget} from "@src/ui/tile/widget";
import {Group} from "@src/ui/group/widget";
import {MarkerWidget} from "@src/ui/marker/widget";
import {useViewerContext} from "@ui/viewer/context";
import {Dynamic} from "solid-js/web";
import {ENTITY} from "@enum";
import {Id} from "@type";
import {DecorWidget} from "@ui/decor/widget";
import {AreaWidget} from "@ui/area/widget";

type Props = {
    entityId: Id;
    ref?: HTMLDivElement | ((el: HTMLElement) => void);
};

export function Entity(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const entity = viewerCtx.store.entity.getById(props.entityId);
    if (!entity) throw new Error();

    const entities: {[key: string]: ValidComponent} = {
        [ENTITY.GROUP.id]: Group,
        [ENTITY.TILE.id]: TileWidget,
        [ENTITY.MARKER.id]: MarkerWidget,
        [ENTITY.DECOR.id]: DecorWidget,
        [ENTITY.AREA.id]: AreaWidget,
    };

    return (
        <Dynamic
            component={entities[entity.entityTypeId]}
            entityId={props.entityId}
            ref={props.ref}
        />
    );
}