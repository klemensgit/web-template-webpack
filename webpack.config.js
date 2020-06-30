const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


/** development config */

var buildDevConfig = {
        devtool: 'source-map',
        entry: {
            //"css/style.min":"./sass/style.scss",
            vendor: "./lib/vendor.js",
            scripts: "./js/scripts.js"
        },
        output:{
            filename: "js/[name].[contentHash].js",
            path: path.resolve(__dirname, "vendor"),
            publicPath: "./vendor/" //pot, da HtmlWebpackPlugin ve kakšno pot nastavit, ko injecta hash file v head
        },
        module: {
            rules:[
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        "targets": {
                                            "ie": "11"
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                },
                {
                    test: /.(scss|css)$/,
                    exclude: /node_modules/,
                    use:[          
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options:{
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader:'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                    ]
                }
            ]
        },
        plugins:[  
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

/** production config */

var buildProdConfig = {
        entry: {
            //"css/style.min":"./sass/style.scss",
            "vendor.min": "./lib/vendor.js",
            "scripts.min": "./js/scripts.js"
        },
        output:{
            filename: "js/[name].[contentHash].js",
            path: path.resolve(__dirname, "vendor"),
            publicPath: "./vendor/" //pot, da HtmlWebpackPlugin ve kakšno pot nastavit, ko injecta hash file v head
        },
        module: {
            rules:[
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        "targets": {
                                            "ie": "11"
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                },
                {
                    test: /.(scss|css)$/,
                    exclude: /node_modules/,
                    use:[
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins:[
            // extrakta javascript css zapis iz script.js file-a v svoj css file.
            new MiniCssExtractPlugin({
                filename: "css/style.min.[contentHash].css",
                //filename: "css/[name].[contentHash].css", če žeilimo da se ohrani ime datoteke iz katere extraktamo css v tem primeru script.js
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


module.exports = (env, argv) => {

    if (argv.mode === 'development') {
      return buildDevConfig;
    }

    return buildProdConfig;
};