import {IOMode} from "@ui/editor/utility";
import {EditorContexType, useEditorContext} from "@ui/editor/context";

export class SelectIOMode implements IOMode {
    private editorCtx: EditorContexType;

    constructor() {
        this.editorCtx = useEditorContext();
    }

    getEntity(element: HTMLElement): HTMLElement | null {
        const parent = element.parentElement;
        return Number(element.getAttribute("data-id"))
            ? element
            : parent
                ? this.getEntity(parent)
                : null;
    }

    onMouseClick({target, shiftKey}: MouseEvent): void {
        const selected = this.getEntity(target as HTMLElement);
        if (selected) {

            const type = String(selected.getAttribute("data-type"));
            const id = Number(selected.getAttribute("data-id"));

            if (id && type) {
                this.editorCtx.setSelected((prev) => {
                    if (shiftKey) {
                        return !prev.includes(id)
                            ? [...prev, id]
                            : prev;
                    }
                    else {
                        return [id];
                    }
                });
                this.editorCtx.formMode?.show(type, id);
            }
        }
        else {
            // this.selected.forEach(el => el.classList.remove("Selected"));
            // this.selected = [];
        }
    }
}