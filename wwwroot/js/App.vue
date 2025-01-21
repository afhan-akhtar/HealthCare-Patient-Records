<template>
  <v-app :style="cssProps">
    <template>
      <t-app-header ref="appHeader" @called="called"></t-app-header>
      <v-main class="container-fluid-max" style="background: var(--v-bkgroundLightGrey-base)">
        <v-container fluid class="ma-0 pa-0">
          <router-view ref="routerView" @saveBeforeLeave="saveBeforeLeave"></router-view>
        </v-container>
      </v-main>
    </template>
    <v-snackbar v-model="snackbar.active" :color="snackbar.color" app vertical>
      {{ snackbar.text }}
      <template #action="{ attrs }">
        <v-btn small v-bind="attrs" @click="snackbar.active = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>

const settings = window['~/app'].settings
const appAxios = require('app/VueAxios.js')
const appVueRouter = require('app/VueRouter.js')
const appVuetify = require('app/Vuetify.js')


Vue.use(CKEditor, infiniteScroll)

export default {
  components: {
    't-app-header': () => import('./components/App/Header.vue'),
  },
  data() {
    return {
      app: {
        roles: [],
        menus: [],
        messages: [],
        machineName: null,
        bearer: null,
        itemsPerPage: null,
        itemsPerPageForPatientMerge: null,
        itemsPerPageForBilling: null
      },
      settings,
      overlay: false,
      drawer: false,
      snackbar: {
        active: false,
        color: '',
        text: ''
      }
    }
  },
  computed: {
    isWebview() {
      // is browsing with Microsoft Edge WebView2 Component
      return !!(window.chrome && window.chrome.webview)
    },
    siteTitle() {
      return this.settings.app.title
    },
    // Keep colors consistent even without Vue components. Accees Vuetify colors in css via var(--v-colorName), i.e var(--v-fontGrey)
    cssProps() {
      const themeColors = {}
      Object.keys(this.$vuetify.theme.themes.light).forEach((color) => {
        themeColors[`--v-${color}`] = this.$vuetify.theme.themes.light[color]
      })
      return themeColors
    }
  },
  watch: {
  },
  beforeCreate() { },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    this.setTitle(this.siteTitle)
    appAxios.init(this)
    appVueRouter.setUser(this)
  },
  methods: {
    setTitle(title) {
      document.title = title
      this.postMessageToWebview({
        action: 'SetApplicationTitle',
        title
      })
    },
    postMessageToWebview(obj = {}) {
      if (this.isWebview) {
        window.chrome.webview.postMessage(obj)
      }
    },
  },
  ...appVueRouter.new(),
  ...appVuetify.new()
}
</script>

<style>
/* Override */

fieldset {
  border: none;
}

header .v-toolbar__title {
  margin: 0 16px;
  cursor: pointer;
}

header .imgAppLogo {
  max-height: 56px;
  vertical-align: middle;
}

.v-navigation-drawer .imgAppLogo {
  width: 85%;
  padding: 6px;
}

.v-snack {
  white-space: pre-line;
}

.v-snack__content {
  font-size: 1.5rem;
}

.v-icon>svg {
  fill: currentColor;
}

/* light theme */
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #fff;
}

/* disable auto-capitialize of vuetify button */
.v-btn {
  text-transform: unset !important;
}

/* IE11 style */
@media screen and (min-width: 0\0) {
  .v-select__selection--comma {
    overflow: visible;
    margin-left: -5px;
  }

  .v-list-item__content {
    display: block;
    flex: none;
  }

  .v-menu .v-list-item .v-list-item__subtitle,
  .v-list-item .v-list-item__title {
    flex: none;
    overflow: visible;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7b7b7b;
}
</style>
