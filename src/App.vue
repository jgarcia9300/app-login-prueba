<!-- //interfaz -->
<template>
<div id="app">
  <div class="hero is-white is-gradient is-bold">
    <div class="hero-body">

      <h1 class="title">

        <span class="has-text-sucess"> Notisalud</span>
        <span class="subtitle"> Noticias</span>

      </h1>
    
    </div>

  </div>


  
  <button v-on:click="fetch">Consultar</button>



  <div v-for="character of characters" v-bind:key="character.id">
   {{ character }}
  </div>
</div>
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

<style lang="scss">
@import "~bulma/css/bulma.css"
</style>
