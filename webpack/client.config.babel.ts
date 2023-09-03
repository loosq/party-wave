import webpack, {Configuration} from 'webpack';
import {join, resolve} from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import * as dotenv from 'dotenv'
dotenv.config();

const config: Configuration = {
    entry: join(__dirname, '../src/client'),
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
                test: /\.(png|jpg|gif|mp3|mp4)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        }
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
        path: join(__dirname, '../dist'),
        filename: 'client.js',
        publicPath: '/',
    },
    resolve: {
        modules: ['src', 'node_modules'],
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
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: 'static'},
            ],
        }),
        new webpack.DefinePlugin({
            'process.env': {
              'HOST': JSON.stringify(process.env.HOST),
            }
          }),
    ],
};

export default config;
