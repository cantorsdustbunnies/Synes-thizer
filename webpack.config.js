const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const copyPlugin = new CopyWebpackPlugin([
	{
		from: 'src/chrome_extension/manifest.json',
		to: 'manifest.json',
		toType: 'file',
	},
	{
		from: 'src/chrome_extension/images',
		to: 'images',
		toType: 'dir',
	},
]);

const htmlPlugin = new HtmlWebPackPlugin({
	template: './src/index.html',
	filename: './index.html',
});

const reactConfig = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	plugins: [htmlPlugin],
	devtool: 'cheap-module-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 8080,
	},
};

const chromeScriptConfig = {
	entry: {
		background: './src/chrome_extension/background/index.js',
		content: './src/chrome_extension/content/index.js',
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/build',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	plugins: [copyPlugin],
};

module.exports = [reactConfig, chromeScriptConfig];
