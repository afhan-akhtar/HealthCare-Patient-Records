<template>
  <div class="pa-4">
    I am waiting list
  </div>
</template>

<script>

const patientService = require('services/Patient.js')

export default {
  data() {
    return {
      items: [],
      total: 0,
      options: {
      },
    };
  },
  mounted() {
  },
  computed: {
  },
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

<style></style>