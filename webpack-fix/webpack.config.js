const path = require("path");

module.exports = {
  mode: "production",
  entry: "./script.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "ethereum-cryptography/secp256k1": require.resolve("secp256k1"),
    },
  },
  ignoreWarnings: [
    {
      module: /module2\.js\?[34]/, // A RegExp
    },
    {
      module: /[13]/,
      message: /homepage/,
    },
    /warning from compiler/,
    (warning) => true,
  ],
  target: "node",
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
};
