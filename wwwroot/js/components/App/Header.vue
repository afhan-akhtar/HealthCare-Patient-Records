<template>
  <v-navigation-drawer
    permanent
    app
    value="false"
    class="pa-0 container-fluid-max"
    :mini-variant="isMini"
    :style="{
      width: isMini ? '80px' : '225px',
      transition: 'width 0.3s ease-in-out, padding 0.3s ease-in-out'
    }"
  >
    <v-col
      class="pe-5 pt-3 d-flex flex-column align-center"
      style="height: 90%; justify-content: space-between;"
    >
      <!-- Logo Section -->
      <div class="logo-container text-center">
        <img v-if="!isMini" src="/js/assets/icons/tabnext-logo.svg" alt="Logo" />
      </div>

      <div class="logo-container text-center pt-2">
        <img v-if="isMini" src="js/assets/icons/collapsible icon.png" />
      </div>

    <!-- Menu Buttons -->
<div class="d-flex flex-column align-start w-100">
  <v-btn
    :outlined="!isMini"
    color="#2096F3"
    class="mb-2 rounded d-flex align-center justify-start"
    :style="{
      backgroundColor: isMini ? 'white' : '',
      boxShadow: isMini ? 'none' : '',
      border: isMini ? 'none' : '2px solid #2096F3'
    }"
    @click="toggleSidebar"
  >
    <img
      src="js/assets/icons/Picture1.svg"
      alt="Menu Icon"
      style="width: 20px; height: 20px; margin-right: 10px;"
    />
    <span v-if="!isMini" class="text-truncate">Collapse Menu</span>
  </v-btn>



       <v-btn
  class="mb-2 rounded-xl shadow-none d-flex align-center justify-start"
  style="width: 100%;"
  :style="isMini ? { backgroundColor: 'white', boxShadow: 'none' } : {}"
>
  <img
    src="js/assets/icons/Picture9.svg"
    alt="Menu Icon"
    style="width: 20px; height: 20px; margin-right: 10px;"
  />
  <span v-if="!isMini" class="text-truncate" style="color: #2096F3;">
    Waiting List
  </span>
</v-btn>

      </div>

      <div class="flex-grow-1"></div>

      <!-- Footer Section -->
      <v-footer class="pa-0" padless>
        <v-row class="d-flex flex-column align-start w-100" no-gutters>
          <v-col>
            <v-btn
              block
              icon
              class="d-flex align-center justify-start rounded-xl pa-3 mb-2"
              :style="isMini ? { border: 'none' } : { border: '2px solid #ec6161' }"
              @click="goToMessages"
            >
              <img
                src="js/assets/icons/Picture8.png"
                alt="Menu Icon"
                style="width: 20px; height: 20px; margin-right: 10px;"
              />
              <span v-if="!isMini" class="text-truncate">Messages</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              block
              icon
              class="d-flex align-center justify-start pa-3 users"
              :style="isMini ? { border: 'none' } : {}"
              @click="goToUsers"
            >
              <img
                src="js/assets/icons/Picture4.png"
                alt="Menu Icon"
                style="width: 20px; height: 20px; margin-right: 10px;"
              />
              <span v-if="!isMini" class="text-truncate" style="color: #2096F3;">Users</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              block
              icon
              class="d-flex align-center justify-start pa-3 users"
              :style="isMini ? { border: 'none' } : {}"
              @click="signOut"
            >
              <img
                src="js/assets/icons/Picture3.png"
                alt="Menu Icon"
                style="width: 20px; height: 20px; margin-right: 10px;"
              />
              <span v-if="!isMini" class="text-truncate">Sign Out</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-footer>
    </v-col>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      isMini: false, 
    };
  },
  mounted() {
    this.checkScreenSize(); 
    window.addEventListener("resize", this.checkScreenSize); 
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    toggleSidebar() {
      this.isMini = !this.isMini; 
    },
  },
};
</script>

<style scoped>
</style>
