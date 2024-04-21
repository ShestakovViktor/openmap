import styles from "./MarkerForm.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Column, Row, Tabs, Tab} from "@ui/widget";
import {EntityForm} from "@ui/entity/widget";
import {AssetInput} from "@ui/asset/widget";
import {JSX, Signal, createSignal} from "solid-js";
import {Id, Marker} from "@type";
import {useEditorContext} from "@ui/editor/context";

i18next.addResourceBundle("en", "marker", {MarkerForm: en}, true, true);

type Props = {signal?: Signal<number | undefined>};

export function MarkerForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [getId] = props.signal ?? createSignal<Id | undefined>();

    const entity = (): Marker | undefined => {
        const entityId = getId();
        if (!entityId) return undefined;
        return editorCtx.store.entity.getById<Marker>(entityId);
    };

    return (
        <EntityForm class={styles.MarkerForm}>
            <Tabs>
                <Tab name={
                    i18next.t(
                        "marker:MarkerForm.system",
                        {postProcess: ["capitalize"]}
                    )
                }>
                    <Row>
                        <label for="id">
                            {i18next.t(
                                "marker:MarkerForm.id",
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
                                "marker:MarkerForm.typeId",
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
                        "marker:MarkerForm.asset",
                        {postProcess: ["capitalize"]}
                    )
                }>
                    <AssetInput/>
                </Tab>
                <Tab name={
                    i18next.t(
                        "marker:MarkerForm.position",
                        {postProcess: ["capitalize"]}
                    )
                }>
                    <Row>
                        <label for="x">
                            {i18next.t(
                                "marker:MarkerForm.x",
                                {postProcess: ["capitalize"]}
                            )}
                        </label>
                        <input type="number" name="x" value={entity()?.x ?? ""}/>
                    </Row>
                    <Row>
                        <label for="y">
                            {i18next.t(
                                "marker:MarkerForm.y",
                                {postProcess: ["capitalize"]}
                            )}
                        </label>
                        <input type="number" name="y" value={entity()?.y ?? ""}/>
                    </Row>
                </Tab>
                <Tab
                    name={
                        i18next.t(
                            "marker:MarkerForm.text",
                            {postProcess: ["capitalize"]}
                        )
                    }
                    class={styles.DataTab}
                >
                    <Column>
                        <label for="text">
                            {i18next.t(
                                "marker:MarkerForm.text",
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