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
      <v-container v-if="selectedPatientDetails" class="small-font">
        <div>
          <!-- Buttons Section -->
          <v-row class="mt-0" justify="start">
            <v-col class="pt-0">
              <v-btn   color="new" class="rounded-xl create-btn" @click="viewPatientDetails">
                <v-img src="js/assets/icons/Picture12.svg" alt="Patient Details Icon" max-width="20" class="mr-2" />
                Patient Details
              </v-btn>
            </v-col>
            <v-col class="pt-0">
              <v-btn color="new" class="rounded-xl create-btn">
                <v-img src="js/assets/icons/Picture13.svg" alt="Take Attendance Icon" max-width="20" class="mr-2" />
                Take Attendance
              </v-btn>
            </v-col>
          </v-row>

          <!-- Membership Id Section -->
          <v-row class="mt-0 justify-space-between" align="center">
            <v-col cols="auto">
              <div style="font-size: 16px; color:#4080DF">Membership ID</div>
            </v-col>
            <v-col class="d-flex justify-end">
              <div>{{ selectedPatientDetails.membershipID }} </div>
            </v-col>
          </v-row>

          <!-- Single Main Border Section -->
          <div class="main-border rounded-lg pt-0">
            <!-- Row for Class -->
            <v-row class="mt-0">
              <v-col class="d-flex" style="width: 50%;">
                <div>Class</div>
              </v-col>
              <v-col class="d-flex" style="width: 50%;">
                <div class="green-box">{{ selectedPatientDetails.class }} </div>
              </v-col>
            </v-row>

            <!-- Row for Points Remain -->
            <v-row class="mt-0">
              <v-col class="d-flex" style="width: 50%;">
                <div>Points Remain</div>
              </v-col>
              <v-col class="d-flex" style="width: 50%;">
                <div>{{ selectedPatientDetails.pointsRemain }} </div>
              </v-col>
            </v-row>

            <!-- Row for Expiry Date -->
            <v-row class="mt-0">
              <v-col class="d-flex" style="width: 50%;">
                <div>Expiry Date</div>
              </v-col>
              <v-col class="d-flex" style="width: 50%;">
                <div>{{ new Date(selectedPatientDetails.expiredDate).toLocaleDateString() }}</div>
              </v-col>
            </v-row>
          </div>

          <!-- Prepaid Item -->
          <v-row class="mt-0 justify-space-between" align="center">
            <v-col cols="auto">
              <div style="font-size: 16px; color:#4080DF">Prepaid item</div>
            </v-col>
            <v-col class="d-flex justify-end">
              <div>{{ selectedPatientDetails.prepaidItems.length }}</div>
            </v-col>
          </v-row>

          <v-row class="mt-0 justify-space-between" align="center">
            <v-col cols="auto">
              <div style="color:#8B8B8B">Item name</div>
            </v-col>
            <v-col class="d-flex justify-center">
              <div style="color:#8B8B8B">Invoice No</div>
            </v-col>
          </v-row>

          <!-- Loop through prepaidItems -->
          <div v-for="(item, index) in selectedPatientDetails.prepaidItems" :key="index" class="main-border rounded-lg pt-0 mb-2">
            <v-row class="mt-0">
              <v-col class="d-flex" style="width: 50%;">
                <div>{{ item.itemName }}</div>
              </v-col>
              <v-col class="d-flex" style="width: 50%;">
                <div class="green-box">{{ item.invoiceNo }}</div>
              </v-col>
            </v-row>
          </div>

          <!-- No of visit -->
          <v-row class="mt-0 justify-space-between" align="center">
            <v-col cols="auto">
              <div style="font-size: 16px; color:#4080DF">No. of visit</div>
            </v-col>
            <v-col class="d-flex justify-end">
              <div>{{ selectedPatientDetails.numberOfVisits.length }}</div>
            </v-col>
          </v-row>

          <!-- Loop through numberOfVisits -->
          <div v-for="(visit, index) in selectedPatientDetails.numberOfVisits" :key="index" class="main-border rounded-lg pt-0 mb-2">
            <v-row class="mt-0">
              <v-col class="d-flex" style="width: 50%; align-items: start;">
                <div>Last Plan/ items</div>
              </v-col>
              <v-col class="d-flex" style="width: 50%;">
                <div class="green-box">{{ visit.itemNames.join(', ') }}</div>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col class="d-flex" style="width: 50%;">
                <div>Invoice No</div>
              </v-col>
              <v-col class="d-flex" style="width: 50%;">
                <div class="green-box">{{ visit.invoiceNo }}</div>
              </v-col>
            </v-row>
          </div>

          <!-- Next Appointment -->
          <v-row class="mt-0 justify-space-between" align="center">
            <v-col cols="auto">
              <div style="font-size: 16px; color:#4080DF">Next Appointment</div>
            </v-col>
            <v-col class="d-flex justify-end">
              <div>{{ selectedPatientDetails.nextAppointments.length }}</div>
            </v-col>
          </v-row>

          <!-- Loop through nextAppointments -->
          <div v-for="(appointment, index) in selectedPatientDetails.nextAppointments" :key="index" class="main-border rounded-lg pt-0 mb-2">
            <v-row class="mt-0">
              <v-col class="d-flex" style="width: 50%;">
                <div>Date Time</div>
              </v-col>
              <v-col class="d-flex" style="width: 50%;">
                <div class="green-box">{{ new Date(appointment.appointmentAt).toLocaleString() }}</div>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col class="d-flex" style="width: 50%;">
                <div>Plan/ Items</div>
              </v-col>
              <v-col class="d-flex" style="width: 50%;">
                <div class="green-box">{{ appointment.itemNames.join(', ') }}</div>
              </v-col>
            </v-row>
            <v-btn class="mt-2  schedule" color="new rounded-xl">View Schedule</v-btn>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import patientService from 'services/Patient.js';

export default {
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
      selectedPatientId: null, // To store the selected patient ID
    };
  },
  methods: {
    async fetchAdditionalInfo(id) {
      try {
        const additionalInfo = await patientService.getAdditionalInfo(id); // Fetch additional info
        this.selectedPatientDetails = additionalInfo; // Set the patient details
        this.selectedPatientId = id; // Store the selected patient's ID
      } catch (error) {
        console.error('Error fetching additional patient information:', error);
        this.selectedPatientDetails = null; // Clear details on error
        this.selectedPatientId = null; // Clear the ID on error
      }
    },
    viewPatientDetails() {
      if (this.selectedPatientId) {
        this.$emit('view-patient-details', this.selectedPatientId); // Emit the ID when "Patient Details" button is clicked
      }
    },
  },
};
</script>
