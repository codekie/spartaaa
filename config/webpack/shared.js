const HtmlWebPackPlugin = require('html-webpack-plugin'),
    appConfig = require('../app');

module.exports = {
    entry: appConfig.dev.client.filepathEntry,
    output: {
        path: appConfig.build.client.output.path,
        filename: appConfig.build.client.output.filenameScript
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
    plugins: initPlugins()
};

function initPlugins() {
    return [
        new HtmlWebPackPlugin({
            template: appConfig.build.client.input.filepathTemplate,
            filename: appConfig.build.client.output.filepathTemplate
        })
    ];
}
