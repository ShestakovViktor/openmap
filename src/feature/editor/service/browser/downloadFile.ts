export function downloadFile(
    file: Blob,
    name: string
): void {
    const fileUrl = URL.createObjectURL(file);

    const tempLink = document.createElement("a");
    tempLink.download = name;
    tempLink.href = fileUrl;
    tempLink.click();
    tempLink.remove();
}
