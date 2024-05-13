import {ENTITY, LAYER} from "@enum";
import styles from "./DockArea.module.scss";
import {Accessor, JSX, Setter, Signal, ValidComponent, createSignal} from "solid-js";
import {MarkerForm} from "@ui/marker/widget";
import {DecorForm} from "@ui/decor/widget";
import {AreaForm} from "@ui/area/widget";
import {Dynamic} from "solid-js/web";
import {NamespaceProvider} from "@ui/app/context";
import {Id} from "@type";
import {useEditorContext} from "@ui/editor/context";

type Form = {
    name: string;
    component: ValidComponent;
    id: Signal<Id | null>;
    getId: Accessor<Id | null>;
    setId: Setter<Id | null>;
};

export function DockArea(): JSX.Element {
    const editorCtx = useEditorContext();

    const forms: Form[] = [
        {name: ENTITY.MARKER, component: MarkerForm},
        {name: ENTITY.DECOR, component: DecorForm},
        {name: ENTITY.AREA, component: AreaForm},
    ].map((form) => {
        const id = createSignal<Id | null>(null);
        return {...form, id, getId: id[0], setId: id[1]};
    });

    const [selected, setSelected] = createSignal<Form | undefined>();

    editorCtx.formMode = {
        set: (name: string, id?: Id): void => {
            const form = forms.find((form) => form.name == name);
            if (!form) throw new Error();
            form.setId(id ?? null);
            setSelected(form);
        },
    };

    return (
        <div id={LAYER.DOCKAREA} class={styles.DockArea}>
            <NamespaceProvider namespace={"FormMode"}>
                <NamespaceProvider namespace={selected()?.name ?? ""}>
                    <Dynamic
                        component={selected()?.component}
                        entityId={selected()?.id}
                    />
                </NamespaceProvider>
            </NamespaceProvider>
        </div>
    );
}