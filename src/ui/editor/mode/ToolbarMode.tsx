import {Show, Signal, createSignal} from "solid-js";
import {LayerName} from "@enum";
import {Dynamic, Portal} from "solid-js/web";
import {AreaToolbar} from "@ui/area/widget";

export class ToolbarMode {
    private toolbars: {
        name: string;
        show: Signal<boolean | undefined>;
        data: Signal<number | undefined>;
    }[];

    constructor() {
        const dest = "#" + LayerName.TOOLBAR;
        this.toolbars = [
            {name: "area", component: AreaToolbar},
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
        const foo = this.toolbars.find((form) => form.name == entity);
        if (foo) {
            foo.data[1](id);
            foo.show[1](true);
        }
    }
}