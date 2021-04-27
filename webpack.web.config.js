const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './'),
    devtool: 'inline-source-map',
    entry: './index.ts',
    mode: 'development',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader'
        }]
    },
    output: {
        filename: 'index.all.js',
        path: path.resolve(__dirname, 'dist/web')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};