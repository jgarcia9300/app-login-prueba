<!-- //interfaz -->
<template>

<v-app>
  <v-toolbar density="compact">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-img
        class="mx-2"
        src="/src/assets/uvlogo.png"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

     
    </v-toolbar>
  <v-content>
    <div class="poto">
      <v-btn  variant="outlined" v-on:click="fetch">Consultar</v-btn>
        <div v-for="character of characters" v-bind:key="character.id">
      {{ character }}
     </div>
  </div>
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

