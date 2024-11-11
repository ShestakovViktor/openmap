import {IDS} from "@enum";
import {JSX, onMount} from "solid-js";
import styles from "./Editor.module.scss";
import {
    ModalLayer,
    WorkSpace,
    SidePanel,
    ToolKit,
    DockArea,
    CommandKit,
} from "@feature/editor/widget";
import {InputManager} from "@feature/editor/input";
import {Viewer} from "@feature/viewer/widget";
import {useEditorContext} from "@feature/editor/context";
import {useStoreContext} from "@feature/store/context";
import {Parent} from "@feature/entity/type";

export function Editor(): JSX.Element {
    const storeCtx = useStoreContext();
    const editorCtx = useEditorContext();

    onMount(() => {
        const viewer = document.querySelector<HTMLDivElement>("#" + IDS.VIEWER);
        if (!viewer) throw new Error();

        new InputManager(viewer);

        const parent = storeCtx.store.entity.getById<Parent>(3);
        if (!parent) throw new Error();

        editorCtx.setLayer(parent);
    });

    return (
        <div id={IDS.EDITOR} class={styles.Editor}>
            <WorkSpace>
                <Viewer/>
                <ToolKit/>
            </WorkSpace>
            <SidePanel>
                <CommandKit/>
                <DockArea/>
            </SidePanel>
            <ModalLayer/>
        </div>
    );
}