export async function readFile(file: File): Promise<{
    media: string;
    encoding: string;
    data: string;
}>{
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            const {result} = reader;
            if (typeof result != "string") throw new Error("");

            const dataUrl = result.split(/[;:,]/);
            resolve({
                media: dataUrl[1],
                encoding: dataUrl[2],
                data: dataUrl[3],
            });
        });

        reader.addEventListener("error", reject);

        reader.readAsDataURL(file);
    });
}