import en from "./string/en.json";
import styles from "./FootnoteFigure.module.scss";

import {createMemo, JSX} from "solid-js";
import i18next from "i18next";
import {useStoreContext} from "@feature/store/context";
import {Figure as Fig} from "@feature/figure/type";
import {useViewerContext} from "@feature/viewer/context";
import {assetToSrc} from "@feature/app/utiliy";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    entityId: number;
    children: JSX.Element;
};

export function FootnoteFigure(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const viewerCtx = useViewerContext();

    const figureSrc = createMemo((): string | undefined => {
        const figureId = props.entityId;

        if (!figureId) return undefined;

        const figure = storeCtx.store.asset.getById<Fig>(figureId);

        if (!figure) return undefined;

        const src = figure.path
            ? viewerCtx.path + figure.path
            : assetToSrc(figure);

        return src;
    });

    return (
        <img src={figureSrc()}/>
    );
}