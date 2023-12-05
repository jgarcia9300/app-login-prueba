  <template>
  <v-main>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="3" md="4">
          <v-combobox
            clearable
            v-model="filter"
            :items="categorias"
            label="Selecciona un filtro"
            v-on:update:model-value="updateFilter"
          ></v-combobox>
          <v-combobox
            clearable
            v-model="comboSearch"
            :items="opcionesFilter"
            item-title="text"
            item-value="items"
            label="Selecciona una opción del filtro"
            v-on:update:model-value="()=>{currentPage = 1}"
          ></v-combobox>
        </v-col>
        <!-- <v-col cols="6" sm="4" md="1">
            <v-btn color="red-darken-4 white--text" v-on:click="searchTipo()"
              :disabled="!comboSearch">Buscar</v-btn
            >
          </v-col> -->
      </v-row>
    </v-container>
    <div class="center-button">
      <v-btn
        color="red-darken-4 white--text"
        v-on:click="searchTipo()"
        :disabled="!comboSearch"
        >Buscar</v-btn
      >
    </div>
    <v-container fluid>
      <div class="text-center">
        <v-row style="min-height: 50vh">
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
                <h5>Tipo de Publicacion: {{ nota.tipo_publicacion }}</h5>
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
      </div>
    </v-container>

    <ul class="paginacion">
      <li
        v-on:click="
          () => {
            updatePage(1);
          }
        "
        class="botonesDesplazamiento"
      >
        <v-icon color="red-darken-4 white--text">mdi-step-backward</v-icon>
      </li>

      <li
        v-on:click="
          () => {
            if (currentPage > 1) updatePage(currentPage - 1);
          }
        "
        class="botonesDesplazamiento"
      >
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
      <li
        v-on:click="
          () => {
            if (currentPage < totalPages) updatePage(currentPage + 1);
          }
        "
        class="botonesDesplazamiento"
      >
        <v-icon color="red-darken-4 white--text">mdi-chevron-right</v-icon>
      </li>
      <li
        v-on:click="
          () => {
            updatePage(totalPages);
          }
        "
        class="botonesDesplazamiento"
      >
        <v-icon color="red-darken-4 white--text">mdi-step-forward</v-icon>
      </li>
    </ul>
  </v-main>
</template>

<script>
export default {
  name: "AdvancedSearch",
  data: function () {
    return {
      categorias: ["Autor", "Escuela", "Programa", "Estamento", "Cargo Directivo", "Extensión"],
      filter: null,
      opcionesFilter: [],
      comboSearch: null,
      notas: "",
      itemsAgrupados: {
        Autor: null,
        Escuela: null,
        Programa: null,
        Estamento: null,
        CargoDirectivo: null,
        Extension: null
      },
      currentPage: 1,
      totalPages: 1,
    };
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

  created() {
    this.infoFilter()
  },

  methods: {
    async searchTipo() {
      try {
        var axios = require("axios");
        const respuesta = await axios.get(
          // "https://notisalud-api-vax3.onrender.com/api/tiposrc",
          "http://localhost:9000/api/tiposrc",
          {
            params: {
              selectedCategory: this.filter,
              selectedOption: this.comboSearch,
              numberPage: this.currentPage
            },
          }
        );
        console.log(respuesta)
        this.totalPages = respuesta.data.paginasTotales
        this.notas = respuesta.data.paginatedResults;
      } catch (error) {
        console.error(error);
      }
    },
    async infoFilter() {
      try {
        var axios = require("axios");
        const respuesta = await axios.get(
          // "https://notisalud-api-vax3.onrender.com/api/tiposrc",
          "http://localhost:9000/api/infofilter"
        );
        // console.log(respuesta)
        this.itemsAgrupados.Escuela = respuesta.data.escuela
        this.itemsAgrupados.Autor = respuesta.data.autor
        this.itemsAgrupados.Programa = respuesta.data.programa
        this.itemsAgrupados.Extension = respuesta.data.extension
        this.itemsAgrupados.CargoDirectivo = respuesta.data.cargo_directivo
        this.itemsAgrupados.Estamento = respuesta.data.estamento
      } catch (error) {
        console.error(error);
      }
    },
    updateFilter() {
      this.currentPage = 1
      this.comboSearch = null
      // console.log('Este es el filtro: ', this.filter.replace(" ",""))
      this.opcionesFilter = this.filter ? this.itemsAgrupados[this.filter.replace(" ","").normalize('NFD').replace(/[\u0300-\u036f]/g,"")] : [];
    },
    updatePage(page) {
      this.currentPage = page;
      this.searchTipo();
      // this.setCurrent(page)    
    },
  },
};
</script>

<style>
  .center-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
