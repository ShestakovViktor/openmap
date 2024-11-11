import {JSX} from "solid-js";
import {NamespaceContext, useNamespaceContext} from "@feature/app/context";

type Props = {
    namespace: string;
    children: JSX.Element | JSX.Element[];
};

export function NamespaceProvider(props: Props): JSX.Element {
    const namespaceCtx = useNamespaceContext();
    const delimeter = ".";

    const value = {
        namespace: namespaceCtx.namespace + delimeter + props.namespace,
    };

    return (
        <NamespaceContext.Provider value={value}>
            {props.children}
        </NamespaceContext.Provider>
    );
}