import {createContext, useContext} from "solid-js";
import {Viewport} from "@ui/viewer/utility";

export type ViewerContextType = {
    viewport: Viewport;
};

export const ViewerContext = createContext<ViewerContextType | undefined>();

export function useViewerContext(): ViewerContextType {
    const context = useContext(ViewerContext);
    if (!context) {
        throw new Error("There is no viewer context");
    }
    return context;
}
