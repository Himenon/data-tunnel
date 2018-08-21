import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const modules: webpack.Configuration[] = [
    // rendererで利用するscript。entryはwindowの種類の数だけある
    {
        entry: {
            index: path.resolve(__dirname, "src/index.ts")
        },
        output: {
            // publicPath: '/',
            chunkFilename: '[name].chunk.js',
            filename: "[name].js",
            pathinfo: true,
        },
        module: {
            rules: [],
        },
        plugins: [
            new TsconfigPathsPlugin({
                configFile: "./tsconfig.json"
            }),
            new HtmlWebpackPlugin({
                chunks: ["index"],
                template: "src/index.html",
                filename: "index.html",
            }),
        ],
        resolve: {},
    },
];

export default modules;
