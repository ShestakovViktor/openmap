import {JSX, ValidComponent, createEffect, createSignal, on} from "solid-js";
import {TileWidget} from "@src/ui/tile/widget";
import {LayerWidget} from "@src/ui/layer/widget";
import {MarkerWidget} from "@src/ui/marker/widget";
import {Dynamic} from "solid-js/web";
import {ENTITY} from "@enum";
import {Entity, Id} from "@type";
import {DecorWidget} from "@ui/decor/widget";
import {AreaWidget} from "@ui/area/widget";
import {FootnoteWidget} from "@ui/footnote/widget";
import {useSignalContext, useStoreContext} from "@ui/app/context";

type Props = {
    entityId: Id;
    ref?: HTMLDivElement | ((el: HTMLElement) => void);
};

export function EntityWidget(props: Props): JSX.Element {
    const {store} = useStoreContext();
    const {signal} = useSignalContext();

    const fetch = (): Entity => {
        const entity = store.entity.getById(props.entityId);
        if (!entity) {
            throw new Error(`There is no entity with id ${props.entityId}`);
        }
        return entity;
    };

    const [entity, setEntity] = createSignal(fetch(), {equals: false});

    createEffect(on(
        signal.entity.getUpdateById,
        (id) => (!id || id == entity().id) && setEntity(fetch()),
        {defer: true}
    ));

    const entities: {[key: string]: ValidComponent} = {
        [ENTITY.LAYER]: LayerWidget,
        [ENTITY.TILE]: TileWidget,
        [ENTITY.FOOTNOTE]: FootnoteWidget,
        [ENTITY.MARKER]: MarkerWidget,
        [ENTITY.DECOR]: DecorWidget,
        [ENTITY.AREA]: AreaWidget,
    };

    return (
        <Dynamic
            component={entities[entity().entityTypeId]}
            entity={entity}
        />
    );
}