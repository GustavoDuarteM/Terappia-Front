<template>
  <v-card outlined class="d-flex justify-space-between align-center">
    <div>
      <v-card-title class="d-flex align-center">
        {{ patient.name }}
      </v-card-title>
      <v-card-text class="d-flex align-center">
        <div><v-icon> mdi-email </v-icon> {{ patient.email }}</div>
        <div><v-icon class="ml-3"> mdi-phone </v-icon> {{ patient.phone }}</div>
      </v-card-text>
    </div>
    <v-card-actions>
      <FormPatient
        form_title="Editar Paciente"
        btn_title="editar"
        :update_list="update_list"
        :patient="patient"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import FormPatient from "../components/form_patient.vue";

export default {
  components: {
    FormPatient,
  },
  props: {
    patient: {
      required: true,
    },
    update_list: {
      required: true,
    },
  },
  methods: {},
};
</script>

<style>
</style>