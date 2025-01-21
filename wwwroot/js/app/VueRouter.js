module.exports = {
  new () {
    const router = new VueRouter({
      mode: 'hash',
      routes: []
    })
    const user = this.getUser()
    user.routes().then(response => {
      router.addRoutes(response)
    })

    return {
      router
    }
  },
  getUser () {
    let username = ''
    let displayName = ''
    const roles = []
    let menus = () => import('./Menus/Public.js')
    let routes = () => import('./Routes/Public.js')
    menus = () => import('./Menus/Authorized.js')
    routes = () => import('./Routes/Authorized.js')

    return {
      username,
      displayName,
      roles,
      menus,
      routes
    }
  },
  setUser (vue) {
    const user = this.getUser()
    user.menus().then(response => {
      vue.$root.app.menus = response
    })
  }
}
