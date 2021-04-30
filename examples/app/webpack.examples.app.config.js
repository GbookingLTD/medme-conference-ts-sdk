const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './'),
    devtool: 'source-map',
    entry: './src/app.ts',
    mode: 'development',
    resolve: {
        roots: [__dirname, path.resolve(__dirname, './')]
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader'
        }]
    },
    externals: [
        {
            jquery: 'jQuery',
            "@medme/lib-jitsi-meet": 'JitsiMeetJS',
        },
        /^\@medme\/lib-jitsi-meet\/.*/i,
        /^medme\/3dparts.*/i,
    ],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public'),
        library: {
            name: 'App',
            type: 'umd',
            export: 'App'
        },
        globalObject: 'this',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};