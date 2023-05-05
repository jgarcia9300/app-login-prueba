<!-- //interfaz -->
<template>

<v-app>

  <v-carousel height="auto" hide-delimiters>
  <v-carousel-item
    src="https://planeacion.univalle.edu.co/images/httpsplaneacionunivalleeduco.png"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
    cover
  ></v-carousel-item>
</v-carousel>
    
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list>
        <h3> Coming soon</h3>
      </v-list> 
    </v-navigation-drawer>

  <v-main>
    
  <v-content>
    <div class="d-flex justify-center mb-6 ">
      <v-sheet
        v-for="n in 1"
        :key="n"
        class="ma-2 pa-2"
      >
    <v-btn variant="outlined" v-on:click="fetch">Consultar</v-btn>
      <v-autocomplete
    label="Buscar">
    </v-autocomplete>
  </v-sheet>
  </div>

  <v-container grid-list-md>
    <v-layout row wrap>

      
    <div  v-for="nota of notas" v-bind:key="nota.id">
      <v-flex d-flex xs12 sm6 md4>
      <v-card class="mx-auto" max-width="400">
        <v-img
        class="align-end text-white"
         height="200"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover>

        <v-card-title >
      <h5>{{ nota.nombrenota }}</h5>
       </v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        <h5>{{ nota.autor }}</h5>
      </v-card-subtitle>
  

       <v-card-actions>
      <v-btn color="red">
        Saber mas
      </v-btn>
      </v-card-actions>
      
      </v-card>
    </v-flex>
      </div>
    
    
    </v-layout>
    </v-container>
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
      .get(
        "https://notisalud-api.up.railway.app/api/notas")
        //"http://localhost:9000/api/notas")
      
      
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

