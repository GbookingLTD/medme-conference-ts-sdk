const path = require('path');
const JavaScriptObfuscator = require('webpack-obfuscator');


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
        filename: 'index.all.min.js',
        path: path.resolve(__dirname, 'dist/web')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    plugins: [
        new JavaScriptObfuscator({
            rotateStringArray: true
        }, ['dist/web/index.all.min.js'])
    ]

};