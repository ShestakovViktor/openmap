import styles from "./ToolKit.module.scss";
import CursorIconSvg from "@public/icon/cursor.svg";
import MarkerIconSvg from "@public/icon/marker.svg";
import DecorIconSvg from "@public/icon/decor.svg";
import PolygonIconSvg from "@public/icon/polygon.svg";

import {Button} from "@ui/widget";
import {For, JSX, createSignal, onMount} from "solid-js";
import {useEditorContext} from "@ui/editor/context";

export function ToolKit(): JSX.Element {
    const editorCtx = useEditorContext();
    const [selected, setSelected] = createSignal(0);

    const buttons = [
        {
            icon: CursorIconSvg,
            onClick(): void {
                const {input, toolbar} = editorCtx.modes.entity;
                editorCtx.entityFocus.clear();
                editorCtx.userInput.set(input);
                editorCtx.toolBar.clear();
                editorCtx.toolBar.set(toolbar);
                editorCtx.dockArea.clear();
            },
        },
        {
            icon: MarkerIconSvg,
            onClick(): void {
                const {input, form, toolbar} = editorCtx.modes.marker;
                form.set(null);
                editorCtx.entityFocus.clear();
                editorCtx.userInput.set(input);
                editorCtx.dockArea.set(form);
                editorCtx.toolBar.set(toolbar);
            },
        },
        {
            icon: DecorIconSvg,
            onClick(): void {
                const {input, form} = editorCtx.modes.decor;
                form.set(null);
                editorCtx.entityFocus.clear();
                editorCtx.userInput.set(input);
                editorCtx.dockArea.set(form);
                editorCtx.toolBar.clear();
            },
        },
        {
            icon: PolygonIconSvg,
            onClick(): void {
                const {input, form} = editorCtx.modes.area;
                form.set(null);
                editorCtx.entityFocus.clear();
                editorCtx.userInput.set(input);
                editorCtx.dockArea.set(form);
                editorCtx.toolBar.clear();
            },
        },

    ];

    onMount(() => {
        buttons[0].onClick();
    });

    return (
        <div class={styles.ToolKit}>
            <For each={buttons}>
                {(button, index) =>
                    <Button
                        pressed={selected() == index()}
                        icon={button.icon}
                        onClick={() => {
                            setSelected(index());
                            button.onClick();
                        }}
                    />
                }
            </For>
        </div>
    );
}