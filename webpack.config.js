const webpack = require('webpack')
const path = require('path')
const ROOT_PATH = path.resolve(__dirname)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin')
// const AutoPrefixer = require('autoprefixer')

module.exports = {
  devtool: 'eval',
  devServer: {
     contentBase: path.join(ROOT_PATH, 'dist')
     // hot: true
  },
  entry: {
    vendors: './src/vendors.js',
    main: './src/index.js'
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
      filename: 'styles/[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images'},
      { from: 'favicon.ico', to: '' },
      { from: 'content', to: 'content'},
      { from: 'data/prod', to: 'data'}
    ]),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    /* new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          AutoPrefixer({
            browsers: ['last 2 versions', 'ios 8', 'ie 9', 'ie 10', 'ie 11']
          })
        ],
        context: path.join(ROOT_PATH, './src')
      }
    }),*/
    new HtmlWebpackPlugin({
      title: 'Portitude: the Art of Learning',
      inject: true,
      template: './index.ejs',
      hash: false
    })
    /* new MergeJsonWebpackPlugin({
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
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                // modules: true,
                importLoaders: 1,
                // localIdentName: '[name]__[local]___[hash:base64:4]'
              }
            },
            /* {
              loader: 'postcss-loader'
            },*/
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(ROOT_PATH, 'node_modules'),
                  path.resolve(ROOT_PATH, 'src/styles')
                ]
              }
            }
          ]
        })
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
      Services: path.resolve(ROOT_PATH, 'src/app/_services'),
      Literature: path.resolve(ROOT_PATH, 'content/literature'),
      Artwork: path.resolve(ROOT_PATH, 'content/artwork'),
      SharedComponents: path.resolve(ROOT_PATH, 'src/app/sharedComponents'),
      Images: path.resolve(ROOT_PATH, 'src/images'),
      global: path.resolve(ROOT_PATH, 'src/app/_global'),
      common: path.resolve(ROOT_PATH, 'src/app/_common')
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./data'),
      path.resolve('./node_modules')
    ]
  }
}
