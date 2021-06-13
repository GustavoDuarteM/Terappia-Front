<template>
  <v-card outlined>
    <v-card-title>
      {{ patient.name }}
    </v-card-title>
    <v-card-subtitle>
      <div>Email: {{ patient.email }}</div>
      <div>Telefone: {{ patient.phone }}</div>
    </v-card-subtitle>

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