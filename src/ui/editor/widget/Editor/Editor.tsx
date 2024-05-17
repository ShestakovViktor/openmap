import {JSX, onMount} from "solid-js";
import styles from "./Editor.module.scss";
import {
    ModalLayer,
    DockArea,
    ToolKit,
    WorkSpace,
    ToolBar,
    SystemKit,
} from "@src/ui/editor/widget";
import {InitialDialog} from "@ui/project/widget";
import {Modal} from "@ui/widget/Modal";
import {useEditorContext} from "@ui/editor/context";
import {VIEWER_ID} from "@ui/viewer/widget";
import {
    InputMode,
    FocusMode,
} from "@ui/editor/mode";
import {EntityMode} from "@ui/entity/mode";
import {MarkerMode} from "@ui/marker/mode";
import {DecorMode} from "@ui/decor/mode";
import {AreaMode} from "@ui/area/mode";
import {ENTITY} from "@enum";

type Props = {
    children: JSX.Element;
};

export function Editor(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    editorCtx.inputMode = new InputMode();
    editorCtx.inputMode.add(ENTITY.ENTITY.id, new EntityMode());
    editorCtx.inputMode.add(ENTITY.MARKER.id, new MarkerMode());
    editorCtx.inputMode.add(ENTITY.DECOR.id, new DecorMode());
    editorCtx.inputMode.add(ENTITY.AREA.id, new AreaMode());

    editorCtx.focusMode = new FocusMode();

    onMount(() => {
        const viewer = document.querySelector<HTMLDivElement>("#" + VIEWER_ID);
        if (!viewer) throw new Error();

        viewer.addEventListener("pointerdown", (event: PointerEvent) => {
            editorCtx.inputMode?.get().onPointerDown(event);
        });

        viewer.addEventListener("pointermove", (event: PointerEvent) => {
            editorCtx.inputMode?.get().onPointerMove(event);
        });

        viewer.addEventListener("pointerup", (event: PointerEvent) => {
            editorCtx.inputMode?.get().onPointerUp(event);
        });

        const initialDialogModal = new Modal({background: true});
        initialDialogModal.render(
            <InitialDialog onComplete={() => initialDialogModal.hide()}/>
        );
        initialDialogModal.show();
    });

    return (
        <div id="editor" class={styles.Editor}>
            <WorkSpace>
                {props.children}
                <ToolBar/>
            </WorkSpace>
            <SystemKit/>
            <ToolKit/>
            <DockArea/>
            <ModalLayer/>
        </div>
    );
}