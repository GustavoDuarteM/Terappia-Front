<template>
  <v-card outlined>
    <v-card-title>
      {{ session.patient.name }}
    </v-card-title>

    <v-card-subtitle>
      Dia: {{ format_session_date(session.start) }}
    </v-card-subtitle>

    <v-card-text>
      Hora: {{ format_session_time(session.start) }} -
      {{ format_session_time(session.end) }}
    </v-card-text>

    <v-card-actions>
      <v-btn depressed color="primary"> Editar </v-btn>
      <v-btn depressed color="error" @click="remove_session"> Remover </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    session: {
      required: true,
    },
    update_list: {
      required: true,
    },
  },
  methods: {
    format_session_time: function (date) {
      return date.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
    },
    format_session_date: function (date) {
      return date.toLocaleDateString('pt-BR');
    },
    remove_session: function () {
      this.$http.auth
        .delete("/sessions/" + this.session.id.toString())
        .then((response) => {
          this.update_list();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>