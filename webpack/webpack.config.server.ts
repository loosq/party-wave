import { Configuration } from 'webpack';

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

type IMode = 'development' | 'none' | 'production';

export const server: Configuration = {
  target: 'node',
  entry: './src/server/index.tsx',
  mode: process.env.NODE_ENV as IMode,
  output: {
    filename: 'server.js',
    publicPath: '/',
    path: `${__dirname}/../build`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(jpg|png|gif|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/',
          },
        },
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  externals: [nodeExternals()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
