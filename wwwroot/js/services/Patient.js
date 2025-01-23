const rootPath = 'https://webdev.tabnext.asia/api/FrontendInterview/v1/Patients';

module.exports = {
  /**
   * Get the list of all patient records
   * @param {Object} request
   * @return {Object} patient records
   */
  async gets(request) {
    try {
      const queryParams = new URLSearchParams({
        FilterBy: 'EnglishName',
        Keyword: request.englishName || '',
      }).toString();

      const url = `${rootPath}?${queryParams}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'api-version': '1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching patient records:', error);
      throw error;
    }
  },

  /**
   * Get additional patient information by ID
   * @param {string} id - The patient ID
   * @return {Object} additional patient information
   */
  async getAdditionalInfo(id) {
    try {
      if (!id) {
        throw new Error('Patient ID is required');
      }

      const url = `${rootPath}/${id}/AdditionalInfo`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'api-version': '1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching additional patient information:', error);
      throw error;
    }
  },
};
