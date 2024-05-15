const path = require('path');
const WatchFileAndRun = require("./plugin/reload-plugin");

module.exports = {
    entry: './src/index.ts',
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },
    plugins: [new WatchFileAndRun({options: true})],
};
