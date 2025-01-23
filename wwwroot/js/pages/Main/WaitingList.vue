<template>
  <div class="pa-4 pt-0 mt-2 full-container">
    <v-row class="pa-4">
      <v-col cols="12 ps-0">
        <v-card class="pa-2 pt-0 pb-0" outlined>
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            append-icon-cb
            clearable
            class="d-flex align-center"
            :prepend-inner-icon="'mdi-language-english'"
            placeholder="Search Patient"
            hide-details
            @input="onSearch"
          >
            <template #append>
              <v-btn icon @click="onSearch">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
            <template #prepend>
              <div class="d-flex align-center">
                <span>Eng Name</span>
                <v-btn icon>
                  <v-icon>mdi-menu-down</v-icon>|
                </v-btn>
              </div>
            </template>
          </v-text-field>
        </v-card>
      </v-col>
    </v-row>

   
    
        <get-patients :patients="patients" />
     

   
    
  </div>
</template>

<script>
import GetPatients from 'components/App/GetPatients.vue';
import patientService from 'services/Patient.js';

export default {
  components: {
    'get-patients': GetPatients,
  },
  data() {
    return {
      searchQuery: '',  // Empty string to get all patients
      patients: [],
    };
  },
   watch: {
    // Watch for changes in the searchQuery and clear patients immediately when searchQuery is empty
    searchQuery(newQuery) {
      if (newQuery === '') {
        this.patients = [];  // Clear the patients list when search query is empty
      }
    },
  },
  methods: {
    async onSearch() {
      // If the search query is an empty string, don't call the API
      if (this.searchQuery === '') {
        this.patients = [];  // Clear the patients list if the query is empty
        return;  // Return early to prevent the API call
      }
      
      // Proceed with the API call if there's a search query
      try {
        const response = await patientService.gets({ englishName: this.searchQuery });
        this.patients = response.items;
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    },
  },
 
};
</script>



<style scoped>
</style>
