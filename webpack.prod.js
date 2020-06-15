const path = require("path");

module.exports = {
    entry: "./src/script.js",
    output: {
        mode: "production",
        filename: "scripts.js",
        path: path.resolve(__dirname, "dist")
    }
};