require('ts-node').register();
const path = require('path');

const { createPages } = require('./src/lib/createPages');

exports.createPages = createPages;
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
  });
};
