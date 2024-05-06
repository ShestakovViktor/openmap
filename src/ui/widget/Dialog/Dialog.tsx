import styles from "./Dialog.module.scss";
import SaltireIconSvg from "@public/icon/saltire.svg";
import {Button} from "@ui/widget";

import {JSX, Show} from "solid-js";

type Props = {
    children?: JSX.Element | JSX.Element[];
    id?: string;
    class?: string;
    title?: string;
    onClose?: () => void;
};

export function Dialog(props: Props): JSX.Element {
    return (
        <div
            class={styles.Dialog}
            classList={{
                [props.class ?? ""]: "class" in props,
            }}
        >
            <header class={styles.Header}>
                <div class={styles.Title}>
                    {props.title}
                </div>
                <div class={styles.Control}>
                    <Button
                        class={styles.CloseButton}
                        icon={SaltireIconSvg}
                        onClick={props.onClose}
                    />
                </div>
            </header>
            <section class={styles.Section}>
                {props.children}
            </section>
        </div>
    );
}