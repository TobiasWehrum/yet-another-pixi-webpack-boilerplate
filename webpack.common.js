'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const distDir = path.resolve(__dirname, 'dist');

module.exports = {
    // Entry point : first executed file
    // This may be an array. It will result in many output files.
    entry: './src/js/main.js',

    // What files webpack will manage
    resolve: {
        extensions: ['.js']
    },

    // Configure output folder and file
    output: {
        path: distDir,
        filename: 'main_bundle.js'
    },

    module: {
        rules: [
            {
                test: [/\.js$/],
                exclude: [/node_modules/],
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-env'] }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([distDir]),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: "src/assets", to: "assets" },
            { from: "src/frame.html" }
        ])
    ],

    "mode": process.env.NODE_ENV === "production" ? "production" : "development",
};