import styles from "./Accordion.module.scss";
import {For, JSX, children} from "solid-js";
import {SectionProps} from "./Section";
import {useNamespaceContext} from "@feature/app/context";
import {createLocalStorageSyncSignal} from "@feature/app/utiliy";

type Props = {
    children: JSX.Element | JSX.Element[];
    class?: string;
};

export function Accordion(props: Props): JSX.Element {
    const namespaceCtx = useNamespaceContext();

    const childs = children(() => props.children);
    const sections = childs.toArray() as unknown as SectionProps[];

    return (
        <div class={styles.Accordion}>
            <For each={sections}>
                {(child) => {
                    const name = namespaceCtx.namespace
                        + "."
                        + child.title
                        + "Section"
                        + "."
                        + "expand";

                    const [getExpand, setExpand]
                        = createLocalStorageSyncSignal(false, {name});

                    return (
                        <div
                            id={child.id}
                            class={styles.Section}
                            classList={{
                                [styles.Selected]: Boolean(getExpand()),
                            }}
                        >
                            <div
                                class={styles.Header}
                                onClick={() => setExpand(!Boolean(getExpand()))}
                            >
                                <div class={styles.Title}>
                                    {child.title}
                                </div>
                                <div class={styles.Expand}>
                                    {getExpand() ? "-" : "+"}
                                </div>
                            </div>
                            <div
                                class={styles.Content}
                                classList={{
                                    [child.class!]: Boolean(child.class),
                                }}
                            >
                                {child.children}
                            </div>
                        </div>
                    );
                }}
            </For>
        </div>
    );
}