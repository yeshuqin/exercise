let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let TerserJSPlugin = require('terser-webpack-plugin') //优化js如压缩
let MiniCssExtractPlugin = require('mini-css-extract-plugin') //抽离生成css打包文件（可以引用多次）
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') //优化css为压缩格式
let webpack = require('webpack')
module.exports = {
    mode: 'development', //模式 默认两种模式 production development
    entry: "./src/index.js", //入口
    output: {
        filename: 'bundle.[hash].js', //打包后的文件名
        path: path.resolve(__dirname, 'build') //路径必须是一个绝对路径
    },
    externals: {
        jquery: "jQuery"
    },
    optimization: { //优化项
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({}) 
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    devServer: { //开发服务器配置
        contentBase: path.join(__dirname, "build"),
        compress: true,
        progress: true,
        open: true,
        port: 9999
    },
    module: {
        rules: [ //loader默认 是从右到左执行，从下到上执行
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader'
            //     },
            //     exclude: /node_modules/,
            //     enforce: 'pre'
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { //用babel-loader需要把es6转es5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'less-loader']
            }
        ]
    }
}