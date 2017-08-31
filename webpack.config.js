const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const {
    CheckerPlugin
} = require('awesome-typescript-loader');
const extractSass = new ExtractTextPlugin({
    filename: "styles.css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
    entry: './src/js/ap.ts',
    resolve: {

        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.resolve('./build'), 'node_modules']
    }, 
    output: {
        path: __dirname + '/build',
        filename: 'index.js',
    },

    module: {
        rules: [{
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configuration: {
                       rules: {
                           quotemark: [true, 'double']
                       }
                   },
                   configFile: false,
                   emitErrors: false,
                   failOnHint: false,
                   typeCheck: false,
                   fix: false,
                   tsConfigFile: 'tsconfig.json'
               }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader?sourceMap"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new CheckerPlugin(),
        new HtmlWebpackPlugin(),
        new StyleLintPlugin({configFile: '.stylelintrc.json', failOnError: false}),
        extractSass        
    ],
};