const path = require('path');

module.exports = {
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'src'),
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
    },
  },
};
