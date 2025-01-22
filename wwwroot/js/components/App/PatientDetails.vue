<template>
  <v-container class="small-font border-left">
    <!-- Buttons Section -->
    <v-row class="mt-0" justify="start">
      <v-col class="pt-0">
        <v-btn color="new rounded-xl create-btn">Patient Details</v-btn>
      </v-col>
      <v-col class="pt-0">
        <v-btn color="new rounded-xl create-btn">Take Attendance</v-btn>
      </v-col>
    </v-row>

    <!-- Membership Id Section -->
    <v-row class="mt-0 justify-space-between" align="center">
      <v-col cols="auto">
        <div>Membership ID</div>
      </v-col>
      <v-col class="d-flex justify-end">
        <div>#1234567</div>
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
          <div class="green-box">General</div>
        </v-col>
      </v-row>

      <!-- Row for Points Remain -->
      <v-row class="mt-0">
        <v-col class="d-flex" style="width: 50%;">
          <div>Points Remain</div>
        </v-col>
        <v-col class="d-flex" style="width: 50%;">
          <div>1234</div>
        </v-col>
      </v-row>

      <!-- Row for Expiry Date -->
      <v-row class="mt-0">
        <v-col class="d-flex" style="width: 50%;">
          <div>Expiry Date</div>
        </v-col>
        <v-col class="d-flex" style="width: 50%;">
          <div>01/01/2025</div>
        </v-col>
      </v-row>
    </div>

    <!-- Prepaid Item -->
    <v-row class="mt-0 justify-space-between" align="center">
      <v-col cols="auto">
        <div>Prepaid item</div>
      </v-col>
      <v-col class="d-flex justify-end">
        <div>2</div>
      </v-col>
    </v-row>

 
    <v-row class="mt-0 justify-space-between" align="center">
      <v-col cols="auto">
        <div>Item name</div>
      </v-col>
      <v-col class="d-flex justify-center">
        <div>Invoice No</div>
      </v-col>
    </v-row>

    <!-- Single Main Border Section -->
    <div class="main-border rounded-lg pt-0 mb-2">
      <!-- Row for Class -->
      <v-row class="mt-0">
        <v-col class="d-flex" style="width: 50%;">
          <div>HPV 9 in 1 Package</div>
        </v-col>
        <v-col class="d-flex" style="width: 50%;">
          <div class="green-box">#1241 1234</div>
        </v-col>
      </v-row>
    </div>
    <!-- Single Main Border Section -->
    <div class="main-border rounded-lg pt-0">
      <!-- Row for Class -->
      <v-row class="mt-0">
        <v-col class="d-flex" style="width: 50%;">
          <div>HPV 9 in 1 Package</div>
        </v-col>
        <v-col class="d-flex" style="width: 50%;">
          <div class="green-box">#1241 1234</div>
        </v-col>
      </v-row>
    </div>


    <!-- No of visit-->
    <v-row class="mt-0 justify-space-between" align="center">
      <v-col cols="auto">
        <div>No. of visit</div>
      </v-col>
      <v-col class="d-flex justify-end">
        <div>1</div>
      </v-col>
    </v-row>
    <div class="main-border rounded-lg pt-0 mb-2">
      <!-- Row for Class -->
      <v-row class="mt-0">
        <v-col class="d-flex" style="width: 50%;">
          <div>Last Plan/ items</div>
        </v-col>
        <v-col class="d-flex" style="width: 50%;">
          <div class="green-box">U12 Gold Diamond</div>
        </v-col>
      </v-row>
       <v-row class="mt-0">
        <v-col class="d-flex" style="width: 50%;">
          <div>Invoice No</div>
        </v-col>
        <v-col class="d-flex" style="width: 50%;">
          <div class="green-box">1234</div>
        </v-col>
      </v-row>
    </div>



    <!-- Next Appointment-->
    <v-row class="mt-0 justify-space-between" align="center">
      <v-col cols="auto">
        <div>Next Appointment</div>
      </v-col>
      <v-col class="d-flex justify-end">
        <div>2</div>
      </v-col>
    </v-row>
    <div class="main-border rounded-lg pt-0 mb-2">
      <!-- Row for Class -->
      <v-row class="mt-0">
        <v-col class="d-flex" style="width: 50%;">
          <div>Date Time</div>
        </v-col>
        <v-col class="d-flex" style="width: 50%;">
          <div class="green-box">01/03/2024 12:00</div>
        </v-col>
      </v-row>
       <v-row class="mt-0">
        <v-col class="d-flex" style="width: 50%;">
          <div>Plan/ Items</div>
        </v-col>
        <v-col class="d-flex" style="width: 50%;">
          <div class="green-box">U12 Gold</div>
          
        </v-col>
       
      </v-row>
       <buttom>View Schedule</buttom>
    </div>

     <div class="main-border rounded-lg pt-0 mb-2">
      <!-- Row for Class -->
      <v-row class="mt-0">
        <v-col class="d-flex" style="width: 50%;">
          <div>Date Time</div>
        </v-col>
        <v-col class="d-flex" style="width: 50%;">
          <div class="green-box">01/03/2024 12:00</div>
        </v-col>
      </v-row>
       <v-row class="mt-0">
        <v-col class="d-flex" style="width: 50%;">
          <div>Plan/ Items</div>
        </v-col>
        <v-col class="d-flex" style="width: 50%;">
          <div class="green-box">U12 Gold</div>
          
        </v-col>
       
      </v-row>
       <buttom>View Schedule</buttom>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'PatientDetails',
};
</script>

<style scoped>


</style>
