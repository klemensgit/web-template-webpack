const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        "css/style.min":"./sass/style.scss",
        "js/scripts.min":"./js/scripts.js"
    },
    output:{
        filename: "[name].[contentHash].js",
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
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        // extrakta javascript css zapis iz script.js file-a v svoj css file.
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css",
        }),
        // počisti odvečne hashfile, ki se generirajo z vsako spremembo.
        new CleanWebpackPlugin(),
        // dinamično na podlagi novih hash filov dodaja v head zadnjo verzijo.
        new HtmlWebpackPlugin({
            template: './sub_tpl_head.php',
            inject:'head',
            filename:'sub_tpl_head.php'
        })

    ]
};