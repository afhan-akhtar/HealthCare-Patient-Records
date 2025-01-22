<template>
  <div class="pa-4 pt-0 mt-2 full-container">
   
   
    <v-row class="pa-4 pt-0">
      <v-col cols="12">
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
  </div>
</template>

<script>
const patientService = require('services/Patient.js')

export default {
  data() {
    return {
      items: [],
      total: 0,
      options: {},
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async getPatients() {
      const response = await patientService.gets(this.options)
      const data = response.data
      this.items = data.items
      this.total = data.total
    },
  }
};
</script>

<style scoped>

</style> 
