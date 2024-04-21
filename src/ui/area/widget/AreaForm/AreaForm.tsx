import styles from "./AreaForm.module.scss";
import {Row, Column, Tabs, Tab} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Signal, createSignal} from "solid-js";
import {useEditorContext} from "@ui/editor/context";
import {Area, Id} from "@type";
import {EntityForm} from "@ui/entity/widget";

i18next.addResourceBundle("en", "area", {AreaForm: en}, true, true);

type Props = {
    signal?: Signal<number | undefined>;
    onSubmit?: (event: SubmitEvent) => void;
};

export function AreaForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [getId] = props.signal ?? createSignal<Id | undefined>();

    const entity = (): Area | undefined => {
        const areaId = getId();
        return areaId
            ? editorCtx.store.entity.getById<Area>(areaId)
            : undefined;
    };

    return (
        <EntityForm class={styles.AreaForm}>
            <Tabs>
                <Tab
                    name={
                        i18next.t(
                            "area:AreaForm.system",
                            {postProcess: ["capitalize"]}
                        )
                    }
                >
                    <Row>
                        <label for="id">
                            {i18next.t(
                                "area:AreaForm.id",
                                {postProcess: ["capitalize"]}
                            )}
                        </label>
                        <input
                            name="id"
                            type="number"
                            value={entity()?.id ?? ""}
                            readonly
                        />
                    </Row>
                    <Row>
                        <label for="typeId">
                            {i18next.t(
                                "area:AreaForm.typeId",
                                {postProcess: ["capitalize"]}
                            )}
                        </label>
                        <input
                            name="typeId"
                            type="number"
                            value={entity()?.typeId ?? ""}
                            readonly
                        />
                    </Row>
                </Tab>
                <Tab name={
                    i18next.t(
                        "area:AreaForm.position",
                        {postProcess: ["capitalize"]}
                    )
                }>
                    <Row>
                        <label for="x">
                            {i18next.t(
                                "area:AreaForm.x",
                                {postProcess: ["capitalize"]}
                            )}
                        </label>
                        <input
                            type="number"
                            name="x"
                            value={entity()?.x ?? ""}
                        />
                    </Row>
                    <Row>
                        <label for="y">
                            {i18next.t(
                                "area:AreaForm.y",
                                {postProcess: ["capitalize"]}
                            )}
                        </label>
                        <input
                            type="number"
                            name="y"
                            value={entity()?.y ?? ""}
                        />
                    </Row>
                </Tab>
                <Tab
                    name={
                        i18next.t(
                            "area:AreaForm.text",
                            {postProcess: ["capitalize"]}
                        )
                    }
                >
                    <Column>
                        <label for="text">
                            {i18next.t(
                                "area:AreaForm.text",
                                {postProcess: ["capitalize"]}
                            )}
                        </label>
                        <textarea
                            id="text"
                            name="text"
                            value={entity()?.text ?? ""}
                        />
                    </Column>
                    {/* <Row>
                        <input
                            id="graphic"
                            type="file"
                            name="graphic"
                            accept="image/*"
                            multiple
                        />
                    </Row> */}
                </Tab>
            </Tabs>
        </EntityForm>
    );
}