import "@src/i18n";
import "@res/style/colors.scss";
import "@res/style/global.scss";

import {Core} from "@core";
import {Store} from "@core";
import {render} from "solid-js/web";
import {Viewer} from "@src/ui/viewer/widget";
import {ViewerProvider} from "@ui/viewer/context";
import {Editor} from "./ui/editor/widget";
import {EditorProvider} from "@ui/editor/context";
import {CoreProvider, NamespaceProvider, SignalProvider, StoreProvider} from "@ui/app/context";

const container = document.querySelector("#editor");
if (!container) throw new Error("There is no container element");

const store = new Store();
const core = new Core(store);

render(() => {
    return (
        <SignalProvider>
            <StoreProvider store={store}>
                <CoreProvider core={core}>
                    <ViewerProvider>
                        <EditorProvider>
                            <NamespaceProvider namespace={"Editor"}>
                                <Editor>
                                    <Viewer/>
                                </Editor>
                            </NamespaceProvider>
                        </EditorProvider>
                    </ViewerProvider>
                </CoreProvider>
            </StoreProvider>
        </SignalProvider>
    );
}, container);