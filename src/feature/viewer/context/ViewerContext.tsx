import {createContext, useContext} from "solid-js";
import {SetStoreFunction, Store} from "solid-js/store";
import {ViewerState} from "@feature/viewer/type";
import {Viewport} from "@feature/viewer/utility";

export type ViewerContextType = {
    state: Store<ViewerState>;
    setState: SetStoreFunction<ViewerState>;

    viewport?: Viewport;

    path: string;
};

export const ViewerContext = createContext<ViewerContextType | undefined>();

export function useViewerContext(): ViewerContextType {
    const context = useContext(ViewerContext);
    if (!context) {
        throw new Error("There is no viewer context");
    }
    return context;
}
