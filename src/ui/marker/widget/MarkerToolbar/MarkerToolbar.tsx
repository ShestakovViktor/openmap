import FootnoteIconSvg from "@public/icon/footnote.svg";

import {Button, Modal, Toolbar} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, createSignal} from "solid-js";
import {FootnoteDialog} from "@ui/footnote/widget";
import {Id, Marker} from "@type";
import {useEditorContext} from "@ui/editor/context";

i18next.addResourceBundle("en", "marker", {MarkerToolbar: en}, true, true);

export function MarkerToolbar(): JSX.Element {
    const editorCtx = useEditorContext();

    const footnoteId = createSignal<Id | null>(null);

    const footnoteDialog = new Modal();
    footnoteDialog.render(
        <FootnoteDialog
            entityId={footnoteId[0]}
            onClose={() => footnoteDialog.hide()}
        />
    );

    return (
        <Toolbar>
            <Button
                icon={FootnoteIconSvg}
                onClick={() => {

                    const focusModes = editorCtx.entityFocus.get();
                    if (focusModes.length > 1) return;

                    const id = focusModes[0].entityId;

                    const marker = editorCtx.store.entity.getById<Marker>(id);
                    if (!marker) throw new Error();

                    footnoteId[1](marker.footnoteId);

                    footnoteDialog.show();
                }}
            />
        </Toolbar>
    );
}