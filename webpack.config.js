const path = require('path');

module.exports = {
    entry: './js/script.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/env',
                                {
                                    "targets": {
                                        "chrome": "58",
                                        "ie": "11"
                                    },
                                    useBuiltIns: "usage",
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
};