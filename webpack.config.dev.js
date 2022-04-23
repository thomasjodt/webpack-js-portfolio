const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const DotEnv = require('dotenv-webpack')

const ruleForJavascript = {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader'
    }
}
const rulesForCss = {
    test: /\.css|.styl$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
}
const rulesForImages = {
    test: /\.png/,
    type: 'asset/resource'
}
const rulesForFonts = {
    test: /\.(woff|woff2)$/i,
    type: 'asset/resource',
    generator: {
        filename: 'assets/fonts/[name].[hash][ext][query]',
    }
}
const rules = [ruleForJavascript, rulesForCss, rulesForFonts, rulesForImages]

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, './src/assets/images'),
        }
    },
    module: { rules },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin(
            {
                patterns: [
                    {
                        from: path.resolve(__dirname, "src", "assets/images"),
                        to: "assets/images"
                    }
                ]
            }
        ),
        new DotEnv(),
    ],
    devServer: { port: 8080, open: true }
}