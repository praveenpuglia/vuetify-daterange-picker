module.exports = {
  banner: true,
  moduleName: 'vuetifyDaterangePicker',
  name: 'vuetify-daterange-picker',
  format: ['umd', 'umd-min', 'cjs', 'es'],
  plugins: ['vue'],
  vue: {
    css: 'dist/vuetify-daterange-picker.css',
  },
  external: ['vue', 'vuetify', 'moment'],
  globals: {
    moment: 'moment',
    vue: 'Vue',
  },
};
