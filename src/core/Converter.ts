import {Media} from "@core";
import {ArchiveDriver} from "@src/interface";
import {Asset, Data, Id} from "@type";
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
        const [asset, blobs] = this.splitAssetToBase64(projectData.asset);
        const data = {...projectData, asset};

        const dataString = JSON.stringify(data, null, 4);
        const dataType = "application/json;charset=utf-8";
        const dataBlob = new Blob([dataString], {type: dataType});

        return {["data.json"]: dataBlob, ...blobs};
    }

    private splitAssetToBase64(assets: {[key: Id]: Asset}): [
        {[key: Id]: Asset},
        {[key: string]: Blob},
    ] {
        const records: {[key: Id]: Asset} = {};
        const blobs: Blobs = {};

        for (const id in assets) {
            const asset = assets[id];
            const contentBlob = new Blob([asset.content], {type: "text/plain"});

            const path = `asset/${id}.b64`;
            records[asset.id] = {...asset, content: "", path};
            blobs[path] = contentBlob;
        }

        return [records, blobs];
    }

    loadProject(data: Data): void {
        this.store.setData(data);
    }

    async importProject(blob: Blob): Promise<void> {
        const files = await this.archiveDriver.extract(blob);
        const data = await this.importData(files);
        this.store.setData(data);
    }

    private async importData(files: Blobs): Promise<Data> {
        const dataString = await files["data.json"].text();
        const data = JSON.parse(dataString) as Data;

        for (const id in data.asset) {
            const asset = data.asset[id];
            asset.content = await files[asset.path].text();
            asset.path = "";
        }

        return data;
    }

    async exportAsSite(): Promise<Blob> {
        const blobs = await this.exportStatic(this.store);
        return await this.archiveDriver.archive(blobs);
    }

    private async exportStatic(store: Store): Promise<Blobs> {
        const data = store.getData();
        const [asset, blobs] = this.splitAssetsToFiles(data.asset);

        return {
            ...await this.getTemplateBlob(),
            ...await this.getBundleBlob(),
            ...this.getDataBlob({...data, asset}),
            ...blobs,
        };
    }

    private splitAssetsToFiles(input: {[key: Id]: Asset}): [
        {[key: Id]: Asset},
        {[key: Id]: Blob},
    ] {
        const {value: name} = this.store.config.getByParams({name: "name"})[0];
        const output: {[key: Id]: Asset} = {};
        const blobs: Blobs = {};

        for (const id in input) {
            const asset = input[id];
            if (!asset.content) throw new Error();
            const assetData = asset.content.split(/[;:,]/);
            const base64String = assetData[3];
            const assetDataBytes = this.base64toBytes(base64String);
            const extension = this.media.typeToExtension(asset.mime);

            const path = `${name}/${id}.${extension}`;
            output[id] = {
                ...asset,
                mime: asset.mime,
                path,
                content: "",
            };

            blobs[path] = new Blob([assetDataBytes], {type: asset.mime});
        }

        return [output, blobs];
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
            + "<script defer src=\"openmap.js\"></script>";

        const website = template.replace("<!--foo-->", inject);
        const blob = new Blob([website], {type: "text/html"});

        return {["OpenMap.html"]: blob};
    }

    private async getBundleBlob(): Promise<Blobs> {
        const fileName = "viewer.js";
        const response = await fetch(fileName);
        const viewerBundle = await response.blob();

        return {["openmap.js"]: viewerBundle};
    }

    private getDataBlob(data: Data): Blobs {
        const dataString = JSON.stringify(data, null, 4);
        const dataTemplate = `const OPEN_MAP_DATA = \`${dataString}\`;`;
        const dataBlob = new Blob([dataTemplate], {type: "text/javascript"});

        const {value: name} = this.store.config.getByParams({name: "name"})[0];

        return {[`${name}/data.js`]: dataBlob};
    }
}