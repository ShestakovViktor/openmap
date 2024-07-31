import styles from "./ProjectForm.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {NameField} from "@ui/asset/widget";
import {MapField} from "../MapField";
import {Form} from "@ui/widget";
import {useCoreContext, useSignalContext} from "@ui/app/context";

i18next.addResourceBundle("en", "project", {ProjectForm: en}, true, true);

type Props = {
    onComplete: () => void;
    onCancel: () => void;
};

export function ProjectForm(props: Props): JSX.Element {
    const {signal} = useSignalContext();
    const {core} = useCoreContext();

    function projectCreate(event: SubmitEvent): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        form.reset();

        const name = String(formData.get("name")) || "New project";
        const map = formData.get("map") as File;

        core.initProject({name, map})
            .then(() => signal.store.setInit())
            .then(() => signal.entity.setUpdateById())
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