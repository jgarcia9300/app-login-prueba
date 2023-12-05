<template>
  <v-app>
  <v-toolbar app dark 
    color="red-darken-4 white--text" 
    density="compact">
      
  <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  


      <v-toolbar-side-icon></v-toolbar-side-icon>
      
      <v-navigation-drawer v-model="drawer" temporary color="red-darken-4 white--text">

      <v-list>
        <v-list-subheader>MENU PRINCIPAL</v-list-subheader>
        <v-list-item prepend-icon="mdi-home" title="Home" to="/" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-magnify" title="Busqueda Avanzada" to="/busqavanzada" value="busquedavanzada"></v-list-item>
        
      </v-list> 
    </v-navigation-drawer>

      <v-spacer></v-spacer>
      
      <v-btn to="/login" variant="outlined" >Acceder</v-btn>
    </v-toolbar>
    
    <router-view></router-view>

    <v-footer 
    class=" text-center d-flex flex-column" color="red-darken-4 white--text"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-0">
      Escuela de comunicaciones 
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong> Universidad del Valle </strong>
    </div>
  </v-footer>
</v-app>

</template>


<script>
export default {
  name: 'PaginaInicio',
  data: function (){
      return{
        drawer: true
      };
  }
};

</script>

<style>
.v-list-subheader{
 color: white;
}

.v-footer {
  position: inherit;
}
</style>