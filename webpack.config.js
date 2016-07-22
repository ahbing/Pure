const path = require('path');
const webpack = require('webpack');

const devPlugins = [
  new webpack.NoErrorsPlugin(),
];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }),
];
const plugins = process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins;

module.exports = {
  // context: path.join(__dirname + '/src/'),
  entry: {
    pure: './src/index',
  },
  // devtool: 'cheap-source-map',
  output: {
    path: path.join(__dirname + '/dist'),
    publicPath: '/',
    filename: "[name].js",
    libraryTarget: 'umd', // Export to AMD, CommonJS2 or as property in root
    library: ["pure", "[name]"]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, "test")
        ],
        test: /\.jsx?$/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
  },
  plugins: plugins
}
