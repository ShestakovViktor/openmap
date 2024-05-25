import {Id} from "@type";

export class EntityFocusMode {
    entityId: Id | null = null;

    element: HTMLElement | null = null;

    constructor(target: Id | HTMLElement) {
        this.element = typeof target == "number"
            ? document.querySelector<HTMLElement>(
                `[data-entity-id="${target}"]`
            )
            : this.getEntity(target);

        if (!this.element) return;

        this.entityId = Number(this.element.getAttribute("data-entity-id"));
    }

    focus(): void {
        if (this.element) this.element.classList.add("Selected");
    }

    unfocus(): void {
        if (!this.element) return;
        this.element.classList.remove("Selected");
    }

    getEntity(element: HTMLElement): HTMLElement | null {
        const parent = element.parentElement;
        return Number(element.getAttribute("data-entity-id"))
            ? element
            : parent
                ? this.getEntity(parent)
                : null;
    }
}