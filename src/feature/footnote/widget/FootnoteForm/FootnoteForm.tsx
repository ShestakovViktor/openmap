import styles from "./FootnoteForm.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {JSX, Accessor} from "solid-js";
import {NamespaceProvider} from "@feature/app/context";
import {TextField} from "@feature/entity/widget";
import {FigureSelect} from "@feature/figure/widget";
import {Tabs, Tab, Form} from "@shared/widget";
import {Footnote} from "@feature/footnote/type";

i18next.addResourceBundle("en", "footnote", {FootnoteForm: en}, true, true);

type Props = {
    entity: Accessor<Footnote>;
};

export function FootnoteForm(props: Props): JSX.Element {

    function handleSubmit(event: SubmitEvent): void {
        event.preventDefault();
    }

    return (
        <NamespaceProvider namespace={"FootnoteForm"}>
            <Form class={styles.FootnoteForm} onSubmit={handleSubmit}>
                <Tabs>
                    <Tab title={i18next.t(
                        "footnote:FootnoteForm.textTabTitle",
                        {postProcess: ["capitalize"]}
                    )}>
                        <TextField entity={props.entity}/>
                    </Tab>
                    <Tab title={ i18next.t(
                        "footnote:FootnoteForm.figureTabTitle",
                        {postProcess: ["capitalize"]}
                    )}>
                        <FigureSelect entity={props.entity}/>
                    </Tab>
                </Tabs>
            </Form>
        </NamespaceProvider>
    );
}