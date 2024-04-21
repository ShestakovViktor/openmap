import {Show, Signal, createSignal} from "solid-js";
import {LayerName} from "@enum";
import {MarkerForm} from "@ui/marker/widget";
import {Dynamic, Portal} from "solid-js/web";
import {AreaForm} from "@ui/area/widget";
import {DecorForm} from "@ui/decor/widget";

export class FormMode {
    private forms: {
        name: string;
        show: Signal<boolean | undefined>;
        data: Signal<number | undefined>;
    }[];

    private showing: string | undefined;

    constructor() {
        const dest = "#" + LayerName.DOCKAREA;
        this.forms = [
            {name: "marker", component: MarkerForm},
            {name: "decor", component: DecorForm},
            {name: "area", component: AreaForm},
        ].map(({name, component}) => {
            const show = createSignal<boolean>();
            const data = createSignal<number>();

            <Show when={show[0]()}>
                <Portal mount={document.querySelector(dest)!}>
                    <Dynamic
                        component={component}
                        signal={data}
                    />
                </Portal>
            </Show>;

            return {name, show, data};
        });
    }

    show(entity: string, id?: number): void {
        if (this.showing && this.showing != entity) {
            const boo = this.forms.find((form) => form.name == this.showing);
            if (!boo) throw new Error();
            boo.show[1](false);

            this.showing = entity;

            const foo = this.forms.find((form) => form.name == entity);
            if (foo) {
                foo.data[1](id);
                foo.show[1](true);
            }
        }
        else if (!this.showing) {
            this.showing = entity;

            const foo = this.forms.find((form) => form.name == entity);
            if (foo) {
                foo.data[1](id);
                foo.show[1](true);
            }
        }
        else if (this.showing == entity) {
            const foo = this.forms.find((form) => form.name == entity);
            if (foo) {
                foo.data[1](id);
            }
        }
    }
}