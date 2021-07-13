<template>
  <v-card outlined class="d-flex justify-space-between align-center">
    <div>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2"> mdi-account </v-icon>
        <span>
        {{ session.patient.name }}
        </span>
      </v-card-title>
      
      <v-card-text class="d-flex align-center">
        <v-icon class="mr-2"> mdi-calendar </v-icon>
        <span>
          {{ format_session_date(session.start) }} às
          {{ format_session_time(session.start) }} até
          {{ format_session_time(session.end) }}
        </span>
      </v-card-text>
    </div>
    <div>
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
    </div>
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
      let today = new Date(Date.now());
      const locate_today = today.toLocaleDateString("pt-BR");
      let tomorrow = new Date(today.setDate(today.getDate() + 1));
      const locate_tomorrow = tomorrow.toLocaleDateString("pt-BR");
      const meses = [
        "Janeiro",
        "Favereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      let message = "";
      switch (date.toLocaleDateString("pt-BR")) {
        case locate_today:
          message = "Hoje";
          break;
        case locate_tomorrow:
          message = "Amanha";
          break;
        default:
          message = `Dia ${date.getDate()} de ${meses[date.getMonth()]}`;
          break;
      }
      return message;
    },
    remove_session: function () {
      this.$http.auth
        .delete("/sessions/" + this.session.id.toString())
        .then(() => {
          this.update_list();
        });
    },
  },
};
</script>

<style>
</style>