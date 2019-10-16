require('webpack');
require('handlebars');
const {resolve} = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'styles.min.css'
});
const location = {
  output: './build',
  common: './scripts/pages/common'
};
const entry = {
  common: location.common
};

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: entry,
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, location.output)
  },
  devServer: {
    host: '10.10.2.135',
    port: 3000,
    open: true,
    hot: true,
    inline: true,
    watchContentBase: true,
    historyApiFallback: true,
    contentBase: resolve(__dirname, ''),
    stats: {
      children: false
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        loader: 'babel-loader',
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.woff($|\?)|\.otf($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.png($|\?)|\.jpg($|\?)|\.gif($|\?)/,
        use: 'url-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: extractPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'sass-loader',
            'group-css-media-queries-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    extractPlugin,
    new UglifyJsPlugin()
  ]
};
