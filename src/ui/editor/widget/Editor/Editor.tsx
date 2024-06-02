import {IDS} from "@enum";
import {JSX, onMount} from "solid-js";
import styles from "./Editor.module.scss";
import {InitialDialog} from "@ui/project/widget";
import {Modal} from "@ui/widget/Modal";
import {useEditorContext} from "@ui/editor/context";
import {
    ModalLayer,
    DockArea,
    WorkSpace,
    ToolKit,
    CommandKit,
} from "@src/ui/editor/widget";
import {
    EntityInputMode,
    EntityToolKitMode,
} from "@ui/entity/mode";
import {
    MarkerFormDockAreaMode,
    MarkerInputMode,
    MarkerToolKitMode,
} from "@ui/marker/mode";
import {
    DecorFormDockAreaMode,
    DecorInputMode,
} from "@ui/decor/mode";
import {
    AreaFormDockAreaMode,
    AreaInputMode,
} from "@ui/area/mode";

type Props = {
    children: JSX.Element;
};

export function Editor(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    onMount(() => {
        editorCtx.modes = {
            entity: {
                input: new EntityInputMode(),
                toolKit: new EntityToolKitMode(),
            },
            marker: {
                input: new MarkerInputMode(),
                form: new MarkerFormDockAreaMode(),
                toolKit: new MarkerToolKitMode(),
            },
            decor: {
                input: new DecorInputMode(),
                form: new DecorFormDockAreaMode(),
            },
            area: {
                input: new AreaInputMode(),
                form: new AreaFormDockAreaMode(),
            },
        };

        const viewer = document.querySelector<HTMLDivElement>("#" + IDS.VIEWER);
        if (!viewer) throw new Error();

        viewer.addEventListener("pointerdown", (event: PointerEvent) => {
            editorCtx.userInput.active.onPointerDown(event);
        });

        viewer.addEventListener("pointermove", (event: PointerEvent) => {
            editorCtx.userInput.active.onPointerMove(event);
        });

        viewer.addEventListener("pointerup", (event: PointerEvent) => {
            editorCtx.userInput.active.onPointerUp(event);
        });

        const initialDialogModal = new Modal({background: true});
        initialDialogModal.render(
            <InitialDialog onComplete={() => initialDialogModal.hide()}/>
        );
        initialDialogModal.show();
    });

    return (
        <div id={IDS.EDITOR} class={styles.Editor}>
            <WorkSpace>
                {props.children}
                <ToolKit/>
            </WorkSpace>
            <CommandKit/>
            <DockArea/>
            <ModalLayer/>
        </div>
    );
}