const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const URL = '/dist/';


const clientConfig = {
	devtool: 'source-map',
	entry: [
		// We ship a few polyfills by default:
		require.resolve('./polyfills'),
		'webpack-hot-middleware/client?timeout=2000&name=client',
		path.resolve(__dirname, '..', 'src', 'index.js')
	],
	output: {
		path: path.resolve(__dirname, '..', 'public/dist'),
		filename: 'bundle.js',
		publicPath: URL,
		pathinfo: true
	},

	resolve: {
		extensions: ['.css', '.js', '.jsx'],
		modules: [
			__dirname,
			path.resolve(__dirname, '..', 'src', 'components'),
			'node_modules',
			'bower_components'
		],
		alias: {

		}
	},
	/* eslint indent:1 */
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader!eslint-loader'
		},
		{
			test: /\.scss$/,
			use: [{
				loader: 'style-loader' // inject style tag in the head part of the document
			}, {
				loader: 'css-loader',
				options: {
					modules: true, // enable css modules
					sourceMap: true,
					localIdentName: '[name]__[local]___[hash:base64:5]' // generate meaningful unique class names
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: true,
					plugins: () => [
						require('postcss-flexbugs-fixes'),
						require('autoprefixer')({
							browsers: [
								'>1%',
								'last 4 versions',
								'Firefox ESR',
								'not ie < 9', // React doesn't support IE8 anyway
							],
							flexbox: 'no-2009',
						})]
				}
			},
			{
				loader: 'sass-loader',
				options: {
					sourceMap: true
				}
			}
			]
		},
		{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		},
		{
			test: /\.(png|jpg)$/,
			loader: 'url-loader?name=[hash]-[name].[ext]&limit=1024'
		},
		{
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			loader: 'file-loader',
			query: {
				name: 'fonts/[name].[ext]',
				publicPath: `dist/`,
			}
		}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};


module.exports = clientConfig;