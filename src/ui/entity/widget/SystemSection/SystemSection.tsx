import styles from "./SystemSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";
import TrasIconSvg from "@res/svg/trash.svg";

import {Button, Section, Toolbar} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {IdField, EntityTypeIdField} from "@ui/entity/widget";

i18next.addResourceBundle("en", "entity", {SystemSection: en}, true, true);

type Props = {
    entity: Resource<{id: number; entityTypeId: number} | undefined>;
};

export function SystemSection(props: Props): JSX.Element {
    return (
        <Section
            class={styles.SystemSection}
            title={
                i18next.t(
                    "entity:SystemSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <Toolbar>
                <Button
                    icon={TrasIconSvg}
                    name={"delete"}
                />
            </Toolbar>
            <IdField entity={props.entity}/>
            <EntityTypeIdField entity={props.entity}/>
        </Section>
    );
}