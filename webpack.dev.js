const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const Dotenv = require('dotenv-webpack')
const HTMLWebpackPlugin = require("html-webpack-plugin");


module.exports = merge(common, {
    mode: "development",
    module: {
        rules: [{
                test: /\.(scss|sass|less|css)$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
            },
            {
                test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, "src/main.html")
        }),
        new Dotenv(),
    ],
})