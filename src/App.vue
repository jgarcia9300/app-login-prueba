<!-- //interfaz -->
<template>

<v-app>
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


  <v-content>
    <v-btn  variant="outlined" v-on:click="fetch">Consultar</v-btn>
    <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        sm="4"
      >
      
        <div v-for="nota of notas" v-bind:key="nota.id">
          {{ nota }}
          <v-card>
        <v-img>
      </v-img>
      <v-card-title>
      </v-card-title>
      
    </v-card>
  </div>
    </v-col>
    </v-row>
  
     </v-container>
    
  </v-content>
  

</v-app>
</template>


<!-- // metodos -->

<script>
// librerias
//import axios from "axios";


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
      .then(response => {
        console.log(response);
      })
      .catch(e => console.log(e));


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

