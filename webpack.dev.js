const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    // Make errors more clear
    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist'
    }
});
