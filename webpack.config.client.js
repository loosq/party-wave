const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const entry = ['./src/client/index.tsx'];
if (isDev) {
  entry.push('webpack-hot-middleware/client?path=http://localhost:4000/__webpack_hmr');
};

module.exports = {
  devtool: 'source-map',
  mode: process.env.NODE_ENV,
  target: 'web',
  entry,
  output: {
    path: `${__dirname}/build`,
    publicPath: '/',
    filename: 'client.js',
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|gif|ttf)$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  plugins: [
    new CompressionPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
  ],
  devServer: {
    hot: isDev,
  },
};
