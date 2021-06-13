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
      <v-btn depressed color="primary"> Editar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
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