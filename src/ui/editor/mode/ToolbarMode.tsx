import {Id} from "@type";
import {ValidComponent, Signal, Accessor, Setter, createSignal} from "solid-js";

type Toolbar = {
    name: string;
    component: ValidComponent;
    id: Signal<Id | null>;
    getId: Accessor<Id | null>;
    setId: Setter<Id | null>;
};

export class ToolbarMode {
    private forms: {[key: Id]: Toolbar} = {};

    getCurrent: Accessor<Toolbar | null>;

    setCurrent: Setter<Toolbar | null>;

    constructor(toolbar: {id: Id; name: string; component: ValidComponent}[]) {
        const [getCurrent, setCurrent] = createSignal<Toolbar | null>(null);
        this.getCurrent = getCurrent;
        this.setCurrent = setCurrent;

        toolbar.forEach((toolbar) => {
            const {id, name, component} = toolbar;
            const [getId, setId] = createSignal<Id | null>(null);

            this.forms[id] = {
                name,
                component,
                id: [getId, setId],
                getId,
                setId,
            };
        });
    }

    set(entityTypeId: Id, id?: Id): void {
        this.setCurrent(this.forms[entityTypeId]);
        this.getCurrent()?.setId(id ?? null);
    }

    get(): Toolbar | null {
        return this.getCurrent();
    }
}