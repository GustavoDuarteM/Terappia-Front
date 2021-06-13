<template>
  <div>
    <div v-for="patient in patients" :key="patient.id">
      <PatientCard
        :patient="patient"
        class="ma-2"
        :update_list="get_patients"
      />
    </div>
  </div>
</template>

<script>
import PatientCard from "../components/patient_card.vue";
export default {
  components: {
    PatientCard,
  },
  data: () => ({
    patients: [],
  }),
  methods: {
    get_patients: function () {
      this.$http.auth
        .get("/patients")
        .then((response) => {
          this.patients = response.data.patients;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.get_patients();
  },
};
</script>

<style>
</style>