const path = require('path');

module.exports = function plugin(context, options) {
  return {
    name: 'docusaurus-plugin-protected-routes',

    getPathsToWatch() {
      return [path.resolve(__dirname, './client-modules/**/*')];
    },

    getClientModules() {
      return [path.resolve(__dirname, './client-modules/protected-routes')];
    },

    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            '@site/src/components/Auth': path.resolve(__dirname, '../../../src/components/Auth'),
          },
        },
      };
    },
  };
};