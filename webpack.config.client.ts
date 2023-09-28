const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDev: boolean = process.env.NODE_ENV === 'development';
const entry = ['./src/client/index.tsx'];
const plugins = [
  new CompressionPlugin(),
];
if (isDev) {
  entry.push('webpack-hot-middleware/client?path=http://localhost:4000/__webpack_hmr');
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
  );
}

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
  plugins,
  devServer: {
    hot: isDev,
  },
};
