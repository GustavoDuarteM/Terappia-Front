<template>
  <v-toolbar  dense >
      <v-btn text plain to='/'>
        <v-toolbar-title >Terappia</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <template v-if=autenticated>
        <Menu/>
      </template >
  </v-toolbar>
</template>

<script>
import Menu from './autenticated_user_menu'
export default {
components: {
    Menu
  },
  computed:{
    autenticated: function(){
      return this.$store.getters.user_authenticated
    }
  }
}
</script>

<style>

</style>