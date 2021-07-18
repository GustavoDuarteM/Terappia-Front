<template>
  <v-app>
    <v-main>
      <NavBar/>
      <Container>
        <router-view/>
      </Container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/navbar.vue'
import Container from './components/container.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Container
  }
};
</script>
