import {Accessor, Setter, Show, Signal, createResource, createSignal} from "solid-js";
import {LayerName} from "@enum";
import {MarkerForm} from "@ui/marker/widget";
import {Dynamic, Portal} from "solid-js/web";
import {AreaForm} from "@ui/area/widget";
import {DecorForm} from "@ui/decor/widget";
import {Id} from "@type";

export class FormMode {
    private forms: {
        name: string;
        getId: Accessor<Id | null>;
        setId: Setter<Id | null>;
        getVisibility: Accessor<boolean>;
        setVisibility: Setter<boolean>;
    }[];

    private showing: string | undefined;

    constructor() {
        const dest = "#" + LayerName.DOCKAREA;
        this.forms = [
            {name: "marker", component: MarkerForm},
            {name: "decor", component: DecorForm},
            {name: "area", component: AreaForm},
        ].map(({name, component}) => {
            const [getId, setId] = createSignal<Id | null>(null);
            const [getVisibility, setVisibility] = createSignal<boolean>(false);

            <Show when={getVisibility()}>
                <Portal mount={document.querySelector(dest)!}>
                    <Dynamic
                        component={component}
                        id={[getId, setId]}
                    />
                </Portal>
            </Show>;

            return {name, getId, setId, getVisibility, setVisibility};
        });
    }

    show(type: string, id?: Id): void {
        if (this.showing && this.showing != type) {
            const boo = this.forms.find((form) => form.name == this.showing);
            if (!boo) throw new Error();
            boo.setVisibility(false);

            this.showing = type;

            const form = this.forms.find((form) => form.name == type);
            if (form) {
                form.setId(id ?? null);
                form.setVisibility(true);
            }
        }
        else if (!this.showing) {
            this.showing = type;

            const form = this.forms.find((form) => form.name == type);
            if (form) {
                form.setId(id ?? null);
                form.setVisibility(true);
            }
        }
        else if (this.showing == type) {
            const form = this.forms.find((form) => form.name == type);
            if (form) form.setId(id ?? null);
        }
    }
}