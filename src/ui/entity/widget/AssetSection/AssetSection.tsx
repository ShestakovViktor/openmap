import styles from "./AssetSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {AssetInput} from "@ui/asset/widget";
import {Id} from "@type";

i18next.addResourceBundle("en", "entity", {AssetSection: en}, true, true);

type Props = {
    id?: string;
    entity: Resource<{assetId: Id | null} | null>;
};

export function AssetSection(props: Props): JSX.Element {
    return (
        <Section
            id={props.id}
            class={styles.AssetSection}
            title={
                i18next.t(
                    "entity:AssetSection.asset",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <AssetInput entity={props.entity}/>
        </Section>
    );
}