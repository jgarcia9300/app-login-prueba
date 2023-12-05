<!-- //interfaz -->
<template>
  
  <v-app>
    
    <v-carousel height="auto" hide-delimiters>
      <v-carousel-item src="@/assets/banner1.png" cover></v-carousel-item>
    </v-carousel>

    <v-main>
      <v-banner lines="one" icon="mdi-newspaper" color="white" class="my-4">
        <v-banner-text>
          Aqui recibirás las ultimas notas y noticias relacionadas con la
          Facultad de Salud de la Universidad del Valle
        </v-banner-text>
      </v-banner>
      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="search"
              label="Buscar"
              v-on:keyup.enter="searchNotas"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="1">
            <v-btn color="red-darken-4 white--text" v-on:click="searchNotas()"
              >Buscar</v-btn
            >
          </v-col>
          <v-col cols="12" sm="4" md="3">
            <v-btn color="red-darken-4 white--text" to="/busqavanzada"
              >Busqueda Avanzada</v-btn
            >
          </v-col>
          <v-col cols="12" sm="4" md="3">
            <v-btn color="red-darken-4 white--text" v-on:click="openModal">Registrar Nota</v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <div class="text-center">
          <v-row>
            <v-col cols="12" sm="3" md="4" v-for="nota of notas" :key="nota.id">
              <v-card class="mx-auto" max-width="600" height="100%">
                <v-img
                  class="align-end text-white"
                  height="200"
                  :src="nota.imagen"
                  cover
                >
                </v-img>

                <v-card-title v-truncate-string>
                  {{ nota.nombrenota }}
                </v-card-title>

                <v-card-subtitle class="pt-4">
                  <h5>Autor: {{ nota.autor }}</h5>
                  <h5>Fecha Publicación: {{ nota.fecha }}</h5>
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn :href="nota.enlace" color="red" target="_blank">
                    Saber mas
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!-- <v-pagination
          v-model="page"
          :length="2"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination> -->
        </div>
      </v-container>
      <ul class="paginacion">
        <li v-on:click="()=>{ updatePage(1) }" class="botonesDesplazamiento">
          <v-icon color="red-darken-4 white--text">mdi-step-backward</v-icon>
        </li>

        <li v-on:click="()=>{ if (currentPage > 1) updatePage(currentPage - 1) }"
          class="botonesDesplazamiento">
          <v-icon color="red-darken-4 white--text">mdi-chevron-left</v-icon>
        </li>
        <li
          v-for="page in pages"
          v-bind:key="page"
          v-on:click="updatePage(page)"
          class="pagina"
          :class="{ selected: page === currentPage }"
        >
          {{ page }}
        </li>
        <li v-on:click="()=>{ if (currentPage < totalPages) updatePage(currentPage + 1) }" class="botonesDesplazamiento">
          <v-icon color="red-darken-4 white--text">mdi-chevron-right</v-icon>
        </li>
        <li v-on:click="()=>{ updatePage(totalPages) }" class="botonesDesplazamiento">
          <v-icon color="red-darken-4 white--text">mdi-step-forward</v-icon>
        </li>
      </ul>
    </v-main>
    <RegisterNota v-if="modalVisible" @close="closeModal"/>

  </v-app>
</template>


<!-- // metodos -->

<script>
// librerias
import RegisterNota from './RegisterNota.vue';

export default {
  name: "App",
  components: { RegisterNota },
  data: function () {
    return {
      notas: [],
      search: "",
      currentPage: 1,
      pageSize: 6,
      totalPages: null,
      modalVisible: false
    };
  },

  created() {
    this.fetch();
  },

  mounted() {
    //this.searchNotas()
  },

  methods: {

    fetch() {
      var axios = require("axios");

      const axiosInstance = axios.create({
        headers: {
          //'Origin': 'https://notisalud-api-vax3.onrender.com',
          "Access-Control-Allow-Origin": "*",
        },
      });

      // console.log("Front numberPage : ", this.currentPage);

      axiosInstance
        .get(
          // "https://notisalud-api-vax3.onrender.com/api/notas")
          "http://localhost:9000/api/notas",
          {
            params: {
              numberPage: this.currentPage,
            },
          }
        )

        .then((res) => {
          this.totalPages = res.data.paginasTotales
          this.notas = res.data.paginatedResults;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async searchNotas() {
      var axios = require("axios");
      axios
        .get(
          "https://notisalud-api-vax3.onrender.com/api/notassrc",
          //'http://localhost:9000/api/notassrc'
          {
            params: {
              query: this.search,
            },
          }
        )
        .then((response) => {
          // Aquí puedes procesar los datos de respuesta como desees
          //console.log(response.data);
          this.notas = response.data;
        })
        .catch((error) => {
          // Manejo de errores en caso de que la solicitud falle
          console.error(error);
        });
    },

    updatePage(page) {
      this.currentPage = page;
      this.fetch();
      // this.setCurrent(page)    
    },

    openModal() {
      this.modalVisible = true;
      console.log('este es el modalVisible', this.modalVisible)
    },

    closeModal() {
      this.modalVisible = false;
      console.log('este es el modalVisible', this.modalVisible)
    }
  },
  computed: {
    pages() {
      let numShown = 8; // This sets the number of page tabs
      numShown = Math.min(numShown, this.totalPages);
      let first = this.currentPage - Math.floor(numShown / 2);
      first = Math.max(first, 1);
      first = Math.min(first, this.totalPages - numShown + 1);
      return [...Array(numShown)].map((k, i) => i + first);
    },
  },
};
</script>

<style >
  .botonesDesplazamiento{
    cursor: pointer;
  }

  .paginacion {
    display: flex;
    justify-content: center;
    list-style: none;
    margin-bottom: 10px;
    padding: 0;
    align-items: center;
  }

  .pagina {
    margin: 0 5px; /* Espacio entre los elementos */
    cursor: pointer;
    font-family: Arial, sans-serif; /* Tipo de letra */
    font-size: 18px; /* Tamaño de letra */
    line-height: 1;
  }

  .pagina.selected {
    color: white;
    background-color: #b71c1c;
    padding: 2.5px;
    border-radius: 5px;
  }

  .v-banner {
    background: #808080;
  }
  .v-banner-text {
    color: #ffffff;
  }

  .v-text-field {
    width: 400px;
  }
</style>

