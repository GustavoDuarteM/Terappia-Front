<template>
  <div>
    <v-card class="ma-3">
      <v-card-title>
        Lista de Pacientes
        <v-spacer></v-spacer>
        <v-text-field
          label="Buscar Paciente"
          single-line
          append-icon="mdi-magnify"
          v-model="name"
        ></v-text-field>
        <v-spacer></v-spacer>
        <FormPatient
          form_title="Novo Paciente"
          btn_title="Adicionar Paciente"
          btn_color="green"
          btn_outlined="true"
          :update_list="get_patients"
        />
      </v-card-title>
    </v-card>
    <template v-if="patients">
      <div v-for="patient in patients" :key="patient.id">
        <PatientCard
          :patient="patient"
          class="ma-2"
          :update_list="get_patients"
        />
      </div>
    </template>
    <template v-else>
      <ListLoading />
    </template>
  </div>
</template>

<script>
import PatientCard from "../components/patient_card.vue";
import ListLoading from "../components/list_loading.vue";
import FormPatient from "../components/form_patient.vue";
export default {
  components: {
    PatientCard,
    ListLoading,
    FormPatient,
  },
  data: () => ({
    patients: "",
    name:""
  }),
  methods: {
    get_patients: function () {
      this.patients = "";
      this.$http.auth
        .get("/patients",{ params: {name: this.name}})
        .then((response) => {
          this.patients = response.data.patients;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch:{
    name(val){
      if(val.length > 3){
        this.patients = "";
        this.get_patients()
      }else if(val.length == 0){
        this.patients = "";
        this.get_patients()
      }
    }
  },
  beforeMount() {
    this.get_patients();
  },
};
</script>

<style>
</style>