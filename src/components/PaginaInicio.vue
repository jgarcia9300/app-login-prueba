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
      <v-toolbar-title >Noticias Facultad de Salud</v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn variant="outlined">Acceder</v-btn>
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
</script>

<style>

.v-footer {
  position: inherit;
}
</style>