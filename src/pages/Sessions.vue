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
        <v-btn class="mx-5" dark color="teal" v-on:click="clean_search()"
          >Limpar</v-btn
        >
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
      <div>
        <div v-for="session in sessions" :key="session.id">
          <SessionCard
            :session="session"
            class="ma-2"
            :update_list="get_sessions"
          />
        </div>
      </div>
      <Paginator
        :set_page="set_page"
        :has_next="has_next"
        :has_prev="has_prev"
      />
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
import Paginator from "../components/paginator.vue";

export default {
  components: {
    SessionCard,
    ListLoading,
    FormSessison,
    Paginator,
  },
  data: () => ({
    sessions: "",
    date_menu: false,
    date_filter: null,
    calendar_date: new Date(Date.now()).toISOString().substr(0, 10),
    page: 1,
    has_next: false,
    has_prev: false,
  }),
  methods: {
    get_sessions: function () {
      this.sessions = "";
      let params = { page: this.page };
      if (this.date_filter) {
        params = { ...params, date: this.calendar_date };
      }
      this.$http.auth
        .get("/sessions", {
          params,
        })
        .then((response) => {
          this.has_next = response.data.has_next;
          this.has_prev = response.data.has_prev;
          this.sessions = response.data.sessions.map((session) => {
            session.end = new Date(session.end);
            session.start = new Date(session.start);
            return session;
          });
        })
    },
    formatDate: function (date) {
      let f_date = new Date(date);
      return f_date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    },
    clean_search: function () {
      this.get_sessions();
      this.date_menu = null;
      this.date_filter = null;
    },
    set_page: function (step) {
      switch (step) {
        case "next":
          this.page++;
          break;
        case "prev":
          if (this.page > 1) {
            this.page--;
          }
          break;
      }
      this.get_sessions();
    },
  },
  watch: {
    calendar_date: function (val) {
      this.date_filter = this.formatDate(val);
      this.calendar_date = new Date(val).toISOString().substr(0, 10);
    },
    date_filter: function (val) {
      this.date_filter = val;
      this.get_sessions();
    },
  },
  beforeMount() {
    this.get_sessions();
  },
};
</script>

<style>
</style>