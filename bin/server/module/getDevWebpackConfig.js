const devWebpackConfig = require('../../build/webpack.dev.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const utils = require('../../utils');
const sysConfig = require('../../config/index');

module.exports = () => {
    return utils.getPort(sysConfig.dev.serverPort).then((serverPort) => {
        // Add FriendlyErrorsPlugin
        devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://localhost:${serverPort}`]
            },
            onErrors: sysConfig.dev.notifyOnErrors
                ? utils.createNotifierCallback()
                : undefined
        }));

        return {devWebpackConfig, serverPort};
    });
};

