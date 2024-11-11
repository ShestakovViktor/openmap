import {JSX} from "solid-js";
import {createStore} from "solid-js/store";
import {ViewerContext} from "@feature/viewer/context";
import {ViewerState} from "@feature/viewer/type";
import {VIEWER_MODE} from "@feature/viewer/enum";

type Props = {
    children: JSX.Element | JSX.Element[];
    path?: string;
};

export function ViewerProvider(props: Props): JSX.Element {
    const [state, setState] = createStore<ViewerState>({
        mode: VIEWER_MODE.PRODUCTION,
        x: 0,
        y: 0,
        scale: 1,
    });

    const value = {state, setState, path: props.path || ""};

    return (
        <ViewerContext.Provider value={value}>
            {props.children}
        </ViewerContext.Provider>
    );
}