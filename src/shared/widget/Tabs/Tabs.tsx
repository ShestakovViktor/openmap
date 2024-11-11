import styles from "./Tabs.module.scss";
import {For, JSX, children, createSignal} from "solid-js";
import {TabProps} from "./Tab";

type Props = {
    children: JSX.Element | JSX.Element[];
    class?: string;
    selected?: number;
};

export function Tabs(props: Props): JSX.Element {
    const childs = children(() => props.children);
    const tabs = childs.toArray() as unknown as TabProps[];

    const [getSelected, setSelected] = createSignal(0);

    return (
        <div class={styles.Tabs}>
            <div class={styles.TabBar}>
                <For each={tabs}>
                    {(child, index) =>
                        <div
                            class={styles.TabButton}
                            classList={{
                                [styles.Selected]: getSelected() == index(),
                            }}
                            onClick={() => setSelected(index())}
                        >
                            {child.title}
                        </div>
                    }
                </For>
            </div>
            <div class={styles.TabArea}>
                <For each={tabs}>
                    {(child, index) =>
                        <div
                            class={styles.TabView}
                            classList={{
                                [styles.Selected]: getSelected() == index(),
                                [child.class!]: Boolean(child.class),
                            }}
                        >
                            {child.children}
                        </div>
                    }
                </For>
            </div>
        </div>
    );
}