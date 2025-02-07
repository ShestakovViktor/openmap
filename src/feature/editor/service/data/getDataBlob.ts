import {Data} from "@type";

export function getDataBlob(data: Data): {[key: string]: Blob} {
    const dataString = JSON.stringify(data, null, 4);
    const dataType = "application/json;charset=utf-8";
    const dataBlob = new Blob([dataString], {type: dataType});
    return {["data.json"]: dataBlob};
}