const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: ['./src/client/index.tsx', 'webpack-hot-middleware/client?path=http://localhost:4000/__webpack_hmr'],
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
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
  ],
  devServer: {
    hot: true,
  },
};
