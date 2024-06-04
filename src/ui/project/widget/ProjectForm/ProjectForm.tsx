import styles from "./ProjectForm.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {NameField} from "@ui/asset/widget";
import {MapField} from "../MapField";
import {Form} from "@ui/widget";
import {useCoreContext, useStoreContext} from "@ui/app/context";

i18next.addResourceBundle("en", "project", {ProjectForm: en}, true, true);

type Props = {
    onComplete: () => void;
    onCancel: () => void;
};

export function ProjectForm(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const coreCtx = useCoreContext();

    function projectCreate(event: SubmitEvent): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        form.reset();

        const name = String(formData.get("name")) || "New project";
        const map = formData.get("map") as File;

        coreCtx.core.initProject({name, map})
            .then(() => storeCtx.initialize())
            .then(() => storeCtx.update.entity.set())
            .catch(error => {
                throw new Error(error);
            });

        props.onComplete();
    }

    return (
        <Form class={styles.ResourceForm} onSubmit={projectCreate}>
            <NameField/>
            <MapField/>
            <input
                type="submit"
                value={i18next.t(
                    "project:ProjectForm.create",
                    {postProcess: ["capitalize"]}
                )}
            />
            <input
                type="button"
                value={i18next.t(
                    "project:ProjectForm.cancel",
                    {postProcess: ["capitalize"]}
                )}
                onClick={props.onCancel}
            />
        </Form>
    );
}