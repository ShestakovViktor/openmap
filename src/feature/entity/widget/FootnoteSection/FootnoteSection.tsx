import en from "./string/en.json";
import i18next from "i18next";
import FootnoteIconSvg from "@res/svg/footnote.svg";

import {Button, Modal, Section, Toolbar} from "@shared/widget";
import {Accessor, JSX} from "solid-js";
import {FootnoteDialog} from "@feature/footnote/widget";
import {Entity} from "@feature/entity/type";

i18next.addResourceBundle("en", "entity", {FootnoteSection: en}, true, true);

type Props = {
    entity: Accessor<Entity & {footnoteId: number | null}>;
};

export function FootnoteSection(props: Props): JSX.Element {

    const footnoteDialog = new Modal();
    footnoteDialog.render(
        <FootnoteDialog
            entity={props.entity}
            onClose={() => footnoteDialog.hide()}
        />
    );

    return (
        <Section
            title={i18next.t(
                "entity:FootnoteSection.title",
                {postProcess: ["capitalize"]}
            )}
        >
            <Toolbar>
                <Button
                    icon={FootnoteIconSvg}
                    onClick={() => {
                        footnoteDialog.show();
                    }}
                />
            </Toolbar>
        </Section>
    );
}