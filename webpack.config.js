const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


var config = {
    entry: {
        //"css/style.min":"./sass/style.scss",
        "scripts.min":"./js/scripts.js"
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
                    //'style-loader',
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
            filename: "css/[name].[contentHash].css",
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
      config.devtool = 'source-map';
    }
  
    if (argv.mode === 'production') {
      //...
    }
  
    return config;
};