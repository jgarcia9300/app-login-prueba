

<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <div class="text-h4">Login
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="username" label="Usuario"></v-text-field>
              <v-text-field v-model="password" label="Contraseña" type="password"></v-text-field>
              <v-btn type="submit" color="red-darken-4 white--text">Iniciar sesión</v-btn>
            </v-form>
          </v-card-text>
        </div>
        </v-card>
      </v-col>
    </v-row>
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
      // Aquí puedes implementar la lógica de autenticación
      // Por ejemplo, puedes hacer una llamada a una API para verificar las credenciales
      console.log('Usuario:', this.username);
      console.log('Contraseña:', this.password);
    },
  },
};
</script>

<style scoped>
.v-container {
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-card {
  padding: 2rem;
}

@media (max-width: 600px) {
  .v-card {
    width: 90%;
  }
}
</style>