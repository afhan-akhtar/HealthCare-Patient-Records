module.exports = {
  init(vue) {
    this.setBaseUrl(vue.$root.settings.api.his)

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response ? error.response.status : null
        const data = error.response ? error.response.data : {}
        let message = ''
        switch (statusCode) {
          case 400: // Bad Request
            if (data.errors) {
              for (const property in data.errors) {
                message += data.errors[property].join('\n')
                message += '\n'
              }
            } else {
              message = data
            }
            vue.$root.alert(message)
            break

          case 401: // Unauthorized
            vue.$root.alert('Session expired, please login again.')
            break

          case 403: // Forbidden
            vue.$root.alert(data)
            break

          case 404: // Not Found
            vue.$root.alert('API not found! Please contact IT department to follow up')
            break

          case 405: // Method Not Allowed
            vue.$root.alert('API method not allowed! Please contact IT department to follow up.')
            break

          case 409: // Conflict
            vue.$root.alert(data)
            break

          case 422: // Unprocessable Entity
            vue.$root.alert(data)
            break

          case 500: // Internal Server Error
            vue.$root.alert(data)
            break

          case null: // No Response
            vue.$root.alert('Network error! Please try again.')
            break

          default:
            console.log(error.stack)
            break
        }
        throw error
      }
    )
  },
  setBaseUrl(url) {
    axios.defaults.baseURL = url
  }
}
