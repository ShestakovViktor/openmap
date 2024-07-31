import template from "@res/html/viewer.html";
import {Media} from "@core";
import {ArchiveDriver} from "@src/interface";
import {Asset, Data, Id} from "@type";

type Blobs = {[key: string]: Blob};

export class Converter {
    private media: Media;

    constructor(private archiveDriver: ArchiveDriver) {
        this.media = new Media();
    }

    async exportAsFile(data: Data): Promise<Blob> {
        const blobs = this.exportData(data);
        return await this.archiveDriver.archive(blobs);
    }

    private exportData(projectData: Data): {[key: string]: Blob} {
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
            if (!asset.data) throw new Error("");
            const contentBlob = new Blob([asset.data], {type: "text/plain"});

            const path = `asset/${id}.${asset.encoding}`;
            records[asset.id] = {...asset, path, data: ""};
            blobs[path] = contentBlob;
        }

        return [records, blobs];
    }

    async importProject(blob: Blob): Promise<Data> {
        const files = await this.archiveDriver.extract(blob);
        const data = await this.importData(files);
        return data;
    }

    private async importData(files: Blobs): Promise<Data> {
        const dataString = await files["data.json"].text();
        const data = JSON.parse(dataString) as Data;

        for (const id in data.asset) {
            const asset = data.asset[id];
            if (!asset.path) throw new Error("");
            asset.data = await files[asset.path].text();
            asset.path = "";
        }

        return data;
    }

    async exportAsSite(data: Data, props: {name: string}): Promise<Blob> {
        const blobs = await this.exportStatic(data, props);
        return await this.archiveDriver.archive(blobs);
    }

    private async exportStatic(
        data: Data,
        props: {name: string}
    ): Promise<Blobs> {
        const [asset, blobs] = this.splitAssetsToFiles(data.asset, props);

        return {
            ...await this.getBundleBlob(),
            ...this.getTemplateBlob(props),
            ...this.getDataBlob({...data, asset}, props),
            ...blobs,
        };
    }

    private splitAssetsToFiles(
        input: {[key: Id]: Asset},
        props: {name: string}
    ): [{[key: Id]: Asset}, {[key: Id]: Blob}] {

        const output: {[key: Id]: Asset} = {};
        const blobs: Blobs = {};

        for (const id in input) {
            const asset = input[id];
            if (!asset.data) throw new Error();
            const assetDataBytes = this.base64toBytes(asset.data);
            const extension = this.media.typeToExtension(asset.media);

            const path = `${props.name}/${id}.${extension}`;
            output[id] = {
                ...asset,
                path,
                data: "",
            };

            blobs[path] = new Blob([assetDataBytes], {type: asset.media});
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

    private getTemplateBlob(props: {name: string}): Blobs {
        const website = template.replace("./project", "./" + String(props.name));
        const blob = new Blob([website], {type: "text/html"});

        return {[props.name + ".html"]: blob};
    }

    private async getBundleBlob(): Promise<Blobs> {
        const fileName = "viewer.js";
        const response = await fetch(fileName);
        const viewerBundle = await response.blob();

        return {["viewer.js"]: viewerBundle};
    }

    private getDataBlob(data: Data, props: {name: string}): Blobs {
        const dataString = JSON.stringify(data, null, 4);
        //const dataTemplate = `const OPEN_MAP_DATA = String.raw\`${dataString}\`;`;

        const dataBlob = new Blob([dataString], {type: "application/json"});

        return {[`${props.name}/data.json`]: dataBlob};
    }
}