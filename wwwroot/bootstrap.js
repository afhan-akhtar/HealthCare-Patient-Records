'use strict'

window.$AppStartup = function () {
  const self = this
  const now = new Date().getTime()
  this.build = null
  this.settings = {}

  function init () {
    fetch('app.json?v=' + now).then(function (response) {
      return response.json()
    }).then(function (data) {
      self.settings = data
    }).catch(function (e) {
      console.error('init error')
      console.error(e)
    }).finally(function () {
      fetch('_build.json?v=' + now).then(function (response) {
        return response.text()
      }).then(function (data) {
        self.build = data.trim()
        if (!self.settings.cache) {
          self.build = now
        }
      }).catch(function (e) {
        console.error(e)
        self.build = now
      }).finally(function () {
        if ('serviceWorker' in navigator) {
          // navigator.serviceWorker.register('service-worker.js?v=' + self.build);
        } else {
          console.warn('Browser not support service worker')
        }
        loadCss('index.css?v=' + self.build)
        loadJs('index.js?v=' + self.build)
        loadModule()
      })
    })
  }

  function loadModule () {
    window['vue2-sfc-loader'].loadModule('App.vue', {
      moduleCache: { vue: Vue },
      getFile: function (url) {
        return fetch('js/' + url + '?v=' + self.build).then(function (response) {
          return response.text()
        }).catch(function (e) {
          console.error('getFile catch: ' + url)
          console.error(e)
        })
      },
      addStyle: function (styleText) {
        const t = styleText.trim()
        if (t === '') {
          return
        }
        const style = document.createElement('style')
        style.innerHTML = t
        const ref = document.head.getElementsByTagName('style')[0] || null
        document.head.insertBefore(style, ref)
      },
      log: function () {
        for (let i = 0, j = arguments.length; i < j; i++) {
          console.error(arguments[i])
        }
      },
      handleModule: async function (type, getContentData, path, options) {
        switch (type) {
          case '.svg':
            return getContentData(false)
        }
      }
    }).then(function (app) {
      app.propsData = {}
      new Vue(app).$mount('#app')
    })
  }

  init()

  return self
}

function loadCss (url) {
  const el = document.createElement('link')
  el.rel = 'stylesheet'
  el.href = url
  document.head.appendChild(el)
}

function loadJs (url) {
  const el = document.createElement('script')
  el.src = url
  document.head.appendChild(el)
}

window['~/app'] = new window.$AppStartup()
