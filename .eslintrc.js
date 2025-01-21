// .eslintrc.js
module.exports = {
  extends: ['standard', 'plugin:vue/recommended', 'prettier'],
  rules: {
    'space-before-function-paren': ['off'],
    'no-unused-vars': ['warn'],
    'vue/no-unused-components': ['warn'],
    'vue/no-mutating-props': ['off'],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-mixed-operators': ['off'],
    'vue/valid-v-slot': ['off']
  },
  globals: {
    $nuxt: true,
    moment: true,
    Vue: true,
    axios: true,
    fetch: true,
    fabric: true,
    jwt_decode: true,
    VueRouter: true,
    Vuetify: true,
    markerjs2: true,
    Annotorious: true,
    CKEditor: true,
    ClassicEditor: true,
    infiniteScroll: true,
    pdfjsLib: true,
    Base64: true
  }
}
