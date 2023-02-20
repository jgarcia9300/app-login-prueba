<!-- //interfaz -->
<template>
<div id="app">
<section class="hero">
<nav class="navbar is-white" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://www.univalle.edu.co">
      <img src="https://www.univalle.edu.co/images/logo.jpg" width="245" height="300">
    </a>
    
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        Acceder
      </a>

      
      </div>
    </div>
  

 
</nav>
</section>

  
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
