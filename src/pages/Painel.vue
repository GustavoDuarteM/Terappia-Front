<template>
  <div>
    <div v-for="session in sessions" :key="session.id">
      <SessionCard
        :session="session"
        class="ma-2"
        :update_list="get_sessions"
      />
    </div>
  </div>
</template>

<script>
import SessionCard from "../components/session_card.vue";
export default {
  components: {
    SessionCard,
  },
  data: () => ({
    sessions: []
  }),
  methods: {
    get_sessions: function () {
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