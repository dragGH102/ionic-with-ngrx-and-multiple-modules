var webpack = require('webpack');
var path = require('path');

// we have the webpack.test.js file to tell Webpack what to bundle for testing
module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'ts-loader'
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker(\\|\/)@angular/,
      root('./src'), // location of your src
      {} // a map of your routes
    ),
    // print webpack warnings
    // @source: https://gist.github.com/Stuk/6b574049435df532e905
    // NOTE: "Critical dependency: the request of a dependency is an expression" could be due to missing source maps for ts files for some modules
    function () {
      this.plugin("done", function (stats) {
        if (stats.compilation.warnings.length) {
          // Log each of the warnings
          stats.compilation.warnings.forEach(function (warning) {
            console.log(warning.message || warning);
          });
        }
      });
    }
  ]
};

function root(localPath) {
  return path.resolve(__dirname, localPath);
}
