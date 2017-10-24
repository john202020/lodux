var path = require("path");
var webpack = require("webpack");
var isDevBuild = process.argv.indexOf('--env.prod') < 0;

//loaderUtils.parseQuery() received a non-string value which can be problematic,
process.noDeprecation = true;

console.log("isDevBuild", isDevBuild);

var source = path.join(__dirname);

var dest_WWWROOT = path.join(__dirname, "dist");

var publishPlugin = [
    new webpack.optimize.UglifyJsPlugin({
        compress: true,
        sourceMap: false,
        mangle: true,
        output: {
            comments: false
        },
        exclude: [/node_modules/]
    })
];

var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
    }),

    new webpack.LoaderOptionsPlugin({
        minimize: !isDevBuild,
        debug: isDevBuild
    })
];

module.exports = {

    entry: {
        lodux: [path.resolve(source, "index_prod.js")]
    },
    output: {
        path: dest_WWWROOT,
        filename: "[name].js",
        libraryTarget: "umd"
    },
    plugins: !isDevBuild ? plugins.concat(publishPlugin) : plugins,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['es2015']
                  }
                }
              }
        ]
    }
};
