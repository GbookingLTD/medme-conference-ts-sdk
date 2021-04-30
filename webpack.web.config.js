const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './'),
    devtool: 'source-map',
    entry: './dist/amd/index.js',
    mode: 'development',
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
        /^\medme\/3dparts.*/i,
    ],
    output: {
        filename: 'index.all.js',
        path: path.resolve(__dirname, 'dist/web'),

        library: {

            name: 'mmconf',
            type: 'umd',
            export: 'index'
        },
        globalObject: 'this',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};