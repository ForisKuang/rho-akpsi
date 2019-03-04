// Import webpack module
var webpack = require("webpack");
// Import open browser plugin
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

const HtmlWebPackPlugin = require('html-webpack-plugin');
//Import path module
const path = require('path');
module.exports = {
   entry: "./src/index.js", //set entry file
// Resolve to output directory and set file
output: {
    path: path.resolve("src/"),
    filename: "bundle.js",
},
// Add Url param to open browser plugin
plugins: [
    new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
    })
],
// Set dev-server configuration
devServer: {
   inline: true,
   contentBase: './src',
   port: 3000
},
// Add babel-loader to transpile js and jsx files
module: { 
    rules: [
        {
           test: /\.jsx?$/,
           exclude: /(node_modules)/,
           use: [
                 {loader: 'babel-loader'},
              ]
        }]
      }
};
