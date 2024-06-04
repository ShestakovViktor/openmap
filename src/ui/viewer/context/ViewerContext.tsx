import {createContext, useContext} from "solid-js";
import {SetStoreFunction} from "solid-js/store";
import {Layout} from "@type";

export type ViewerContextType = {
    layout: Layout;
    setLayout: SetStoreFunction<Layout>;
};

export const ViewerContext = createContext<ViewerContextType | undefined>();

export function useViewerContext(): ViewerContextType {
    const context = useContext(ViewerContext);
    if (!context) {
        throw new Error("There is no viewer context");
    }
    return context;
}
