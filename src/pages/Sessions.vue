<template>
  <div>
    <v-card class="ma-3">
      <v-card-title>
        Sessões Agendadas
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
    FormSessison
  },
  data: () => ({
    sessions: '',
  }),
  methods: {
    get_sessions: function () {
      this.sessions = '';
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
  },
  beforeMount() {
    this.get_sessions();
  },
};
</script>

<style>
</style>