import styles from "./EntityToolbar.module.scss";
import MoveIconSvg from "@public/icon/move.svg";

import {Button, Toolbar} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Signal} from "solid-js";
import {Id} from "@type";

i18next.addResourceBundle("en", "entity", {EntityToolbar: en}, true, true);

type Props = {entityId?: Signal<Id | null>};

export function EntityToolbar(props: Props): JSX.Element {
    return (
        <Toolbar>
            <Button icon={MoveIconSvg}/>
        </Toolbar>
    );
}