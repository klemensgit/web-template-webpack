const path = require("path");
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require("purifycss-webpack");




const PATHS = {
    src: path.join(__dirname, '/')
}

/** -------------------------------------- paths for external libraries js and css ------------------------*/
var VENDOR_EXT_LIB = [
    "./lib/test.js",
    "./lib/vendor.js",
    "./lib/bootstrap/bootstrap.scss",
    "./lib/style_test.scss",
    "./node_modules/slick-carousel/slick/slick.scss",
    "./node_modules/slick-carousel/slick/slick.min.js"
];

/** -------------------------------------- development config ------------------------------------------- */
var buildDevConfig = {
    devtool: 'eval-cheap-module-source-map',
    entry: {
        //"css/style.min":"./sass/style.scss",
        vendor: VENDOR_EXT_LIB,
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
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                  exposes: ['$', 'jQuery'],
                },
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:[
                    { loader: 'babel-loader', options: { presets: [ ['@babel/preset-env', {"targets": { "ie": "11" }}] ] } }
                ]
            },
            {
                test: /\.scss|\.css$/,
               // exclude: /node_modules/,
                use:[          
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { plugins: (loader) => [require('autoprefixer')], sourceMap: true } },
                    { loader:'sass-loader', options: { sourceMap: true } },
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
            inject: 'head',
            filename: 'sub_tpl_head.php'
        })
    ]
};

/** ------------------------------------- production config --------------------------------------------- */
VENDOR_EXT_LIB.push("./js/scripts.js");
var buildProdConfig = {
    entry:{
        //"css/style.min":"./sass/style.scss",
        "scripts.min": VENDOR_EXT_LIB
    },
    output:{
        filename: "js/[name].[contentHash].js",
        path: path.resolve(__dirname, "vendor"),
        publicPath: "./vendor/" //pot, da HtmlWebpackPlugin ve kakšno pot nastavit, ko injecta hash file v head
    },
    module:{
        rules:[
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                  exposes: ['$', 'jQuery'],
                },
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:[
                    { loader: 'babel-loader', options: { presets: [ ['@babel/preset-env', { "targets": { "ie": "11" }}] ] } }
                ]
            },
            {
                test: /\.scss|\.css$/,
                //exclude: /node_modules/,
                use:[ 
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader', options: { plugins: (loader) => [ require('autoprefixer')] } },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    optimization: {
        usedExports: true,
    },
    plugins:[
        // extrakta javascript css zapis iz script.js file-a v svoj css file.
        new MiniCssExtractPlugin({
            filename: "css/style.min.[contentHash].css",
            //filename: "css/[name].[contentHash].css", če žeilimo da se ohrani ime datoteke iz katere extraktamo css v tem primeru script.js
        }),
        new PurifyCSSPlugin({ 
            paths: glob.sync([
                        `${PATHS.src}/**/*.php`,
                        `${PATHS.src}/lib/*.js`,
                        `${PATHS.src}/node_modules/slick-carousel/slick/*.js`,
                        `${PATHS.src}/**/*.html`,
                        `${PATHS.src}/**/*.inc`
                        ], { nodir: true }
                    ),
            minimize:true
        }),
        // počisti odvečne hashfile, ki se generirajo z vsako spremembo.
        new CleanWebpackPlugin(),
        // dinamično na podlagi novih hash filov dodaja v head zadnjo verzijo.
        new HtmlWebpackPlugin({
            template: './sub_tpl_head.php',
            inject: 'head',
            filename: 'sub_tpl_head.php'
        })
    ]
};


module.exports = (env, argv) => {
    if (argv.mode === 'development') {
      return buildDevConfig;
    }

    return buildProdConfig;
};