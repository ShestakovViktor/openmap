import {Media} from "@core";
import {ArchiveDriver} from "@src/interface";
import {Data, Id, Source} from "@type";
import {Store} from "@core";

type Blobs = {[key: string]: Blob};

export class Converter {
    private media: Media;

    constructor(
        private store: Store,
        private archiveDriver: ArchiveDriver
    ) {
        this.media = new Media();
    }

    async exportAsFile(): Promise<Blob> {
        const blobs = this.exportData();
        return await this.archiveDriver.archive(blobs);
    }

    private exportData(): {[key: string]: Blob} {
        const projectData = this.store.getData();
        const [source, blobs] = this.splitSourcesToBase64(projectData.source);
        const data = {...projectData, source};

        const dataString = JSON.stringify(data, null, 4);
        const dataType = "application/json;charset=utf-8";
        const dataBlob = new Blob([dataString], {type: dataType});

        return {["data.json"]: dataBlob, ...blobs};
    }

    private splitSourcesToBase64(data: {[key: Id]: Source}): [
        {[key: Id]: Source},
        {[key: string]: Blob},
    ] {
        const sources: {[key: Id]: Source} = {};
        const blobs: Blobs = {};

        for (const sourceId in data) {
            const source = data[sourceId];
            const sourceBlob = new Blob([source.content], {type: "text/plain"});

            const path = `source/${sourceId}.b64`;
            sources[source.id] = {...source, content: "", path};
            blobs[path] = sourceBlob;
        }

        return [sources, blobs];
    }

    async importProject(blob: Blob): Promise<void> {
        const files = await this.archiveDriver.extract(blob);
        const data = await this.importData(files);
        this.store.setData(data);
    }

    private async importData(files: Blobs): Promise<Data> {
        const dataString = await files["data.json"].text();
        const data = JSON.parse(dataString) as Data;

        for (const sourceId in data.source) {
            const path = data.source[sourceId].path;
            data.source[sourceId].path = "";
            data.source[sourceId].content = await files[path].text();
        }

        return data;
    }

    async exportAsSite(): Promise<Blob> {
        const blobs = await this.exportStatic(this.store);
        return await this.archiveDriver.archive(blobs);
    }

    private async exportStatic(store: Store): Promise<Blobs> {
        const data = store.getData();
        const [source, blobs] = this.splitSourcesToFiles(data.source);

        return {
            ...await this.getTemplateBlob(),
            ...await this.getBundleBlob(),
            ...this.getDataBlob({...data, source}),
            ...blobs,
        };
    }

    private splitSourcesToFiles(data: {[key: Id]: Source}): [
        {[key: Id]: Source},
        {[key: Id]: Blob},
    ] {
        const {value: name} = this.store.config.getByParams({name: "name"})[0];
        const sources: {[key: Id]: Source} = {};
        const blobs: Blobs = {};

        for (const sourceId in data) {
            const source = data[sourceId];
            if (!source.content) throw new Error();
            const sourceData = source.content.split(/[;:,]/);
            const base64String = sourceData[3];
            const sourceBytes = this.base64toBytes(base64String);
            const extension = this.media.typeToExtension(source.mime);

            const path = `${name}/${sourceId}.${extension}`;
            sources[sourceId] = {
                id: Number(sourceId),
                mime: source.mime,
                path,
                content: "",
            };

            blobs[path] = new Blob([sourceBytes], {type: source.mime});
        }

        return [sources, blobs];
    }

    private base64toBytes(base64String: string): Uint8Array {
        const byteCharacters = atob(base64String);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
        }

        const byteArray = new Uint8Array(byteArrays);

        return byteArray;
    }

    private async getTemplateBlob(): Promise<Blobs> {
        const {value: name} = this.store.config.getByParams({name: "name"})[0];

        const fileName = "template.html";
        const response = await fetch(fileName);
        const template = await response.text();

        const inject = ""
            + `<script defer src="${name}/data.js"></script>`
            + "\n    "
            + "<script defer src=\"website.js\"></script>";

        const website = template.replace("<!--foo-->", inject);
        const blob = new Blob([website], {type: "text/html"});

        return {["website.html"]: blob};
    }

    private async getBundleBlob(): Promise<Blobs> {
        const fileName = "website.js";
        const response = await fetch(fileName);
        const viewerBundle = await response.blob();

        return {["website.js"]: viewerBundle};
    }

    private getDataBlob(data: Data): Blobs {
        const dataString = JSON.stringify(data, null, 4);
        const dataTemplate = `const qwerty = \`${dataString}\`;`;
        const dataBlob = new Blob([dataTemplate], {type: "text/javascript"});

        const {value: name} = this.store.config.getByParams({name: "name"})[0];

        return {[`${name}/data.js`]: dataBlob};
    }
}