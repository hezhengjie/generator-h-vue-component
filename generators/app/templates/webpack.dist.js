var webpack = require('webpack');

module.exports = {
  entry: './src/components/<%= name %>.vue',
  output: {
    path: "./dist",
    publicPath: "/dist/",
    filename: "<%= name %>.js",
    library: ["<%= name %>"],
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
        'vue$': 'vue/dist/vue.common.js'
      }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.less$/,
        loader:"style!css!postcss!less"
      },
      {
        test: /\.css$/,
        loader:"style!css!postcss!less"
      }
    ]
  }
};
  module.exports.output.filename = "<%= name %>.min.js";
      module.exports.plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compress: {
            warnings: false
          }
        })
      ];