import {Id} from "@type";
import {Accessor, Setter, createEffect, on} from "solid-js";

export function updateEffect<T>(
    render: Accessor<Id | undefined>,
    fetchEntity: () => T,
    setEntity: Setter<T>,
    id: Id
): void {
    createEffect(on(
        render,
        (input) => {
            if (!input || input == id){
                // console.log(`Handle update for ${!input ? "all" : input}`);
                setEntity(fetchEntity);
            }
        },
        {defer: true}
    ));
}