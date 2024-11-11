import "@src/i18n";
import "@res/style/colors.scss";
import "@res/style/global.scss";

import {render} from "solid-js/web";
import {Viewer} from "@feature/viewer/widget";
import {ViewerProvider} from "@feature/viewer/context";
import {StoreProvider} from "@feature/store/context";

(async(): Promise<void> => {
    const container = document.querySelector("#viewer[data-src]");

    if (!container) return;

    const path = container.getAttribute("data-src");

    if (!path) throw new Error();

    const response = await fetch(path + "/data.json");

    console.log(path + "/data.json");

    const data = await response.json();

    render(() => {
        return (
            <StoreProvider data={data}>
                <ViewerProvider path={path}>
                    <Viewer/>
                </ViewerProvider>
            </StoreProvider>
        );
    }, container);
})();