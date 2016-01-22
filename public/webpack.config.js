var path = require('path');

module.exports = {
  cache: true,
  entry: path.join(__dirname, 'scripts', 'index.js'),
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders : [
          'babel-loader',
        ]
      }
    ]
  }
};
