import {JSX, ValidComponent, createResource} from "solid-js";
import {TileWidget} from "@src/ui/tile/widget";
import {LayerWidget} from "@src/ui/layer/widget";
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

export function EntityWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const [entity] = createResource(
        () => {
            const entity = viewerCtx.store.entity.getById(props.entityId);
            if (!entity) {
                throw new Error(`There is no entity with id ${props.entityId}`);
            }
            return entity;
        }
    );

    const entities: {[key: string]: ValidComponent} = {
        [ENTITY.LAYER]: LayerWidget,
        [ENTITY.TILE]: TileWidget,
        [ENTITY.MARKER]: MarkerWidget,
        [ENTITY.DECOR]: DecorWidget,
        [ENTITY.AREA]: AreaWidget,
    };

    return (
        <Dynamic
            component={entities[entity()!.entityTypeId]}
            entity={entity()}
        />
    );
}