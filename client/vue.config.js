module.exports = {
  devServer: { disableHostCheck: false },
  chainWebpack: (config) => {
    config.resolve.symlinks(true);
    return config;
  },
};
