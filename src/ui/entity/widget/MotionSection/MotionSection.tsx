import styles from "./MotionSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {JSX, Resource} from "solid-js";
import {Section} from "@ui/widget";
import {MotionInput} from "@ui/motion/widget";
import {Id} from "@type";

i18next.addResourceBundle("en", "entity", {MotionSection: en}, true, true);

type Props = {
    id?: string;
    entity: Resource<{motionId: Id | null} | null>;
};

export function MotionSection(props: Props): JSX.Element {
    return (
        <Section
            id={props.id}
            class={styles.MotionSection}
            title={
                i18next.t(
                    "entity:MotionSection.motion",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <MotionInput entity={props.entity}/>
        </Section>
    );
}