<template>
  <div id="nav" v-if="$store.state.user">
     <router to="vista"></router> 
    <button @click="$store.dispatch('logout')">Logout</button>
  </div>
  <router-view/>
</template>

<script>
//onBeforeMount es un hook que se ejecuta antes de que se monte el componente. Esto permite que se ejecute el código antes de que se renderice el componente.
import { onBeforeMount } from 'vue';
//useRoute es un hook que nos permite acceder a la ruta actual.
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch('fetchUser');
    });
  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; 

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
