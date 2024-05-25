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
import {EntityInputMode, EntityToolbarMode} from "@ui/entity/mode";
import {MarkerFormMode, MarkerInputMode, MarkerToolbarMode} from "@ui/marker/mode";
import {DecorFormMode, DecorInputMode} from "@ui/decor/mode";
import {AreaFormMode, AreaInputMode} from "@ui/area/mode";

type Props = {
    children: JSX.Element;
};

export function Editor(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    onMount(() => {
        editorCtx.modes = {
            entity: {
                input: new EntityInputMode(),
                toolbar: new EntityToolbarMode(),
            },
            marker: {
                input: new MarkerInputMode(),
                form: new MarkerFormMode(),
                toolbar: new MarkerToolbarMode(),
            },
            decor: {
                input: new DecorInputMode(),
                form: new DecorFormMode(),
            },
            area: {
                input: new AreaInputMode(),
                form: new AreaFormMode(),
            },
        };

        const viewer = document.querySelector<HTMLDivElement>("#" + VIEWER_ID);
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