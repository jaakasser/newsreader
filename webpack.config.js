"use strict";

const webpack = require('webpack');
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let appName = 'app';
const entry = './src/main.js';
const exportPath = path.resolve(__dirname, './build');

let plugins = [];
let env = process.env.WEBPACK_ENV;

let suffix = '.js';
if (env === 'production') {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));

    suffix = '.min.js';
}

appName = appName + suffix;

module.exports = {
    entry: entry,
    output: {
        path: exportPath,
        filename: appName
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: 'index.html'
        })
    ]
};