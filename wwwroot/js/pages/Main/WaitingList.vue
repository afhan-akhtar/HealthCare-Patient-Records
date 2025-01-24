<template>
  <div class="pa-4 pt-0 mt-2 full-container">
    <!-- Header -->
    <div class="header pt-2 pb-3 ps-1">
      <span>Patient</span>
      <button class="create-btn rounded-xl" @click="openCreatePatientForm">+ Create Patient</button>
    </div>
    
    <!-- Search Field -->
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

    <!-- Patients List and Patient Form -->
    <search-patients :patients="patients" @view-patient-details="openEditPatientForm" />
    
    <!-- Patient Form for Create/Edit -->
    <patient-form
      v-if="isFormVisible"
      :mode="formMode"
      :patient="currentPatient"
      @close="closeForm"
    />
  </div>
</template>

<script>
import SearchPatients from 'components/App/SearchPatients.vue';
import patientService from 'services/Patient.js';
import PatientForm from 'components/App/PatientForm.vue';

export default {
  components: {
    'search-patients': SearchPatients,
    'patient-form': PatientForm,
  },
  data() {
    return {
      searchQuery: '',  // Empty string to get all patients
      patients: [],
      isFormVisible: false, // Controls the visibility of the patient form
      formMode: 'create', // Tracks whether the form is in "create" or "edit" mode
      currentPatient: {}, // Holds the current patient data for editing
    };
  },
  watch: {
    searchQuery(newQuery) {
      if (newQuery === '') {
        this.patients = [];
      }
    },
  },
  methods: {
    async onSearch() {
      if (this.searchQuery === '') {
        this.patients = [];
        return;
      }
      
      try {
        const response = await patientService.gets({ englishName: this.searchQuery });
        this.patients = response.items;
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    },

    // Open the patient form in "create" mode
    openCreatePatientForm() {
      this.isFormVisible = true;
      this.formMode = 'create';
      this.currentPatient = {}; // Clear the current patient data
    },

  openEditPatientForm(patientId) {
      this.selectedPatientId = patientId; // Store the selected patient's ID
      this.formMode = 'edit';
      this.fetchPatientDetails(patientId); // Fetch patient details based on id
    },
    async fetchPatientDetails(id) {
      const patientDetails = await patientService.getPatient(id);
      this.currentPatient = patientDetails;
      this.isFormVisible = true; // Show the form to edit patient
    },


    // Close the form
    closeForm() {
      this.isFormVisible = false;
      this.currentPatient = {}; // Reset the patient data
    },
  },
};
</script>

<style scoped>
</style>
