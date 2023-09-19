const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  target: 'node',
  entry: './src/server/index.tsx',
  mode: process.env.NODE_ENV,
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.svg$/i,
        use: 'raw-loader',
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
  externals: [nodeExternals()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
          filename: "[name].css",
    }),
  ],
};
