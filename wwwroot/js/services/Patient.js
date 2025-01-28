const rootPath = 'https://webdev.tabnext.asia/api/FrontendInterview/v1/Patients';
const configPath = 'https://webdev.tabnext.asia/api/FrontendInterview/v1/Configs';

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

 /**
 * Create a new patient record
 * @param {Object} patientData - The data for the new patient
 * @return {Object|null} created patient record or null if no content returned
 */
async createPatient(patientData) {
  try {
    const response = await fetch(rootPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-version': '1.0',
      },
      body: JSON.stringify(patientData),
    });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // Handle 204 No Content
    if (response.status === 204) {
      console.log('Patient record created successfully with no content returned.');
      return null;  // No content returned, so return null
    }

    // If there is content, parse it as JSON (useful for other status codes)
    const responseBody = await response.json();
    return responseBody;

  } catch (error) {
    console.error('Error creating patient record:', error);
    throw error;
  }
}
,

  /**
   * Edit an existing patient record
   * @param {string} id - The patient ID
   * @param {Object} patientData - The updated data for the patient
   * @return {Object} updated patient record
   */
  async editPatient(id, patientData) {
    try {
      if (!id) {
        throw new Error('Patient ID is required');
      }

      const url = `${rootPath}/${id}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'api-version': '1.0',
        },
        body: JSON.stringify(patientData),
      });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
 // Handle 204 No Content
    if (response.status === 200) {
      console.log('Patient updated successfully with no content returned.');
      return null;  // No content returned, so return null
    }
      return await response.json();
    } catch (error) {
      console.error('Error editing patient record:', error);
      throw error;
    }
  },

  /**
   * Get a patient by ID
   * @param {string} id - The patient ID
   * @return {Object} patient record
   */
  async getPatient(id) {
    try {
      if (!id) {
        throw new Error('Patient ID is required');
      }

      const url = `${rootPath}/${id}`;

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
      console.error('Error fetching patient record:', error);
      throw error;
    }
  },

  /**
   * Get document types
   * @return {Object} list of document types
   */
  async getDocumentTypes() {
    try {
      const url = `${configPath}/DocumentType`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'api-version': '1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching document types:', error);
      throw error;
    }
  },

  /**
   * Get mobile country codes
   * @return {Object} list of mobile country codes
   */
  async getMobileCountryCodes() {
    try {
      const url = `${configPath}/MobileCountryCode`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'api-version': '1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching mobile country codes:', error);
      throw error;
    }
  },
  /**
   * Get mobile country codes
   * @return {Object} list of mobile country codes
   */
  async getNationalityTypes() {
    try {
      const url = `${configPath}/Nationality`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'api-version': '1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching mobile country codes:', error);
      throw error;
    }
  },


  /**
   * Get mobile country codes
   * @return {Object} list of mobile country codes
   */
  async getOccupationTypes() {
    try {
      const url = `${configPath}/Occupation`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'api-version': '1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching mobile country codes:', error);
      throw error;
    }
  },
   /**
   * Get mobile country codes
   * @return {Object} list of mobile country codes
   */
  async getRelationshipTypes() {
    try {
      const url = `${configPath}/Relationship`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'api-version': '1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching mobile country codes:', error);
      throw error;
    }
  },
};


