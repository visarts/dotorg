const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/styles/main.less',
    './src/index.js'
  ],
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
      allChunks: true
    })
    // new CopyWebpackPlugin([
    //   { from: 'src/mockup/styledata.json', to: 'assets' }
    // ])
  ],
  module: {
		rules: [
			{
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
			},
      {
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
          loader: 'babel-loader'
        }
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
          loader: 'babel-loader'
        }
			},
      {
        test: /\.jpg$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
		]
	},
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.less'],
    alias:{
      Services: path.resolve(ROOT_PATH, 'src/app/services'),
      Styles: path.resolve(ROOT_PATH, 'src/app/styles'),
      Data: path.resolve(ROOT_PATH, 'data')
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./data'),
      path.resolve('./node_modules')
    ]
  }
}
