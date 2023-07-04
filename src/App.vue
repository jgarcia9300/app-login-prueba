<!-- //interfaz -->
<template>

<v-app>

  <v-carousel height="auto" hide-delimiters>
  <v-carousel-item
    src="@/assets/banner1.png"
    cover
  ></v-carousel-item>

</v-carousel>
    


  <v-main>
    
  
  <!-- <div class="d-flex justify-center mb-6 ">
      <v-sheet
        v-for="n in 1"
        :key=n
        class="ma-2 pa-2"
      >
      <v-text-field
      label="Buscar"
      hide-details="auto"
    ></v-text-field>

    <v-btn variant="outlined" v-on:click="fetch">Consultar</v-btn>
  </v-sheet>

  
  </div> -->
<div></div>
<v-banner
      lines="one"
      icon="mdi-newspaper"
      color="white"
      class="my-4"
    >
      <v-banner-text>
        Aqui recibirás las ultimas notas y noticias relacionadas con la Facultad de Salud de la Universidad del Valle
      </v-banner-text>

      
    </v-banner>

  <v-container  fluid>
    <div class="text-center">
    
        <v-row >
        <v-col cols="12" sm="3" md="4"  v-for="nota of notas" :key="nota.id" >
          <v-card  class="mx-auto" max-width="600" height="100%">
        <v-img
        class="align-end text-white"
         height="200"
          :src="nota.imagen"
          cover>

        <v-card-title >
      <p>{{ nota.nombrenota }}</p>
       </v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        <h5>{{ nota.autor }}</h5>
      </v-card-subtitle>
  

       <v-card-actions>
      <v-btn :href= "nota.enlace" color="red" target="_blank">
        Saber mas
        
      </v-btn>
      
      </v-card-actions>
      
      </v-card>
       

      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="2"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </div>
  </v-container>

  
  
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
        
        notas: []

      };
  },

  created(){
    this.fetch()
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
        //"https://notisalud-api.up.railway.app/api/notas")
        "http://localhost:9000/api/notas")
      
      
      .then(res => {
        this.notas = res.data;
        console.log(res.data.info)
        console.log(res.data)
      })
      .catch(err => {
      console.log(err);
    })

    },
    
  }

};
</script>

<style >
  .v-banner{
    background: #808080
  }
  .v-banner-text{
    color: #FFFFFF
  }
</style>

