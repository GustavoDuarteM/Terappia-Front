<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            required
            :type="show1 ? 'text' : 'password'"
            name="Password"
            label="Pasword"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn color="success" class="mr-4" @click="signin" :loading="loading">
        Acessar
      </v-btn>
    </v-form>
  </div>
</template>

<script setup>
export default {
  data: () => ({
    valid: true,
    loading: false,
    email: "duarte@email.com",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
    password: "123456",
  }),
  methods: {
    signin() {
      this.loading = true;
      const user = { user: { email: this.email, password: this.password } }
      this.$http.main
        .post("/sign_in", user)
        .then((response) => {
          this.$store.commit('authenticate',{ jwt_auth: response.data.access_token, jwt_refresh: response.data.refresh_token })
          if (this.$store.getters.user_authenticated){
            console.log(this.$store.state.jwt_auth)
            this.$router.push({ path: '/painel' }) 
          }
          this.loading = false;
          })
        .catch((error) =>{
           console.log(error)
           this.loading = false;
          });
    },
  },
};
</script>

<style>
</style>