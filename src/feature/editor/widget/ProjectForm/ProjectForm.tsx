import styles from "./ProjectForm.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {Field, Form} from "@shared/widget";
import {useStartupContext} from "@feature/editor/context";
import {initProject} from "@feature/editor/service";

i18next.addResourceBundle("en", "editor", {ProjectForm: en}, true, true);

export function ProjectForm(): JSX.Element {

    const startupCtx = useStartupContext();

    function projectCreate(event: SubmitEvent): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        form.reset();

        const name = String(formData.get("name")) || "New project";
        const background = formData.get("background") as File;

        initProject({name, background})
            .then((data) => {
                const [, setData] = startupCtx.dataSignal;
                setData(data);
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    return (
        <Form class={styles.ResourceForm} onSubmit={projectCreate}>
            <Field>
                <label for="name">
                    {i18next.t(
                        "editor:ProjectForm.nameField",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input
                    type="text"
                    name="name"
                    value="New project"
                />
            </Field>
            <Field>
                <label for="background">
                    {i18next.t(
                        "editor:ProjectForm.backgroundField",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input
                    type="file"
                    name="background"
                    accept="image/*"
                />
            </Field>

            <input
                type="submit"
                value={i18next.t(
                    "editor:ProjectForm.create",
                    {postProcess: ["capitalize"]}
                )}
            />
            <input
                type="button"
                value={i18next.t(
                    "editor:ProjectForm.cancel",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {console.log("qwe");}}
            />
        </Form>
    );
}