module.exports = {
  new() {
    return {
      vuetify: new Vuetify({
        theme: {
          options: { customProperties: true },
          themes: {
            light: {
              coreOrange: '#F0AC45'
            },
            dark: {}
          },
          dark: false
        }
      })
    }
  }
}
