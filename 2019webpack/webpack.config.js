const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    mode: 'production',
    devtool: 'eval',
    entry: {
        index: './src/index.js',
        vendor: ['vue']
    }, //入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), //输出的目录，只能绝对路径
        filename: '[name].[chunkhash].js',
        publicPath: '/' //根路径
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        host:'localhost',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env'] //转化es6,es7
                    }
                }
            },
            // {
            //     test: /\.js$/,
            //     include: [path.resolve(__dirname, 'src')],
            //     loader: 'eslint-loader',
            //     enforce: 'pre'
            // },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader"] },
            { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    //url-loader内部包含了file-loader
                    loader: 'url-loader', 
                    options: {
                        limit: 8192,
                        //把图片拷贝到images
                        outputPath: 'images',
                        publicPath: '/images'
                    }
                  }
                ]
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }
          ]
    },
    plugins: [
        //此插件会自动向所有的模块注入一个_变量，引用的就是lodash模块
        //这种注入模块相当于向模板内部注入了一个局部变量
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*'],
        }),
        //这个插件是产出Html文件,在编译的时候,会读取模板文件
        new HtmlWebpackPlugin({
          template: './src/index.html', //指定模板文件
          filename: 'index.html', //产出后的文件名
          hash: true, //为了避免缓存,可以在产出的资源后面添加hash值
        //   chunks: ['index']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name][contenthash].css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin()
      ],
    //webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问
    externals: {
        jquery: "jQuery"
    }
}