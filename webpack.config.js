const path = require("path");

module.exports = {
<<<<<<< Updated upstream
    entry: './js/script.js',
=======
    entry: "./source/main.js",
>>>>>>> Stashed changes
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/env",
                                {
                                    targets: {
                                        chrome: "58",
                                        ie: "11"
                                    }
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
};
