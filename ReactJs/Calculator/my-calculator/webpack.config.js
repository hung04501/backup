var path = require('path');
var webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
 module.exports = {
     entry: './src/index.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'main.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 exclude: /node_modules/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             },
             {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
             }
         ]
     },
     plugins: [htmlPlugin],
     stats: {
         colors: true
     },
     
     devtool: 'source-map'
 };
