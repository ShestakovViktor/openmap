import styles from "./ToolKit.module.scss";
import CursorIconSvg from "@public/icon/cursor.svg";
import MarkerIconSvg from "@public/icon/marker.svg";
import DecorIconSvg from "@public/icon/decor.svg";
import PolygonIconSvg from "@public/icon/polygon.svg";

import {Button} from "@ui/widget";
import {For, JSX, createSignal, onMount} from "solid-js";
import {MarkerIOMode} from "@ui/marker/mode";
import {SelectIOMode} from "@ui/editor/mode";
import {useEditorContext} from "@ui/editor/context";
import {DecorIOMode} from "@ui/decor/mode";
import {AreaIOMode} from "@ui/area/mode";

export function ToolKit(): JSX.Element {
    const editorCtx = useEditorContext();
    const [selected, setSelected] = createSignal(0);

    const buttons = [
        {
            mode: new SelectIOMode(),
            icon: CursorIconSvg,
        },
        {
            mode: new MarkerIOMode(),
            icon: MarkerIconSvg,
        },
        {
            mode: new DecorIOMode(),
            icon: DecorIconSvg,
        },
        {
            mode: new AreaIOMode(),
            icon: PolygonIconSvg,
        },
    ];

    onMount(() => {
        editorCtx.setIOMode(buttons[0].mode);
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
                            editorCtx.setIOMode(item.mode);
                            setSelected(index());
                        }}
                    />
                )}
            </For>
        </div>
    );
}