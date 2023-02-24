<!-- //interfaz -->
<template>

<v-app>
  <RouterView/>
  

  <v-toolbar app dark 
  color="red-darken-4 white--text" 
  density="compact">
      
  <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        class="mx-2"
        src="@/assets/uvlogo.png"
        max-height="250"
        max-width="200"
        contain
      ></v-img>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title >Notisalud</v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn variant="outlined">Acceder</v-btn>
    </v-toolbar>

    

    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list>
        <h3> Coming soon</h3>
      </v-list> 
    </v-navigation-drawer>

  <v-main>
  
  <v-content>
    
    <div id="app">
    <v-btn  variant="outlined" v-on:click="fetch">Consultar</v-btn>
    
    <div v-for="nota of notas" v-bind:key="nota.id">
          {{ nota }}
        </div>
      </div>
  
  </v-content>
</v-main>
  

</v-app>
</template>


<!-- // metodos -->

<script>
// librerias



export default {
  name: 'App',
  data: function (){
      return{
        drawer: false,
        notas: []

      };
  },

  methods:{
    fetch(){
      var axios = require("axios");

    const axiosInstance = axios.create({
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });

    axiosInstance
      .get("https://notisalud-api.herokuapp.com/api/notas")
      .then(res => {
        this.notas = res.data;
      })
      .catch(err => {
      console.log(err);
    })


      // axios
      // .get("https://notisalud-3r6s9b3vm-wilmerwave.vercel.app")
      // .then(res => {
      //     this.notas = res.data.results;
      //     console.log(res.data);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
      
    }
  }
};


</script>

<style>

</style>

