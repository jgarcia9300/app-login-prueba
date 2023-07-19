<template>
  <v-main>
   <v-container fluid> 
<v-row justify="center" align="center">
      
      <v-col cols="6" sm="4">
        <v-combobox v-model="comboSearch" :items="['Nota', 'Noticia']" label="Selecciona un Estamento" @change="justTest"></v-combobox>
      </v-col>
      <v-col cols="2" sm="1">
        <v-btn color="red-darken-4 white--text" v-on:click=" searchTipo();">Buscar</v-btn>
      </v-col>
    </v-row>
  </v-container>


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
      </v-img>

      <v-card-title >
      <p>{{ nota.nombrenota }}</p>
       </v-card-title>

      <v-card-subtitle class="pt-4">
        <h5>Tipo de Publicacion: {{ nota.tipo_publicacion }}</h5>
        <h5>Autor: {{ nota.autor }}</h5>
        <h5>Fecha Publicación: {{ nota.fecha }}</h5>
      </v-card-subtitle>
  
       <v-card-actions>
      <v-btn :href= "nota.enlace" color="red" target="_blank">
        Saber mas
        
      </v-btn>
      
      </v-card-actions>
      
      </v-card>
       

      </v-col>
    </v-row>
   
  </div>
  </v-container>
</v-main>

</template>

<script>
export default{
  name: 'AdvancedSearch',
  data: function(){
      return{
        comboSearch: '',
        notas: ''
  };

},

created(){

},

methods:{
  async searchTipo() {
      try {
        var axios = require("axios");
        const respuesta = await axios.get(
          //"https://notisalud-api.onrender.com/api/tiposrc"
          "http://localhost:9000/api/tiposrc", {
          params: {
            tipo_publicacion: this.comboSearch,
            
          }

        });

        this.notas = respuesta.data
      } catch (error) {
        console.error(error);
      }
    },

    justTest() {
      console.log('Item seleccionado:', this.comboSearch);
    }
}

};

</script>
