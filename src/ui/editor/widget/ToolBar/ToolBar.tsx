import styles from "./ToolBar.module.scss";
import {
    JSX,
    createSignal,
    Signal,
    Accessor,
    Setter,
    ValidComponent,
} from "solid-js";
import {NamespaceProvider} from "@ui/app/context";
import {Dynamic} from "solid-js/web";
import {useEditorContext} from "@ui/editor/context";
import {EntityToolbar} from "@ui/entity/widget";
import {ENTITY} from "@enum";
import {ToolbarMode} from "@ui/editor/mode";

export function ToolBar(): JSX.Element {
    const editorCtx = useEditorContext();

    const toolbarMode = new ToolbarMode([
        {...ENTITY.ENTITY, component: EntityToolbar},
    ]);

    editorCtx.toolbarMode = toolbarMode;

    return (
        <div class={styles.ToolBar}>
            <NamespaceProvider namespace={"ToolbarMode"}>
                <Dynamic
                    component={toolbarMode.getCurrent()?.component}
                    entityId={toolbarMode.getCurrent()?.id}
                />
            </NamespaceProvider>
        </div>
    );
}