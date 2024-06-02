import styles from "./MotionSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {JSX, Resource} from "solid-js";
import {Section} from "@ui/widget";
import {MotionSelect} from "@ui/motion/widget";
import {Id} from "@type";

i18next.addResourceBundle("en", "entity", {MotionSection: en}, true, true);

type Props = {
    entity: Resource<{motionId: Id | null} | undefined>;
};

export function MotionSection(props: Props): JSX.Element {
    return (
        <Section
            class={styles.MotionSection}
            title={
                i18next.t(
                    "entity:MotionSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <MotionSelect entity={props.entity}/>
        </Section>
    );
}