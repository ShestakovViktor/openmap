import {Accessor, createContext, Setter, useContext} from "solid-js";
import {SetStoreFunction} from "solid-js/store";
import {ArchiveDriver, ImageDriver} from "@interface";
import {EditorState} from "@feature/editor/type";
import {Entity, Parent} from "@feature/entity/type";

export type EditorContexType = {
    selected: Accessor<Entity | undefined>;
    setSelected: Setter<Entity | undefined>;

    layer: Accessor<Entity & Parent | undefined>;
    setLayer: Setter<Entity & Parent | undefined>;

    state: EditorState;
    setState: SetStoreFunction<EditorState>;

    archiveDriver: ArchiveDriver;
    imageDriver: ImageDriver;
};

export const EditorContext = createContext<EditorContexType | undefined>();

export function useEditorContext(): EditorContexType {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error("There is no editor context");
    }

    return context;
}

