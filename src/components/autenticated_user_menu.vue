<template>
  <div>
    <v-btn class="mx-1" color="primary" to="/patients">Pacientes</v-btn>
    <v-btn class="mx-1" color="primary" to="/sessions">Sessoes</v-btn>
    <v-btn icon @click="sign_out">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    sign_out: function () {
      this.$http.auth.delete("/sign_out").then(() => {
        this.$store.commit("clear_auth");
        this.$router.push({ path: "/" });
      });
    },
  },
};
</script>

<style>
</style>