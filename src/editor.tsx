import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {Core} from "@core";
import {Store} from "@core";
import {render} from "solid-js/web";
import {Viewer} from "@src/ui/viewer/widget";
import {ViewerProvider} from "@ui/viewer/context";
import {Editor} from "./ui/editor/widget";
import {EditorProvider} from "@ui/editor/context";
import {NamespaceProvider} from "@ui/app/context";

const container = document.querySelector("#openmap");
if (!container) throw new Error("There is no container element");

const store = new Store();
const core = new Core(store);

render(() => {
    return (
        <ViewerProvider store={store}>
            <EditorProvider value={{store, core}}>
                <NamespaceProvider namespace={"Editor"}>
                    <Editor>
                        <Viewer/>
                    </Editor>
                </NamespaceProvider>
            </EditorProvider>
        </ViewerProvider>
    );
}, container);