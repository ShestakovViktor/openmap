export function getIdAttribute(element: HTMLElement): number | undefined {
    const id = Number(element.getAttribute("data-id"));
    const parent = element.parentElement;
    return id ? id : parent ? getIdAttribute(element.parentElement) : undefined;
}