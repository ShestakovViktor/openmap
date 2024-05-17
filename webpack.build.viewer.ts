import path from "path";

import {Configuration} from "webpack";
import {merge} from "webpack-merge";
import common from "./webpack.config";

export default merge<Configuration>(common, {
    mode: "production",
    entry: {
        viewer: "./src/viewer.tsx",
    },
    experiments: {
        outputModule: true,
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./build"),
        library: {
            type: "module",
        },
    },
});
