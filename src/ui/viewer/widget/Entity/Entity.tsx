import {JSXElement, createMemo} from "solid-js";
import {Tile} from "@src/ui/tile/widget";
import {Group} from "@src/ui/viewer/widget";
import {Marker} from "@src/ui/marker/widget";
import {useViewerContext} from "@ui/viewer/context";
import {Dynamic} from "solid-js/web";
import {EntityType} from "@enum";
import {Id} from "@type";
import {Motion} from "@ui/motion/widget";
import {Decor} from "@ui/decor/widget";

type Props = {
    entityId: Id;
    ref?: HTMLDivElement | ((el: HTMLElement) => void);
};

export function Entity(props: Props): JSXElement {
    const viewerCtx = useViewerContext();

    const entity = createMemo(
        () => viewerCtx.store.entity.getById(props.entityId),
        undefined,
        {equals: false}
    );

    const {id: groupTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.GROUP})[0];

    const {id: tileTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.TILE})[0];

    const {id: makerTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.MARKER})[0];

    const {id: decorTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.DECOR})[0];

    const {id: motionTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.MOTION})[0];

    const entities: {
        [key: string]: (props: {entityId: Id}) => JSXElement;
    } = {
        [groupTypeId]: Group,
        [tileTypeId]: Tile,
        [makerTypeId]: Marker,
        [decorTypeId]: Decor,
        [motionTypeId]: Motion,
    };

    return (
        <Dynamic
            component={entities[entity().typeId]}
            entityId={props.entityId}
            ref={props.ref}
        />
    );
}