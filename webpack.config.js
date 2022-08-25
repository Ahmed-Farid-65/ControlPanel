const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    entry: {
        'app': '/src/index.js',
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, '/app'),
        filename: 'app.js',
    },

    devServer: {
        open: true,
        hot: true,
        static: {
          directory: path.join(__dirname, '/app'),
        },
        compress: true,
        port: 4321,
        devMiddleware: {
            writeToDisk: true,
        },
    },

    module: {

        rules: [

          {

            test: /\.html$/i,
            use: [
                {
                    loader: 'html-loader' 
                }
            ]

          },
          {
            test: /.s?css$/,
            use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
          },
          {
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            exclude: /images/,   
            use: [    
              {   
                loader: "file-loader",    
                options: {   
                  name: '[name].[ext]',   
                  outputPath: "assets/fonts",    
                }   
              }   
            ]   
          },
        ]
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/css/style.css',
        }
        ),
        new HtmlWebpackPlugin ({
            filename: 'index.html',
            template: './src/index.html',
        }),
    ]
}