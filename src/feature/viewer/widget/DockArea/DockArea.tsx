import {IDS} from "@enum";
import styles from "./DockArea.module.scss";
import {For, JSX, Match, Switch} from "solid-js";
import {useEditorContext} from "@feature/editor/context";
import {EntityForm} from "@feature/entity/widget";
import {UI_MODE} from "@feature/editor/enum";

export function DockArea(): JSX.Element {
    const {state} = useEditorContext();

    return (
        <div id={IDS.DOCK_AREA} class={styles.DockArea}>
            <For each={state.dockArea.items}>
                {(item) =>
                    <Switch >
                        <Match when={item == UI_MODE.ENTITY_FORM}>
                            <EntityForm/>
                        </Match>
                    </Switch>
                }
            </For>
        </div>
    );
}