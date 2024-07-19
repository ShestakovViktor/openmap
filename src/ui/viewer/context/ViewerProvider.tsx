import {JSX} from "solid-js";
import {ViewerContext, ViewerContextType} from "@ui/viewer/context";

type Props = {
    children: JSX.Element | JSX.Element[];
};

export function ViewerProvider(props: Props): JSX.Element {
    const value = {} as ViewerContextType;

    return (
        <ViewerContext.Provider value={value}>
            {props.children}
        </ViewerContext.Provider>
    );
}