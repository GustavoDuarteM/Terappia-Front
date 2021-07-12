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
      <FormSessison
        form_title="Editar Sessão"
        btn_title="editar"
        :session="session"
        :update_list="update_list"
      />
      <v-btn class="ml-2" color="error" @click="remove_session">
        Remover
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FormSessison from "../components/form_session.vue";
export default {
  components: {
    FormSessison,
  },
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
      return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    format_session_date: function (date) {
      return date.toLocaleDateString("pt-BR");
    },
    remove_session: function () {
      this.$http.auth
        .delete("/sessions/" + this.session.id.toString())
        .then(() => {
          this.update_list();
        })
    },
  },
};
</script>

<style>
</style>