const path = require('path'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    appConfig = require('../app');

module.exports = {
    entry: {
        app: [appConfig.dev.client.filepathEntry]
    },
    output: {
        path: appConfig.build.client.output.path,
        filename: '[name].js'
    },
    resolve: {
        // Other resolve props
        alias: {
            // Other aliases
            '_variables.sass': path.resolve(__dirname, '../../src/client/bulma-variables.sass')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64]',
                            sourceMap: true,
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash].[ext]'
                    }
                }
            }
        ]
    },
    plugins: initPlugins(),
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    }
};

function initPlugins() {
    return [
        new HtmlWebPackPlugin({
            favicon: 'src/client/static/images/sparta.png',
            template: appConfig.build.client.input.filepathTemplate,
            filename: appConfig.build.client.output.filepathTemplate
        })
    ];
}
