const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    vendors: './src/vendors.js',
    main: ['./src/styles/main.less', './src/index.js']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images'},
      { from: 'favicon.ico', to: '' },
      { from: 'content', to: 'content'}
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Portitude: the Art of Learning',
      inject: true,
      template: './index.ejs',
      hash: true
    })
    /*new MergeJsonWebpackPlugin({
      'output': {
        'groupBy': [
          {
            'pattern':'./data/authors/*.json',
            'fileName':'./data/allAuthors.json'
          }
        ]
      }
    }),
    new MergeJsonWebpackPlugin({
      'output': {
        'groupBy': [
          {
            'pattern':'./data/artists/*.json',
            'fileName':'./data/allArtists.json'
          }
        ]
      }
    })*/
  ],
  module: {
		rules: [
			{
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?url=false',
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
    extensions: ['*', '.js', '.jsx', '.json', '.less', '.html'],
    alias:{
      Services: path.resolve(ROOT_PATH, 'src/app/services'),
      Styles: path.resolve(ROOT_PATH, 'src/app/styles'),
      Literature: path.resolve(ROOT_PATH, 'content/literature'),
      Artwork: path.resolve(ROOT_PATH, 'content/artwork'),
      SharedComponents: path.resolve(ROOT_PATH, 'src/app/sharedComponents'),
      Images: path.resolve(ROOT_PATH, 'src/images')
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./data'),
      path.resolve('./node_modules')
    ]
  }
}
