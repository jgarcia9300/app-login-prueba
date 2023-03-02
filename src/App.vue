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
      <v-toolbar-title >Noticias Facultad de Salud</v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn variant="outlined">Acceder</v-btn>
    </v-toolbar>

    
  <v-parallax
    height="100"
    src="https://scontent.fclo2-2.fna.fbcdn.net/v/t39.30808-6/305396410_507464941383752_7038400473176434653_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=j1pVJ9_V3VgAX8f37DO&_nc_ht=scontent.fclo2-2.fna&oh=00_AfBFvpbfqRSa8yUf1rKUO-i7NrQSHgH-Jg_iVRl07f264A&oe=6402CC59"
  >
  <div class="d-flex flex-column fill-height justify-center align-center text-white">
      <h1 class="text-h4 font-weight-thin mb-4">
        Bienvenidos
      </h1>
     
    </div>
</v-parallax>

    

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

    <v-container class="mb-6">
      <v-row >
        <v-col>
    <div  v-for="nota of notas" v-bind:key="nota.id">
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
      </v-card>
      </div>
        </v-col>

      </v-row>

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
      .get("https://notisalud-api-production.up.railway.app/api/notas")
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

