const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['', '.tsx', '.ts', '.js', '.jsx'],
        alias: {
            store: path.resolve(__dirname, 'src/store.ts'),
            components: path.resolve(__dirname, 'src/components/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            styles: path.resolve(__dirname, 'src/styles/'),
            libs: path.resolve(__dirname, 'src/libs/'),
            hooks: path.resolve(__dirname, 'src/hooks/'),
            api: path.resolve(__dirname, 'src/api/'),
            slices: path.resolve(__dirname, 'src/slices/'),
            images: path.resolve(__dirname, 'src/images/'),
        },
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(
                                __dirname,
                                'tsconfig.json',
                            ),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: '@svgr/webpack',
                    options: {
                        icon: true,
                        svgProps: {
                            preserveAspectRatio: 'xMidYMid meet',
                            width: '{props.width || props.height ? props.width : undefined}',
                            height: '{props.width || props.height ? props.height : undefined}',
                        },
                    },
                }],
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static' },
            ],
        }),
    ],
};
