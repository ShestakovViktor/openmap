import {JSX, createMemo} from "solid-js";
import {TileWidget} from "@src/ui/tile/widget";
import {Group} from "@src/ui/group/widget";
import {MarkerWidget} from "@src/ui/marker/widget";
import {useViewerContext} from "@ui/viewer/context";
import {Dynamic} from "solid-js/web";
import {EntityType} from "@enum";
import {Id} from "@type";
import {MotionWidget} from "@ui/motion/widget";
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

    const {id: groupTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.GROUP})[0];

    const {id: tileTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.TILE})[0];

    const {id: makerTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.MARKER})[0];

    const {id: decorTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.DECOR})[0];

    const {id: areaTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.AREA})[0];

    const {id: motionTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.MOTION})[0];

    const entities: {
        [key: string]: (props: {entityId: Id}) => JSX.Element;
    } = {
        [groupTypeId]: Group,
        [tileTypeId]: TileWidget,
        [makerTypeId]: MarkerWidget,
        [decorTypeId]: DecorWidget,
        [areaTypeId]: AreaWidget,
        [motionTypeId]: MotionWidget,
    };

    return (
        <Dynamic
            component={entities[entity.typeId]}
            entityId={props.entityId}
            ref={props.ref}
        />
    );
}