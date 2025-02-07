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
            filename: "viewer.html",
            template: "./res/html/viewer.ejs",
            templateParameters: {
                bundle: "<script defer src=\"viewer.js\"></script>",
                title: "Viewer",
                src: "./project/",
            },
            inject: false,
            minify: false,
        }),
    ],
});
