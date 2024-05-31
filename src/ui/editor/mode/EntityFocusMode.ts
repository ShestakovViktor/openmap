import {Id} from "@type";

export class EntityFocusMode {
    element: HTMLElement;

    entityId: Id;

    constructor(target: Id | HTMLElement) {
        if (typeof target == "number") {
            const element = document.querySelector<HTMLElement>(
                `[data-entity-id="${target}"]`
            );
            if (!element) throw new Error();
            this.element = element;
        }
        else {
            this.element = target;
        }

        const entityId = this.element.getAttribute("data-entity-id");
        if (!entityId) throw new Error();

        this.entityId = Number(entityId);
    }

    focus(): void {
        this.element.classList.add("Selected");
    }

    unfocus(): void {
        this.element.classList.remove("Selected");
    }
}