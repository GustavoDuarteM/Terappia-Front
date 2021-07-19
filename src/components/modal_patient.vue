<template>
  <div>
    <v-dialog v-model="dialog" width="50%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text @click="get_patient">
          {{ name }}
        </v-btn>
      </template>

      <v-card>
        <template v-if="patient">
          <v-card-title class="d-flex justify-center">
              {{ patient.name }}
          </v-card-title>
          <v-card-text class="d-flex justify-center">
            <div><v-icon> mdi-email </v-icon> {{ patient.email }}</div>
            <div>
              <v-icon class="ml-3"> mdi-phone </v-icon> {{ patient.phone }}
            </div>
          </v-card-text>
        </template>
        <template v-else>
          <div class="text-center ma-2 pa-2">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
    },
    patient_id: {
      required: true,
    },
  },
  data: () => ({
    patient: "",
    dialog: false,
  }),
  methods: {
    get_patient: function () {
      this.$http.auth.get(`/patients/${this.patient_id}`).then((response) => {
        this.patient = response.data.patient;
      });
    },
  },
};
</script>

<style>
</style>