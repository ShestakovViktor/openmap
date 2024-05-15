import {ENTITY, LAYER} from "@enum";
import styles from "./DockArea.module.scss";
import {JSX} from "solid-js";
import {MarkerForm} from "@ui/marker/widget";
import {DecorForm} from "@ui/decor/widget";
import {AreaForm} from "@ui/area/widget";
import {Dynamic} from "solid-js/web";
import {NamespaceProvider} from "@ui/app/context";
import {useEditorContext} from "@ui/editor/context";
import {FormMode} from "@ui/editor/mode";

export function DockArea(): JSX.Element {
    const editorCtx = useEditorContext();

    const formMode = new FormMode([
        {name: ENTITY.MARKER, component: MarkerForm},
        {name: ENTITY.DECOR, component: DecorForm},
        {name: ENTITY.AREA, component: AreaForm},
    ]);

    editorCtx.formMode = formMode;

    return (
        <div id={LAYER.DOCKAREA} class={styles.DockArea}>
            <NamespaceProvider namespace={"FormMode"}>
                <NamespaceProvider namespace={formMode.getCurrent()?.name ?? ""}>
                    <Dynamic
                        component={formMode.getCurrent()?.component}
                        entityId={formMode.getCurrent()?.id}
                        update={formMode.getCurrent()?.update}
                    />
                </NamespaceProvider>
            </NamespaceProvider>
        </div>
    );
}