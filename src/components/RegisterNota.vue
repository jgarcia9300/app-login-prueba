<template>
       <div class="text-h4">Formulario de Registro


  <v-sheet width="600" class="mx-auto">
  <v-form>
    <v-text-field
      v-model="state.name"
      :error-messages="v$.name.$errors.map(e => e.$message)"
      :counter="10"
      label="Fecha"
      required
      @input="v$.name.$touch"
      @blur="v$.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="Nombre de la nota"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="Estamento"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="Escuela"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="Programa"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="Cargo"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="Extension"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

    <v-select
      v-model="state.select"
      :items="items"
      :error-messages="v$.select.$errors.map(e => e.$message)"
      label="Tipo de Publicacion"
      required
      @change="v$.select.$touch"
      @blur="v$.select.$touch"
    ></v-select>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="Enlace de la Noticia (Pagina salud)"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="Enlace de la imagen"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

   

    <v-btn
      class="me-4"
      @click="v$.$validate"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </v-form>
</v-sheet>
</div>
</template>

<script>
  import { reactive, ref } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

  export default {
    setup () {
      const initialState = {
        name: '',
        email: '',
        select: null,
        checkbox: null,
      }

      const state = reactive({
        ...initialState,
      })

      const items = ref([
        'Nota',
        'Noticia',
        
      ])

      const rules = {
        name: { required },
        email: { required, email },
        select: { required },
        items: { required },
        checkbox: { required },
      }

      const v$ = useVuelidate(rules, state)

      function clear () {
        v$.value.$reset()

        for (const [key, value] of Object.entries(initialState)) {
          state[key] = value
        }
      }

      return { state, items, clear, v$ }
    },
  }
</script>

<style>
.text-h4{
text-align: center;
vertical-align: middle;
line-height: 90px;   
}
</style>