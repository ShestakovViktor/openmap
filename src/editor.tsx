import "@src/i18n";
import "@res/style/colors.scss";
import "@res/style/global.scss";

import {render} from "solid-js/web";
import {StartupDialog, Editor, ModalLayer} from "@feature/editor/widget";
import {createSignal, Match, Switch} from "solid-js";
import {Data} from "@type";
import {StoreProvider} from "@feature/store/context";
import {NamespaceProvider} from "@feature/app/context";
import {EditorProvider, StartupProvider} from "@feature/editor/context";
import {ViewerProvider} from "@feature/viewer/context";

const container = document.querySelector("#editor");
if (!container) throw new Error("There is no container element");

const dataSignal = createSignal<Data>();
const [data] = dataSignal;

render(() =>
    <Switch>
        <Match when={!data()}>
            <StartupProvider dataSignal={dataSignal}>
                <ModalLayer>
                    <StartupDialog/>
                </ModalLayer>
            </StartupProvider>
        </Match>
        <Match when={data()}>
            <StoreProvider data={data()!}>
                <NamespaceProvider namespace={"Editor"}>
                    <ViewerProvider>
                        <EditorProvider>
                            <Editor/>
                        </EditorProvider>
                    </ViewerProvider>
                </NamespaceProvider>
            </StoreProvider>
        </Match>
    </Switch>
, container);
