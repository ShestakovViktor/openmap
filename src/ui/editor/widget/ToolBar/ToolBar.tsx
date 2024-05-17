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
import {Id} from "@type";
import {EntityToolbar} from "@ui/entity/widget";
import {ENTITY} from "@enum";

type Toolbar = {
    name: string;
    component: ValidComponent;
    id: Signal<Id | null>;
    getId: Accessor<Id | null>;
    setId: Setter<Id | null>;
};

export function ToolBar(): JSX.Element {
    const editorCtx = useEditorContext();

    const forms: Toolbar[] = [
        {name: ENTITY.ENTITY.name, component: EntityToolbar},
    ].map((form) => {
        const id = createSignal<Id | null>(null);
        return {...form, id, getId: id[0], setId: id[1]};
    });

    const [selected, setSelected] = createSignal<Toolbar | undefined>();

    editorCtx.toolbarMode = {
        set: (name?: string, id?: Id): void => {
            if (name) {
                const form = forms.find((form) => form.name == name);
                if (!form) throw new Error();
                form.setId(id ?? null);
                setSelected(form);
            }
            else {
                setSelected();
            }
        },
    };

    return (
        <div class={styles.ToolBar}>
            <NamespaceProvider namespace={"ToolbarMode"}>
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