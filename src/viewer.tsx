import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {render} from "solid-js/web";
import {ViewerProvider} from "@ui/viewer/context";
import {Viewer} from "@src/ui/viewer/widget";
import {Store} from "@core";

const container = document.querySelector("#openmap");
if (!container) throw new Error("There is no container element");

const data = JSON.parse(OPEN_MAP_DATA);
const store = new Store(data);

render(() => {
    return (
        <ViewerProvider store={store}>
            <Viewer/>
        </ViewerProvider>
    );
}, container);