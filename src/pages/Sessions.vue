<template>
  <div>
    <v-card class="ma-3">
      <v-card-title>
        Sessões Agendadas
        <v-spacer></v-spacer>
        <v-menu
          ref="date_menu"
          v-model="date_menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date_filter"
              label="Data da sessão"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="calendar_date"
            no-title
            @input="date_menu = false"
          ></v-date-picker>
          
        </v-menu>
        <v-btn class="mx-5" dark color="teal" v-on:click=clean_search()>Limpar</v-btn>
        <v-spacer></v-spacer>
        <FormSessison
          form_title="Nova Sessão"
          btn_title="Adicionar Sessão"
          btn_color="green"
          btn_outlined="true"
          :update_list="get_sessions"
        />
      </v-card-title>
    </v-card>
    <template v-if="sessions">
      <div v-for="session in sessions" :key="session.id">
        <SessionCard
          :session="session"
          class="ma-2"
          :update_list="get_sessions"
        />
      </div>
    </template>
    <template v-else>
      <ListLoading />
    </template>
  </div>
</template>

<script>
import SessionCard from "../components/session_card.vue";
import ListLoading from "../components/list_loading.vue";
import FormSessison from "../components/form_session.vue";
export default {
  components: {
    SessionCard,
    ListLoading,
    FormSessison,
  },
  data: () => ({
    sessions: "",
    date_menu: false,
    date_filter: null,
    calendar_date: new Date(Date.now()).toISOString().substr(0, 10),
  }),
  methods: {
    get_sessions: function () {
      this.sessions = "";
      this.$http.auth
        .get("/sessions")
        .then((response) => {
          this.sessions = response.data.sessions.map((session) => {
            session.end = new Date(session.end);
            session.start = new Date(session.start);
            return session;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_sessions_with_params: function () {
      this.sessions = "";
      this.$http.auth
        .get("/sessions", {
          params: { date: this.calendar_date },
        })
        .then((response) => {
          this.sessions = response.data.sessions.map((session) => {
            session.end = new Date(session.end);
            session.start = new Date(session.start);
            return session;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate: function (date) {
      let f_date = new Date(date);
      return f_date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    },
    clean_search: function(){
      this.get_sessions()
      this.date_menu = null
      this.date_filter = null
    }
  },
  watch: {
    calendar_date: function (val) {
      this.date_filter = this.formatDate(val);
      this.calendar_date = new Date(val).toISOString().substr(0, 10);
    },
    date_filter: function (val) {
      this.date_filter = val;
      this.get_sessions_with_params();
    },
  },
  beforeMount() {
    this.get_sessions();
  },
};
</script>

<style>
</style>