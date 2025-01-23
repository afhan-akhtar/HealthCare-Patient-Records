<template>
  <v-container v-if="details" class="small-font">
    <div>
      <!-- Buttons Section -->
     <v-row class="mt-0" justify="start">
  <v-col class="pt-0">
    <v-btn color="new" class="rounded-xl create-btn">
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
          <div>{{ details.membershipID }} </div>
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
            <div class="green-box">{{ details.class }} </div>
          </v-col>
        </v-row>

        <!-- Row for Points Remain -->
        <v-row class="mt-0">
          <v-col class="d-flex" style="width: 50%;">
            <div>Points Remain</div>
          </v-col>
          <v-col class="d-flex" style="width: 50%;">
            <div>{{ details.pointsRemain }} </div>
          </v-col>
        </v-row>

        <!-- Row for Expiry Date -->
        <v-row class="mt-0">
          <v-col class="d-flex" style="width: 50%;">
            <div>Expiry Date</div>
          </v-col>
          <v-col class="d-flex" style="width: 50%;">
            <div>{{ new Date(details.expiredDate).toLocaleDateString() }}</div>
          </v-col>
        </v-row>
      </div>

      <!-- Prepaid Item -->
      <v-row class="mt-0 justify-space-between" align="center">
        <v-col cols="auto">
          <div style="font-size: 16px; color:#4080DF">Prepaid item</div>
        </v-col>
        <v-col class="d-flex justify-end">
          <div>{{ details.prepaidItems.length }}</div>
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
      <div v-for="(item, index) in details.prepaidItems" :key="index" class="main-border rounded-lg pt-0 mb-2">
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
          <div>{{ details.numberOfVisits.length }}</div>
        </v-col>
      </v-row>

      <!-- Loop through numberOfVisits -->
      <div v-for="(visit, index) in details.numberOfVisits" :key="index" class="main-border rounded-lg pt-0 mb-2">
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
          <div>{{ details.nextAppointments.length }}</div>
        </v-col>
      </v-row>

      <!-- Loop through nextAppointments -->
      <div v-for="(appointment, index) in details.nextAppointments" :key="index" class="main-border rounded-lg pt-0 mb-2">
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
</template>

<script>
export default {
  name: 'PatientDetails',
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>
