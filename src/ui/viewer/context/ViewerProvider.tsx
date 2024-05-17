import {JSX, createSignal} from "solid-js";
import {ViewerContext} from "@ui/viewer/context";
import {createStore} from "solid-js/store";
import {Store} from "@core";
import {Layout} from "@type";

type Props = {
    store: Store;
    children: JSX.Element | JSX.Element[];
};

export function ViewerProvider(props: Props): JSX.Element {
    const [prepare, rePrepare] = createSignal(undefined, {equals: false});
    const [init, reInit] = createSignal(undefined, {equals: false});
    const [render, reRender] = createSignal<number | undefined>(
        undefined,
        {equals: false}
    );

    const [layout, setLayout] = createStore<Layout>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        scale: 1,
    });

    const value = {
        store: props.store,
        layout,
        setLayout,
        prepare,
        rePrepare,
        init,
        reInit,
        render,
        reRender,
    };

    return (
        <ViewerContext.Provider value={value}>
            {props.children}
        </ViewerContext.Provider>
    );
}