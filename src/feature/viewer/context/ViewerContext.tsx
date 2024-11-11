import {createContext, useContext} from "solid-js";
import {SetStoreFunction, Store} from "solid-js/store";
import {ViewerState} from "@feature/viewer/type";

export type ViewerContextType = {
    state: Store<ViewerState>;
    setState: SetStoreFunction<ViewerState>;

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
