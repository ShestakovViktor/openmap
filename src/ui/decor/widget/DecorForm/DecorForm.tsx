import styles from "./DecorForm.module.scss";
import {Row, Tabs, Tab} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {AssetInput} from "@ui/asset/widget";
import {JSX, Signal, createSignal} from "solid-js";
import {Decor, Id} from "@type";
import {useEditorContext} from "@ui/editor/context";
import {EntityForm} from "@ui/entity/widget";
import {MotionInput} from "@ui/motion/widget";

i18next.addResourceBundle("en", "decor", {DecorForm: en}, true, true);

type Props = {
    signal?: Signal<number | undefined>;
    onSubmit?: (event: SubmitEvent) => void;
};

export function DecorForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const [getId] = props.signal ?? createSignal<Id | undefined>();

    const entity = (): Decor | undefined => {
        const markerId = getId();
        if (!markerId) return undefined;
        return editorCtx.store.entity.getById<Decor>(markerId);
    };

    return (
        <EntityForm class={styles.DecorForm}>
            <Tabs>
                <Tab name={
                    i18next.t(
                        "decor:DecorForm.system",
                        {postProcess: ["capitalize"]}
                    )
                }>
                    <Row>
                        <label for="id">
                            {i18next.t(
                                "decor:DecorForm.id",
                                {postProcess: ["capitalize"]}
                            )}
                        </label>
                        <input
                            name="id"
                            type="number"
                            value={entity()?.id}
                            readonly
                        />
                    </Row>
                    <Row>
                        <label for="typeId">
                            {i18next.t(
                                "decor:DecorForm.typeId",
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
                        "decor:DecorForm.position",
                        {postProcess: ["capitalize"]}
                    )
                }>
                    <Row>
                        <label for="x">
                            {i18next.t(
                                "decor:DecorForm.x",
                                {postProcess: ["capitalize"]}
                            )}
                        </label>
                        <input
                            name="x"
                            type="number"
                            value={entity()?.x}
                        />
                    </Row>
                    <Row>
                        <label for="y">
                            {i18next.t(
                                "decor:DecorForm.y",
                                {postProcess: ["capitalize"]}
                            )}
                        </label>
                        <input type="text" name="y" value={entity()?.y}/>
                    </Row>
                </Tab>
                <Tab name={
                    i18next.t(
                        "decor:DecorForm.asset",
                        {postProcess: ["capitalize"]}
                    )
                }>
                    <AssetInput/>
                </Tab>
                <Tab name={
                    i18next.t(
                        "decor:DecorForm.motion",
                        {postProcess: ["capitalize"]}
                    )
                }>
                    <MotionInput/>
                </Tab>
            </Tabs>
        </EntityForm>
    );
}