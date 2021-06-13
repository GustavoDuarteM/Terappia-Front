<template>
  <div>
    <v-card class="ma-3">
      <v-card-title>
        Sessões de Hoje
        <v-spacer></v-spacer>
        {{ today.toLocaleDateString("pt-BR") }}
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
export default {
  components: {
    SessionCard,
    ListLoading
  },
  data: () => ({
    sessions: '',
  }),
  methods: {
    get_sessions: function () {
      this.sessions = '';
      this.$http.auth
        .get("/sessions", {
          params: { date: this.today.toISOString().slice(0, 10) },
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
  },
  computed: {
    today: function () {
      return new Date(Date.now());
    },
  },
  beforeMount() {
    this.get_sessions();
  },
};
</script>

<style>
</style>