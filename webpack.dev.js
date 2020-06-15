const path = require("path");

module.exports = {
    entry: "./src/script.js",
    output: {
        mode: "development",
        devtool: "none",
        filename: "scripts.js",
        path: path.resolve(__dirname, "dist")
    }
};