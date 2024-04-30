import styles from "./Accordion.module.scss";
import {For, JSX, children, createSignal} from "solid-js";
import {SectionProps} from "./Section";

type Props = {
    children: JSX.Element | JSX.Element[];
    class?: string;
    selected?: number;
};

export function Accordion(props: Props): JSX.Element {
    const childs = children(() => props.children);
    const sections = childs.toArray() as unknown as SectionProps[];

    const [getExpanded, setExpanded] = createSignal<{[key: number]: boolean}>(
        sections.reduce<{[k: number]: boolean}>((result, section, index) => {
            result[index] = Boolean(section.expand);
            return result;
        }, {}),
        {equals: false}
    );

    return (
        <div class={styles.Accordion}>
            <For each={sections}>
                {(child, index) =>
                    <div
                        class={styles.Section}
                        classList={{
                            [styles.Selected]: getExpanded()[index()],
                        }}
                    >
                        <div
                            class={styles.Header}
                            onClick={() => {
                                const expanded = getExpanded();
                                expanded[index()] = !expanded[index()];
                                setExpanded(expanded);
                            }}
                        >
                            <div class={styles.Title}>
                                {child.name}
                            </div>
                            <div class={styles.Expand}>
                                {getExpanded()[index()] ? "-" : "+"}
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
                }
            </For>
        </div>
    );
}