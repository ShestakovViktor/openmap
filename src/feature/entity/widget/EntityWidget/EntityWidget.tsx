import {createMemo, JSX, Show, ValidComponent} from "solid-js";
import {TileWidget} from "@feature/tile/widget";
import {LayerWidget} from "@feature/layer/widget";
import {MarkerWidget} from "@feature/marker/widget";
import {Dynamic} from "solid-js/web";
import {ENTITY_TYPE} from "@feature/entity/enum";
import {DecorWidget} from "@feature/decor/widget";
import {AreaWidget} from "@feature/area/widget";
import {FootnoteWidget} from "@feature/footnote/widget";
import {useStoreContext} from "@feature/store/context";

type Props = {
    entityId: number;
    ref?: HTMLDivElement | ((el: HTMLElement) => void);
};

export function EntityWidget(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    const entity = createMemo(() => {
        const entity = storeCtx.store.entity.getById(props.entityId);
        if (!entity) throw new Error();
        return entity;
    });

    const entities: {[key: string]: ValidComponent} = {
        [ENTITY_TYPE.LAYER]: LayerWidget,
        [ENTITY_TYPE.TILE]: TileWidget,
        [ENTITY_TYPE.FOOTNOTE]: FootnoteWidget,
        [ENTITY_TYPE.MARKER]: MarkerWidget,
        [ENTITY_TYPE.DECOR]: DecorWidget,
        [ENTITY_TYPE.AREA]: AreaWidget,
    };

    return (
        <Dynamic
            component={entities[entity().entityTypeId]}
            entity={entity}
        />
    );
}