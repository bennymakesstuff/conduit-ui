const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      // Vue template loader
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // SCSS Loader
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
                esModule: false,
            },
          },
          { loader: 'css-loader', options: { esModule: false }},
          "sass-loader"
        ]
      },
      // Vanilla Css Loader
      {
        test: /\.css$/,
        use: ["vue-style-loader",
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
              esModule: false,
          },
        },
        "css-loader"]
      },
      // Image & Font Loader
      {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use: [
          {
            loader: "file-loader",
            options: { esModule: false }
          }
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Home',
      baseUrl: 'https://localhost/',
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
  ],

  // Development Server
  devServer: {
    host: '0.0.0.0',
    //contentBase: path.join(__dirname, 'dist'),
    compress: true,
    https: true,
    port: 8080,
    static: [
      path.resolve(__dirname, 'public')
    ]
    //publicPath: "/",
    //liveReload: true,
    //watchContentBase: true,
    //hot: false,
    //historyApiFallback: true,
  },

};
