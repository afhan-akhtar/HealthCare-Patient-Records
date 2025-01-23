<template>
  <div class="row ps-3" style="min-height: 80vh;">
    <!-- Patients list taking 9 columns or 12 columns based on patient data -->
    <div :class="patients.length === 0 || !selectedPatientDetails ? 'col-12' : 'col-9 border-right'">
      <div
        v-for="patient in patients"
        :key="patient.id"
        class="mb-3 pointer"
        @click="fetchAdditionalInfo(patient.id)"
      >
        <div class="d-flex justify-space-between px-3 mb-2 ps-0">
          <!-- VIP Span will be shown only if patient.isVIP is true -->
          <div class="patientname">
            <span v-if="patient.isVIP" class="vip me-2">VIP</span>{{ patient.englishName }}
          </div>
          <div v-if="patient.comingAppointment" class="d-flex justify-end appointment">
            Appointment
            <span class="comingAppointment ms-2 rounded px-2">{{ patient.comingAppointment }}</span>
          </div>
        </div>

        <!-- Labels in one row, values in the next row -->
        <div class="info-block px-3">
          <div class="info-row mb-0">
            <div class="info-label">Sex</div>
            <div class="info-label">Date of Birth</div>
            <div class="info-label">HkID/ Document No.</div>
            <div class="info-label">Contact No.</div>
          </div>
          <div class="info-row mb-0">
            <div class="info-value">{{ patient.sex }}</div>
            <div class="info-value">{{ new Date(patient.dateOfBirth).toLocaleDateString() }}</div>
            <div class="info-value">{{ patient.documentNumber }}</div>
            <div class="info-value">{{ patient.mobileCountryCodeDescription }} {{ patient.mobileNumber }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Patient Details will only show if selectedPatientDetails is set and patients array is not empty -->
    <div v-if="selectedPatientDetails && patients.length > 0" class="col-3 pt-0 ps-0" style="background-color: #F9F9F9;">
      <patient-details :details="selectedPatientDetails" />
    </div>
  </div>
</template>


<script>
import PatientDetails from 'components/App/PatientDetails.vue';
import patientService from 'services/Patient.js'; // Import patient service

export default {
  components: {
    'patient-details': PatientDetails,
  },
  props: {
    patients: {
      type: Array,
      default: function () {
        return []; // Default value for patients prop as an empty array
      },
    },
  },
  data() {
    return {
      selectedPatientDetails: null, // To store additional patient info
    };
  },
    watch: {
    // Watch for changes in patients array to reset selectedPatientDetails if array is empty
    patients(newPatients) {
      if (newPatients.length === 0) {
        this.selectedPatientDetails = null; // Reset if there are no patients
      }
    },
  },
  methods: {
    async fetchAdditionalInfo(id) {
      try {
        const additionalInfo = await patientService.getAdditionalInfo(id); // Use patientService here
        this.selectedPatientDetails = additionalInfo; // Pass the data to the PatientDetails component
      } catch (error) {
        console.error('Error fetching additional patient information:', error);
        this.selectedPatientDetails = null; // Clear selected details on error
      }
    },
  },

};
</script>
