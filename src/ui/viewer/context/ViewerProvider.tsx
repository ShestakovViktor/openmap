import {JSX} from "solid-js";
import {ViewerContext} from "@ui/viewer/context";
import {createStore} from "solid-js/store";
import {Layout} from "@type";

type Props = {
    children: JSX.Element | JSX.Element[];
};

export function ViewerProvider(props: Props): JSX.Element {
    const [layout, setLayout] = createStore<Layout>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        scale: 1,
    });

    const value = {
        layout,
        setLayout,
    };

    return (
        <ViewerContext.Provider value={value}>
            {props.children}
        </ViewerContext.Provider>
    );
}