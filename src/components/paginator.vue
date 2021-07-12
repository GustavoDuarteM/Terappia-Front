<template>
  <v-toolbar dense >
    <v-btn class="ma-2" @click="set_page('prev')" :disabled="!has_prev">
      <v-icon > mdi-arrow-left </v-icon>
      Anterior
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn class="ma-2" @click="set_page('next')" :disabled="!has_next">
      <v-icon> mdi-arrow-right </v-icon>
      Próximo
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    set_page:{
      type: Function,
      required: true,
    },
    has_next:{
      type: Boolean
    },
    has_prev:{
      type: Boolean
    }
  }
};
</script>

<style>
</style>