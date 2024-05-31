export function getEntity(element: HTMLElement): HTMLElement | null {
    const parent = element.parentElement;
    return Number(element.getAttribute("data-entity-id"))
        ? element
        : parent
            ? getEntity(parent)
            : null;
}