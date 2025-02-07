export function uploadFile(
    props: {
        type: string;
        accept: string;
    } = {type: "", accept: ""}
): Promise<File> {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = props.type;
        input.accept = props.accept;
        input.click();
        input.addEventListener("change", (): void => {
            if (!input.files?.length) return;
            const file = input.files[0];

            resolve(file);
        });
    });
}