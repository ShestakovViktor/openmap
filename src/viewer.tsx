import "@src/i18n";
import "@res/style/colors.scss";
import "@res/style/global.scss";

import {render} from "solid-js/web";
import {ViewerProvider} from "@ui/viewer/context";
import {Viewer} from "@src/ui/viewer/widget";
import {Store} from "@core";
import {StoreProvider} from "@ui/app/context";

export default async function show(
    path: string,
    container: HTMLElement
): Promise<void> {
    const response = await fetch(path + "/data.json");
    const data = await response.json();

    render(() => {
        return (
            <StoreProvider store={new Store(data)}>
                <ViewerProvider>
                    <Viewer/>
                </ViewerProvider>
            </StoreProvider>
        );
    }, container);
}