import {Signal, createEffect, createSignal, on} from "solid-js";

export function createLocalStorageSyncSignal<T>(
    value: T,
    options: {
        name: string;
    }
): Signal<T> {
    const savedValue = localStorage.getItem(options.name);
    let signal: Signal<T>;

    if (savedValue == null) {
        signal = createSignal(value);
    }
    else {
        const data = JSON.parse(savedValue) as T;
        signal = createSignal(data);
    }
    createEffect(on(signal[0], (value) => {
        localStorage.setItem(options.name, JSON.stringify(value));
    }));

    return signal;
}