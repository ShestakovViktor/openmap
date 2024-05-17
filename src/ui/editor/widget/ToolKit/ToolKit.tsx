import styles from "./ToolKit.module.scss";
import CursorIconSvg from "@public/icon/cursor.svg";
import MarkerIconSvg from "@public/icon/marker.svg";
import DecorIconSvg from "@public/icon/decor.svg";
import PolygonIconSvg from "@public/icon/polygon.svg";

import {Button} from "@ui/widget";
import {For, JSX, createSignal, onMount} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {ENTITY} from "@enum";

export function ToolKit(): JSX.Element {
    const editorCtx = useEditorContext();
    const [selected, setSelected] = createSignal(0);

    const buttons = [
        {
            icon: CursorIconSvg,
            onClick: (): void => {
                editorCtx.inputMode?.set(ENTITY.ENTITY.name);
                editorCtx.toolbarMode?.set(ENTITY.ENTITY.name);
            },
        },
        {
            icon: MarkerIconSvg,
            onClick: (): void => {
                editorCtx.inputMode?.set(ENTITY.MARKER.name);
                editorCtx.formMode?.set(ENTITY.MARKER.name);
                editorCtx.toolbarMode?.set();
            },

        },
        {
            icon: DecorIconSvg,
            onClick: (): void => {
                editorCtx.inputMode?.set(ENTITY.DECOR.name);
                editorCtx.formMode?.set(ENTITY.DECOR.name);
                editorCtx.toolbarMode?.set();
            },
        },
        {
            icon: PolygonIconSvg,
            onClick: (): void => {
                editorCtx.inputMode?.set(ENTITY.AREA.name);
                editorCtx.formMode?.set(ENTITY.AREA.name);
                editorCtx.toolbarMode?.set();
            },
        },
    ];

    onMount(() => {
        buttons[0].onClick();
        setSelected(0);
    });

    return (
        <div class={styles.ToolKit}>
            <For each={buttons}>
                {(item, index) => (
                    <Button
                        icon={item.icon}
                        pressed={index() == selected()}
                        onClick={() => {
                            item.onClick();
                            setSelected(index());
                        }}
                    />
                )}
            </For>
        </div>
    );
}