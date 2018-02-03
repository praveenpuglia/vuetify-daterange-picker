module.exports = {
  dist: 'build',
  webpack(config) {
    config.devtool = '#source-map';
    return config;
  },
};
