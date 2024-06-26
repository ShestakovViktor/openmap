import styles from "./InputKit.module.scss";
import LoupeIconSvg from "@res/svg/loupe.svg";
import CursorIconSvg from "@res/svg/cursor.svg";
import MarkerIconSvg from "@res/svg/marker.svg";
import DecorIconSvg from "@res/svg/decor.svg";
import PolygonIconSvg from "@res/svg/polygon.svg";

import {Button, Toolbar} from "@ui/widget";
import {For, JSX, createSignal, onMount} from "solid-js";
import {useEditorContext} from "@ui/editor/context";

export function InputKit(): JSX.Element {
    const editorCtx = useEditorContext();
    const [pressed, setPressed] = createSignal(0);

    const buttons = [
        {
            icon: LoupeIconSvg,
            onClick(): void {
                const {input} = editorCtx.modes.default;
                editorCtx.entityFocus.clear();
                editorCtx.userInput.set(input);
                editorCtx.toolKit.clear();
                editorCtx.dockArea.clear();
            },
        },
        {
            icon: CursorIconSvg,
            onClick(): void {
                const {input, toolKit} = editorCtx.modes.entity;
                editorCtx.entityFocus.clear();
                editorCtx.userInput.set(input);
                editorCtx.toolKit.clear();
                editorCtx.toolKit.set(toolKit);
                editorCtx.dockArea.clear();
            },
        },
        {
            icon: MarkerIconSvg,
            onClick(): void {
                const {input, form, toolKit} = editorCtx.modes.marker;
                form.set(null);
                editorCtx.entityFocus.clear();
                editorCtx.userInput.set(input);
                editorCtx.dockArea.set(form);
                editorCtx.toolKit.set(toolKit);
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
                editorCtx.toolKit.clear();
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
                editorCtx.toolKit.clear();
            },
        },

    ];

    onMount(() => {
        buttons[0].onClick();
    });

    return (
        <Toolbar class={styles.InputKit}>
            <For each={buttons}>
                {(button, index) =>
                    <Button
                        pressed={pressed() == index()
                            ? styles.Pressed
                            : undefined
                        }
                        icon={button.icon}
                        onClick={() => {
                            setPressed(index());
                            button.onClick();
                        }}
                    />
                }
            </For>
        </Toolbar>
    );
}