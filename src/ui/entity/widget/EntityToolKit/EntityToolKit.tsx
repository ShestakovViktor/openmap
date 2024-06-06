import styles from "./EntityToolKit.module.scss";
import MoveIconSvg from "@res/svg/move.svg";

import {Button, Toolbar} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Signal} from "solid-js";
import {Id} from "@type";

i18next.addResourceBundle("en", "entity", {EntityToolKit: en}, true, true);

type Props = {entityId?: Signal<Id | null>};

export function EntityToolKit(props: Props): JSX.Element {
    return (
        <Toolbar>
            <Button class={styles.Button} icon={MoveIconSvg}/>
        </Toolbar>
    );
}