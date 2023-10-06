<template>
  <div class="modal">
    <div class="modal-content">
      <label class="text-h4"> Formulario de Registro </label>

      <v-sheet width="600" class="mx-auto">
        <v-form>
          <v-text-field
            v-model="state.fecha"
            :error-messages="v$.fecha.$errors.map((e) => e.$message)"
            :counter="10"
            label="Fecha"
            placeholder="aaaa-mm-dd"
            required
            @input="v$.fecha.$touch"
            @blur="v$.fecha.$touch"
            :type="'date'"
          ></v-text-field>

          <v-text-field
            v-model="state.name"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            label="Nombre de la nota"
            required
            @input="v$.name.$touch"
            @blur="v$.name.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.estamento"
            :error-messages="v$.estamento.$errors.map((e) => e.$message)"
            label="Estamento"
            required
            @input="v$.estamento.$touch"
            @blur="v$.estamento.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.escuela"
            :error-messages="v$.escuela.$errors.map((e) => e.$message)"
            label="Escuela"
            required
            @input="v$.escuela.$touch"
            @blur="v$.escuela.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.programa"
            :error-messages="v$.programa.$errors.map((e) => e.$message)"
            label="Programa"
            required
            @input="v$.programa.$touch"
            @blur="v$.programa.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.cargo"
            :error-messages="v$.cargo.$errors.map((e) => e.$message)"
            label="Cargo"
            required
            @input="v$.cargo.$touch"
            @blur="v$.cargo.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.extension"
            :error-messages="v$.extension.$errors.map((e) => e.$message)"
            label="Extension"
            required
            @input="v$.extension.$touch"
            @blur="v$.extension.$touch"
          ></v-text-field>

          <v-select
            v-model="state.tipoPublicacion"
            :items="items"
            :error-messages="v$.tipoPublicacion.$errors.map((e) => e.$message)"
            label="Tipo de Publicacion"
            required
            @change="v$.tipoPublicacion.$touch"
            @blur="v$.tipoPublicacion.$touch"
          ></v-select>

          <v-text-field
            v-model="state.urlNoticia"
            :error-messages="v$.urlNoticia.$errors.map((e) => e.$message)"
            label="Enlace de la Noticia (Pagina salud)"
            required
            @input="v$.urlNoticia.$touch"
            @blur="v$.urlNoticia.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.urlImage"
            :error-messages="v$.urlImage.$errors.map((e) => e.$message)"
            label="Enlace de la imagen"
            required
            @input="v$.urlImage.$touch"
            @blur="v$.urlImage.$touch"
          ></v-text-field>

          <!-- <v-btn class="me-4" @click="v$.$validate"> submit </v-btn> -->
          <v-btn class="me-4" @click="crearNoticia"> submit </v-btn>
          <v-btn class="me-4" @click="clear"> clear </v-btn>
          <v-btn class="me-4" @click="closeModal"> Cerrar </v-btn>
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup(props, context) {
    const initialState = {
      fecha: "",
      name: "",
      estamento: "",
      escuela: "",
      programa: "",
      cargo: "",
      extension: "",
      tipoPublicacion: "",
      urlNoticia: "",
      urlImage: "",
      // email: "",
      // select: null,
      // checkbox: null,
    };

    const state = reactive({
      ...initialState,
    });

    const items = ref(["Nota", "Noticia"]);

    const isValidDateFormat = (value) => {
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateFormatRegex.test(value);
    };

    const rules = {
      fecha: {
        required,
        isValidDateFormat,
      },
      name: { required },
      estamento: { required },
      escuela: { required },
      programa: { required },
      cargo: { required },
      extension: { required },
      tipoPublicacion: { required },
      urlNoticia: { required },
      urlImage: { required },
      // email: { required, email },
      // select: { required },
      // items: { required },
      // checkbox: { required },
    };

    const v$ = useVuelidate(rules, state);

    function clear() {
      v$.value.$reset();

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }

    function closeModal() {
      context.emit("close");
      // console.log('evento emitido')
    }

    function formatDateToBackend(date) {
      const año = date.substring(0, 4)
      const mes = date.substring(5, 7)
      const dia = date.substring(date.length - 2)

      const fecha = año + "-" + dia + "-" + mes
      return fecha
    }

    async function crearNoticia() {
      const formattedFecha = formatDateToBackend(state.fecha);
      console.log("fecha formateada: ", formattedFecha)
      let nota = {
        fecha: formattedFecha,
        nombrenota: state.name,
        autor: "Alguien",
        estamento: state.estamento,
        escuela: state.escuela,
        programa: state.programa,
        cargo_directivo: "n/a",
        extension: state.extension,
        imagen: state.urlImage,
        tipo_publicacion: state.tipoPublicacion,
        enlace: state.urlNoticia,
      };
      const isFormCorrect = await v$.value.$validate();
      if (isFormCorrect) {
        console.log("noticia creada: ", state);
        console.log("Nota a enviar: ", nota);
        var axios = require("axios");

        const axiosInstance = axios.create({
          headers: {
            //'Origin': 'https://notisalud-api-vax3.onrender.com',
            "Access-Control-Allow-Origin": "*",
          },
        });

        axiosInstance
          .post("http://localhost:9000/api/notas", nota)
          .then((res) => {
            console.log("Respuesta exitosa: ", res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    return { state, items, clear, closeModal, crearNoticia, v$ };
  },
};
</script>

<style scoped>
.text-h4 {
  text-align: center;
  vertical-align: middle;
  line-height: 90px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  text-align: center;
  vertical-align: middle;
  line-height: 90px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.modal-content .v-text-field {
  width: 100%;
  margin-bottom: 10px;
}
.modal-content .v-select {
  width: 100%;
  margin-bottom: 10px;
}
</style>