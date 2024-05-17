import {Accessor, Setter, createContext, useContext} from "solid-js";
import {Store} from "@core";
import {SetStoreFunction} from "solid-js/store";
import {Id, Layout} from "@type";

export type ViewerContextType = {
    store: Store;

    prepare: Accessor<undefined>;
    rePrepare: Setter<undefined>;

    init: Accessor<undefined>;
    reInit: Setter<undefined>;

    render: Accessor<Id | undefined>;
    reRender: Setter<Id | undefined>;

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
