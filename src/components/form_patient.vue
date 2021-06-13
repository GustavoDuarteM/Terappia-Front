<template>
  <v-dialog v-model="dialog" persistent width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="btn_color"
        :outlined="btn_outlined == 'true'"
        v-bind="attrs"
        v-on="on"
      >
        {{ btn_title }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ form_title }}</span>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Nome" required v-model="name"></v-text-field>
        <v-text-field label="Email" required v-model="email"></v-text-field>
        <v-text-field label="Telefone" required v-model="phone"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Fechar
        </v-btn>
        <v-btn color="blue darken-1" text @click="save_patient"> Salvar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    btn_title: {
      required: true,
    },
    btn_color: {
      type: String,
      default: "primary",
    },
    btn_outlined: {
      type: String,
      default: "false",
    },
    patient: {
      default: "",
    },
    update_list: {
      required: true,
    },
    form_title: {
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    name: "",
    email: "",
    phone: "",
  }),
  methods: {
    save_patient: function () {
      if (this.patient) {
        this.update_patient();
      } else {
        this.new_patient();
      }
    },
    new_patient: function () {
      const params = {
        patient: { name: this.name, email: this.email, phone: this.phone },
      };
      this.$http.auth
        .post("/patients", params)
        .then(() => {
          this.dialog = false;
          this.name = "";
          this.email = "";
          this.phone = "";
          this.update_list();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update_patient() {
      const params = {
        patient: {
          id: this.patient.id,
          name: this.name,
          email: this.email,
          phone: this.phone,
        },
      };
      this.$http.auth
        .put("/patients", params)
        .then(() => {
          this.dialog = false;
          this.update_list();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    init_patient: function () {
      if (this.patient) {
        this.name = this.patient.name;
        this.email = this.patient.email;
        this.phone = this.patient.phone;
      }
    },
  },
  beforeMount() {
    this.init_patient();
  },
  beforeDestroy() {
    this.name = "";
    this.email = "";
    this.phone = "";
  },
};
</script>

<style>
</style>