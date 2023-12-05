<template>
  <main class="login">
    <section class="forms">
        <!-- submit.prevent evita que la pagina se recargue y se llama al metodo register -->
        <form class="register" @submit.prevent="register">  
            <h2>Registro</h2>
            <input 
                type="email"
                placeholder="Email"
                v-model="register_form.email" />
            <input
                 type="password" 
                 placeholder="Contraseña" 
                 v-model="register_form.password" />
                <!-- v-model es una directiva que nos permite enlazar una variable reactiva con un elemento del DOM -->
            <input
                 type="submit" 
                 placeholder="Register" 
            />
        </form>
            
        <form  class="login" @submit.prevent="login">
            <h2>Inicio de Sesion</h2>
            <input 
                type="email"
                placeholder="Email"
                v-model="login_form.email" />
            <input
                 type="password" 
                 placeholder="Contraseña" 
                 v-model="login_form.password" />
                <!-- v-model es una directiva que nos permite enlazar una variable reactiva con un elemento del DOM -->
            <input
                 type="submit" 
                 value="Iniciar Sesion" 
            />
        </form>
    </section>
  </main>
</template>

<script>
//ref es una funcion que nos permite crear una variable reactiva
import {ref} from 'vue';

//useStore es una funcion que nos permite acceder al store
import {useStore} from 'vuex';

export default {
    //setup es un hook que nos permite acceder a las variables reactivas. un hook es una funcion que se ejecuta en un momento especifico.
    setup() {
        //variables reactivas. const es una variable que no puede ser modificada y login_form es una variable reactiva
        const login_form = ref({});
        //register_form es una variable reactiva
        const register_form = ref({});
        //store no es una variable reactiva. Es una variable que nos permite acceder al store
        const store = useStore();
        //const login es una funcion que nos permite ejecutar una accion del store en donde se le pasa como parametro login_form.value. El objetivo es que el store pueda acceder a los datos del formulario
        const login = () => {
            //store.dispatch es una funcion que nos permite ejecutar una accion. dispatch se encarga de ejecutar la accion login y le pasa como parametro login_form.value
            store.dispatch('login', login_form.value);
        }
        //const register es una funcion que nos permite ejecutar una accion del store en donde se le pasa como parametro register_form.value. El objetivo es que el store pueda acceder a los datos del formulario
        const register = () => {
            store.dispatch('register', register_form.value);
        }

        return {
            login_form,
            register_form,
            login,
            register
        }
    }
}


</script>


<style>
.forms {
    display: flex;
    min-height: 100vh;
}

form{
    flex: 1 1 0%;
    padding: 8rem 1rem 1rem;
}

form.register{
    color: #fff;
    background-color: rgb(245, 66, 101);
    background-image: linear-gradient(
        to bottom right,
        rgb(245, 66, 101), 0%,
        rgb(189, 28, 60) 100%
    );
}

h2 {
    font-size: 2rem;
    text-transform: uppercase;
    margin-bottom: 2px;
}

input {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    display: block;
    width: 100%;
    max-width: 400px;
    margin : 0 auto;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    padding: 0.5rem 0rem;
    
}

input:not([type="submit"]) {
    opacity: 0.8;
    transition: 0.4s;   
}

input:focus:not([type="submit"]) {
    opacity: 1;
}

input::placeholder{
    color: inherit;
}

form.register input:not([type="submit"]) {
    color: #FFF;
    border-bottom: 2px solid #FFF;
}

form.login input:not([type="submit"]) {
    color: #2c3e50;
    border-bottom: 2px solid #2c3e50;
}

form.login input[type="submit"] {
    background-color: rgb(245, 66, 101);
    color: #FFF;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    text-transform: uppercase;
}

form.register input[type="submit"] {
    background-color: #FFF;
    color: rgb(245, 66, 101);;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    text-transform: uppercase;
}





</style>