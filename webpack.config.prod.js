const webpack = require('webpack')
const path = require('path')
const ROOT_PATH = path.resolve(__dirname)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin')
// const AutoPrefixer = require('autoprefixer')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    vendors: './src/vendors.js',
    main: './src/index.js'
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      allChunks: true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      title: 'Portitude: the Art of Learning',
      inject: true,
      template: './index.ejs',
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images'},
      { from: 'content', to: 'content'},
      { from: 'favicon.ico', to: '' },
      { from: 'data/prod', to: 'data' }
    ])
  ],
  module: {
		rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                // path.resolve(ROOT_PATH, 'node_modules'),
                path.resolve(ROOT_PATH, 'src/styles')
              ]
            }
          },
        ]
      },
      {
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
          loader: 'babel-loader'
        }
			},
      {
        test: /\.(png|jpg)$/,
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
    extensions: ['*', '.js', '.jsx', '.json', '.scss', '.html'],
    alias:{
      Services: path.resolve(ROOT_PATH, 'src/services'),
      Literature: path.resolve(ROOT_PATH, 'content/literature'),
      Artwork: path.resolve(ROOT_PATH, 'content/artwork'),
      SharedComponents: path.resolve(ROOT_PATH, 'src/components/sharedComponents'),
      Images: path.resolve(ROOT_PATH, 'src/images'),
      global: path.resolve(ROOT_PATH, 'src/components/_global'),
      common: path.resolve(ROOT_PATH, 'src/components/_common'),
      config: path.resolve(ROOT_PATH, 'src/config')
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./data'),
      path.resolve('./node_modules')
    ]
  }
}
