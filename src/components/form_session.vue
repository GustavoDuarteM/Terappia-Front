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
        <v-select
          v-model="patient"
          :items="patients"
          item-text="name"
          item-value="id"
          label="Pacientes"
          single-line
        ></v-select>
        <v-datetime-picker v-model="start" date-format="dd/MM/yyyy">
          <template slot="dateIcon">
            <v-icon>mdi-calendar</v-icon>
          </template>
          <template slot="timeIcon">
            <v-icon> mdi-clock-outline </v-icon>
          </template>
        </v-datetime-picker>
        <v-datetime-picker v-model="end" date-format="dd/MM/yyyy">
          <template slot="dateIcon">
            <v-icon>mdi-calendar</v-icon>
          </template>
          <template slot="timeIcon">
            <v-icon> mdi-clock-outline </v-icon>
          </template>
        </v-datetime-picker>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Fechar
        </v-btn>
        <v-btn color="blue darken-1" text @click="save_session"> Salvar </v-btn>
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
    session: {
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
    patients: {},
    patient: "",
    start: "",
    end: "",
  }),
  methods: {
    save_session: function () {
      if (this.session) {
        this.update_session();
      } else {
        this.new_session();
      }
    },
    new_session: function () {
      const params = {
        session: {
          patient_id: this.patient,
          start: this.format_date_to_request(this.start),
          end: this.format_date_to_request(this.end),
        },
      };
      this.$http.auth
        .post("/sessions", params)
        .then(() => {
          this.clear_form();
          this.dialog = false;
          this.update_list();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update_session() {
      const params = {
        session: {
          id: this.session.id,
          patient_id: this.patient,
          start: this.format_date_to_request(this.start),
          end: this.format_date_to_request(this.end),
        },
      };
      this.$http.auth
        .put("/sessions", params)
        .then(() => {
          this.dialog = false;
          this.update_list();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    init_session: function () {
      if (this.session) {
        this.patient = this.session.patient_id;
        this.start = new Date(this.session.start);
        this.end = new Date(this.session.end);
      }
    },
    get_patients: function () {
      this.patients = "";
      this.$http.auth
        .get("/patients")
        .then((response) => {
          this.patients = response.data.patients;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    format_date_to_request: function (date) {
      return date.toISOString().slice(0, 16).replace("T", " ");
    },
    clear_form: function () {
      this.patients = {};
      this.patient = "";
      this.start = "";
      this.end = "";
    },
  },
  beforeMount() {
    this.get_patients();
    this.init_session();
  },
};
</script>

<style>
</style>