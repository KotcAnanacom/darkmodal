const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})],
  },
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: 'darkmodal.min.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'darkmodal.min.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
