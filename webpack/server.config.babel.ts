import webpack, {Configuration} from 'webpack';
import {join, resolve} from 'path';
import nodeExternals from 'webpack-node-externals';

const config: Configuration = {
    target: 'node',
    node: {__dirname: false},
    entry: join(__dirname, '../server/server.ts'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: join(__dirname, '../tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.(png|jpg|gif|scss)$/i,
                use: [
                    {
                        loader: 'null-loader',
                    },
                ],
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        iesafe: true,
                    },
                },
            },
        ],
    },
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: join(__dirname, '../dist'),
        publicPath: '../static/',
    },
    resolve: {
        modules: ['src', 'node_modules'], // ??
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            store: resolve(__dirname, '../src/store.ts'),
            components:
                resolve(__dirname, '../src/components/'),
            utils:
                resolve(__dirname, '../src/utils/'),
            styles:
                resolve(__dirname, '../src/styles/'),
            libs:
                resolve(__dirname, '../src/libs/'),
            hooks:
                resolve(__dirname, '../src/hooks/'),
            api:
                resolve(__dirname, '../src/api/'),
            slices:
                resolve(__dirname, '../src/slices/'),
            images:
                resolve(__dirname, '../src/images/'),
        },
    },
    externals: [nodeExternals({allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i]})],
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            window: resolve(join(__dirname, 'mock/window.mock')),
            localStorage: resolve(join(__dirname, 'mock/localStorage.mock')),
            document: resolve(join(__dirname, 'mock/document.mock')),
        }),
    ],
};

export default config;
