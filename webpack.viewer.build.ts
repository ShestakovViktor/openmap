import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import {Configuration} from "webpack";
import {merge} from "webpack-merge";
import common from "./webpack.config";

export default merge<Configuration>(common, {
    mode: "production",
    entry: {
        viewer: "./src/viewer.tsx",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./build"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./res/html/viewer.html",
            filename: "viewer.html",
            minify: false,
        }),
    ],
});
