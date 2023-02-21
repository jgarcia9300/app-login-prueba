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
      
        <div v-for="character of characters" v-bind:key="character.id">
          <v-card>
        <v-img>
      </v-img>
      <v-card-title>
      </v-card-title>
      {{ character }}
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
import axios from "axios";


export default {
  name: 'App',
  data: function (){
      return{
        drawer: false,
        characters: []
      };
  },

  methods:{
    fetch(){
      axios
      .get("https://rickandmortyapi.com/api/character")
      .then(res => {
          this.characters = res.data.results;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
      
    }
  }
};


</script>

<style>

</style>

