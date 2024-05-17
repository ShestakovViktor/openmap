import "@src/i18n";
import "@style/colors.scss";
import "@style/global.scss";

import {render} from "solid-js/web";
import {ViewerProvider} from "@ui/viewer/context";
import {Viewer} from "@src/ui/viewer/widget";
import {Store} from "@core";

export default async function show(
    path: string,
    container: HTMLElement
): Promise<void> {
    const response = await fetch(path + "/data.json");
    const data = await response.json();

    render(() => {
        return (
            <ViewerProvider store={new Store(data)}>
                <Viewer/>
            </ViewerProvider>
        );
    }, container);
}