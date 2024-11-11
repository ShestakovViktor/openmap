import {JSX, Show, ValidComponent, createMemo} from "solid-js";
import {ENTITY_TYPE} from "@feature/entity/enum";
import {useEditorContext} from "@feature/editor/context";
import {Dynamic} from "solid-js/web";
import {MarkerForm} from "@feature/marker/widget";
import {DecorForm} from "@feature/decor/widget";
import {AreaForm} from "@feature/area/widget";

export function EntityForm(): JSX.Element {
    const editorCtx = useEditorContext();

    const entity = createMemo(() => editorCtx.selected());

    const entities: {[key: string]: ValidComponent} = {
        [ENTITY_TYPE.MARKER]: MarkerForm,
        [ENTITY_TYPE.DECOR]: DecorForm,
        [ENTITY_TYPE.AREA]: AreaForm,
    };

    return (
        <Show when={entity()} fallback={<h1>No entity</h1>}>
            {(entity) =>
                <Dynamic
                    component={entities[entity().entityTypeId]}
                    entity={entity}
                />
            }
        </Show>
    );
}