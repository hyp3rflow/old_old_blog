require('ts-node').register();
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const { createPages } = require('./src/lib/createPages');

exports.createPages = createPages;
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  })
}
