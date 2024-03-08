import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Core} from "@core";
import {Project} from "@project";
import {render} from "solid-js/web";
import {Viewer} from "@src/ui/viewer/widget";
import {ViewerProvider} from "@ui/viewer/context";
import {Editor} from "./ui/editor/widget";
import {EditorProvider} from "@ui/editor/context";

const app = document.querySelector("#app");
if (!app) throw new Error("There is no element with \"app\" id");

const project = new Project();
const core = new Core();

render(() => {
    return (
        <>
            <ViewerProvider value={{project}}>
                <Viewer/>
            </ViewerProvider>
            <EditorProvider value={{project, core}}>
                <Editor/>
            </EditorProvider>
        </>
    );
}, app);

fetch("/project.mp")
    .then((response) => response.blob())
    .then(file => project.import(file))
    .then(() => project.render())
    .catch(err => {throw new Error("Project init error: " + err);});
