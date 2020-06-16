const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        "css/style.min":"./sass/style.scss",
        "js/scripts.min":"./js/scripts.js"
    },
    output:{
        filename: "[name].js",
        path: path.resolve(__dirname, "vendor")
    },
    module: {
        rules:[
            {
                test: /.(scss|css)$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ]
};