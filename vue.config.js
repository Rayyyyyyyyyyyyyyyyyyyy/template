const path          = require("path");
const resolve       = path.resolve;
const NODE_ENV  = process.env.NODE_ENV;
const isDev = NODE_ENV === "develop" || NODE_ENV === "default";
const isProd = NODE_ENV === "production";


module.exports = {
  pwa: {
    name: "Template",
    themeColor: "#1915bf",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico",
    },
  },
  css: {
    sourceMap: isDev,
  },
  outputDir: process.env.OUTPUT_DIR,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: config => {
    return {
      optimization: {
        minimize: isProd
      },
      resolve: {
        alias: {
          "~": resolve(__dirname, "src/"),
          "@": resolve(__dirname, "src/"),
        },
      },
    }
  }
}
