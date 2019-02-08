module.exports = {
  configureWebpack: {
    ...(process.env.NODE_ENV === 'production'
      ? {
          externals: {
            'vuetify/lib': 'vuetify/lib',
            'date-fns': 'date-fns'
          }
        }
      : {})
  }
};
