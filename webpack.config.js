"use strict";

const path = require("path");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractPlugin = new ExtractTextPlugin({filename: './[name].css'});

module.exports = {
    entry: {
        main: [
            "./public/index.js",
            "./public/media/css/index.scss"
        ],
    },

    output: {
        path: path.resolve(__dirname, 'static/build'),
        filename: '[name].js',
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /.(js)?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"]
                },
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                }),
                exclude: [/node_modules/]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.bmp$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader'
            },
            {
                test: /\.pug$/,
                loader: "pug-loader"
            },

        ]
    },

    plugins: [
        extractPlugin
    ],
};