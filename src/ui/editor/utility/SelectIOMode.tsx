import {IOMode} from "@ui/editor/utility";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";

export class SelectIOMode implements IOMode {
    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    private selected: HTMLElement[] = [];

    constructor() {
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    getEntity(element: HTMLElement): HTMLElement | undefined {
        const parent = element.parentElement;
        return Number(element.getAttribute("data-id"))
            ? element
            : parent
                ? this.getEntity(parent)
                : undefined;
    }

    onMouseClick({target, shiftKey}: MouseEvent): void {
        const selected = this.getEntity(target as HTMLElement);
        if (selected) {
            this.selected.forEach(el => el.classList.remove("Selected"));
            this.selected = [];
            selected.classList.add("Selected");
            this.selected.push(selected);

            const id = selected.getAttribute("data-id");
            const type = selected.getAttribute("data-type");

            if (id && type) {
                this.editorCtx.formMode?.show(type, Number(id));
            }
        }
        else {
            this.selected.forEach(el => el.classList.remove("Selected"));
            this.selected = [];
        }
    }
}