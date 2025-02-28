const path = require('path');
const webpack = require('webpack');
const configs = ['opossum', 'opossum.min']
  .map(key => generateConfig(key));

function generateConfig (name) {
  const mode = name.indexOf('min') > -1 ? 'production' : 'development';
  const config = {
    target: 'node',
    mode,
    entry: {
      circuitBreaker: './index.js'
    },
    output: {
      path: path.resolve(__dirname, '..', 'dist'),
      filename: `${name}.js`,
      sourceMapFilename: `${name}.map`,
      library: 'circuitBreaker',
      libraryTarget: 'umd'
    },
    node: {
      process: true,
      console: true
    },
    plugins: [
      new webpack.ProvidePlugin({
        'circuitBreaker': 'opossum'
      })
    ],
    devtool: 'source-map'
  };
  return config;
}

module.exports = configs;
