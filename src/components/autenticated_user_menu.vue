<template>
  <div>
    <v-btn class="mx-1" color="primary">Pacientes</v-btn>
    <v-btn class="mx-1" color="primary">Sessoes</v-btn>
    <v-btn icon @click="sign_out">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods:{
    sign_out:function(){
    this.$http.main
      .delete("/sign_out", {
        headers:{
          'Authorization': `Bearer ${this.$store.getters.auth_token}`
        }
      }).then(() => {
        this.$store.commit('clear_auth')
        this.$router.push({ path: '/' }) 
      })
    }
  }
};
</script>

<style>
</style>