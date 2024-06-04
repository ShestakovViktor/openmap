import en from "./string/en.json";
import i18next from "i18next";
import FootnoteIconSvg from "@public/icon/footnote.svg";

import {Button, Modal, Section, Toolbar} from "@ui/widget";
import {JSX, Resource, createResource} from "solid-js";
import {Id} from "@type";
import {FootnoteDialog} from "@ui/footnote/widget";

i18next.addResourceBundle("en", "entity", {FootnoteSection: en}, true, true);

type Entity = {footnoteId: Id | null};

type Props = {
    entity: Resource< Entity | undefined>;
};

export function FootnoteSection(props: Props): JSX.Element {
    const [footnoteId] = createResource<Id | null, Entity | undefined>(
        props.entity,
        (entity) => entity ? entity.footnoteId : null,
        {initialValue: null}
    );

    const footnoteDialog = new Modal();
    footnoteDialog.render(
        <FootnoteDialog
            entityId={footnoteId}
            onClose={() => footnoteDialog.hide()}
        />
    );

    return (
        <Section
            title={
                i18next.t(
                    "entity:FootnoteSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
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