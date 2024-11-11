//import {SelectBufferMode} from "@feature/editor/utility";
export class EntityVIP /*extends SelectBufferMode*/ {
    selected: {[key: number]: HTMLElement} = {};

    setById(id: number): void {
        const element = document.querySelector<HTMLElement>(
            `[data-entity-id="${id}"]`
        );
        if (!element) throw new Error();

        this.selected[id] = element;
    }

    setByElement(element: HTMLElement): void {
        const id = Number(element.getAttribute("data-entity-id"));
        if (!id) throw new Error();

        this.selected[id] = element;
    }

    select(): void {
        for (const id in this.selected) {
            this.selected[id].classList.add("Selected");
        }
    }

    deselect(): void {
        for (const id in this.selected) {
            this.selected[id].classList.remove("Selected");
        }
    }
}