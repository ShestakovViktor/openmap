import {Id} from "@type";
import {ValidComponent, Signal, Accessor, Setter, createSignal} from "solid-js";

type Form = {
    name: string;
    component: ValidComponent;
    id: Signal<Id | null>;
    getId: Accessor<Id | null>;
    setId: Setter<Id | null>;

    update: Signal<undefined>;
    fetch: Accessor<undefined>;
    refetch: Setter<undefined>;
};

export class FormMode {
    private forms: {[key: Id]: Form} = {};

    getCurrent: Accessor<Form | null>;

    setCurrent: Setter<Form | null>;

    constructor(forms: {id: Id; name: string; component: ValidComponent}[]) {
        const [getCurrent, setCurrent] = createSignal<Form | null>(null);
        this.getCurrent = getCurrent;
        this.setCurrent = setCurrent;

        forms.forEach((form) => {
            const {id, name, component} = form;
            const [getId, setId] = createSignal<Id | null>(null);
            const [fetch, refetch] = createSignal(undefined, {equals: false});

            this.forms[id] = {
                name,
                component,
                id: [getId, setId],
                getId,
                setId,
                update: [fetch, refetch],
                fetch,
                refetch,
            };
        });
    }

    set(entityTypeId: Id, id?: Id): void {
        this.setCurrent(this.forms[entityTypeId]);
        this.getCurrent()?.setId(id ?? null);
    }

    get(): Form | null {
        return this.getCurrent();
    }

    upd(): void {
        this.getCurrent()?.refetch();
    }
}