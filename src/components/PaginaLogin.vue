<template>
   
  <v-container>
    <div class="text-h4">Login

    <v-form @submit.prevent="login">
      <v-text-field v-model="username" label="Usuario"></v-text-field>
      <v-text-field v-model="password" label="Contraseña" type="password"></v-text-field>
      <v-btn type="submit">Iniciar sesión</v-btn>
    </v-form>
</div>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      
      console.log('Usuario:', this.username);
      console.log('Contraseña:', this.password);
    },
  },
};
</script>