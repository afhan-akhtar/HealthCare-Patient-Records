const rootPath = `/v1/Patients`
const getPath = `${rootPath}/:id`

module.exports = {
  /**
   * Get the list of patient Records
   * @param {Object} request
   * @return {Object} patient records
   */
  gets(request) {
    try {
      return axios.get(rootPath, {
        params: {
          ...request
        }
      })
    } catch (error) {
      return error
    }
  },
}
