export class Media {
    private media = [
        {type: "image/svg+xml", extension: "svg"},
        {type: "image/png", extension: "png"},
        {type: "image/jpg", extension: "jpg"},
        {type: "image/jpeg", extension: "jpg"},
        {type: "text/javascript", extension: "js"},
        {type: "text/css", extension: "css"},
        {type: "application/json", extension: "json"},
    ];

    typeToExtension(type: string): string | undefined {
        return this.media
            .find((content) => content.type == type)?.extension;
    }

    extensionToType(extension: string): string | undefined {
        return this.media
            .find((content) => content.extension == extension)?.type;
    }
}