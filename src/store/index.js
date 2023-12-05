//*createStore permite crear un store de vuex, el cual es un objeto que contiene el estado de la aplicación y los métodos para modificarlo.
import { createStore } from "vuex";
//router es un objeto que contiene las rutas de la aplicación.
import router from "../router";
//auth es un objeto que contiene los métodos para autenticar usuarios.
import { auth } from "../firebase";
//createUserWithEmailAndPassword, SignInWithEmailAndPassword y signOut son funciones que permiten crear un usuario, iniciar sesión y cerrar sesión respectivamente.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
//export default createStore({}) es una función que devuelve un objeto, el cual es el store de vuex.
export default createStore({
  //state es un objeto que contiene el estado de la aplicación.
  state: {
    user: null,
  },
  //getters son funciones que devuelven valores del estado.
  getters: {},
  //mutations son funciones que modifican el estado.
  mutations: {
    //SET_USER es una función que recibe el estado y un usuario, y asigna el usuario al estado.
    SET_USER(state, user) {
      state.user = user;
    },
    //CLEAR_USER es una función que recibe el estado y asigna null al usuario. Limpia el usuario cuando se cierra sesión.
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  //actions son funciones que ejecutan una mutación.
  actions: {
    //async login({ commit }, details) es una función que recibe un objeto commit y un objeto details, y ejecuta la mutación SET_USER con el usuario que se recibe en details.
    async login({ commit }, details) {
      //const {email, password} = details; es una forma de extraer las propiedades de un objeto y asignarlas a variables.
      const { email, password } = details;
      //try catch es una estructura que permite ejecutar código que puede generar un error. singInWithEmailAndPassword es una función que permite iniciar sesión con un correo electrónico y una contraseña. auth es un objeto que contiene los métodos para autenticar usuarios.
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        //error.code es una propiedad que contiene el código del error. switch es una estructura que permite ejecutar código dependiendo del valor de una variable. En este caso, se ejecuta código dependiendo del código del error.
        switch (error.code) {
          case "auth/user-not-found":
            alert("Usuario no encontrado");
            break;
          case "auth/wrong-password":
            alert("Contraseña incorrecta");
            break;
          default:
            alert("Algo no salió bien");
        }

        return;
      }

      //commit es una función que ejecuta una mutación. SET_USER es una mutación que recibe el estado y un usuario, y asigna el usuario al estado.

      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async register({ commit }, details) {
      const { email, password } = details;
      try {
        //await es una palabra clave que se utiliza para esperar a que se resuelva una promesa. Una promesa es un objeto que representa un valor que puede estar disponible ahora, en el futuro o nunca.
        //createUserWithEmailAndPassword es una función que permite crear un usuario con un correo electrónico y una contraseña. auth es un objeto que contiene los métodos para autenticar usuarios.
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        //error.code es una propiedad que contiene el código del error. switch es una estructura que permite ejecutar código dependiendo del valor de una variable. En este caso, se ejecuta código dependiendo del código del error.
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("El Email ya esta en uso");
            break;
          case "auth/invalid-email":
            alert("Email invalido");
            break;
          case "auth/operation-not-allowed":
            alert("Operacion no permitida");
            break;
          case "auth/weak-password":
            alert("Contraseña debil");
            break;
          default:
            alert("Algo no salió bien");
        }

        return;
      }
      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async logout({ commit }) {
      //await signOut(auth) es una función que permite cerrar sesión. auth es un objeto que contiene los métodos para autenticar usuarios.
      await signOut(auth);
      //commit es una función que ejecuta una mutación. CLEAR_USER es una mutación que recibe el estado y asigna null al usuario. Limpia el usuario cuando se cierra sesión.
      commit('CLEAR_USER');
      //router es un objeto que contiene las rutas de la aplicación. push es una función que permite navegar a una ruta.
      router.push('/login');
    },
    //fetchUser es una función que recibe un objeto commit y ejecuta la mutación CLEAR_USER cuando el usuario cierra sesión.
    fetchUser({ commit }) {
      //onAuthStateChanged es una función que se ejecuta cuando el estado de autenticación del usuario cambia. auth es un objeto que contiene los métodos para autenticar usuarios.
      auth.onAuthStateChanged(async user => {
        //user es un objeto que contiene la información del usuario autenticado. Si user es null, el usuario no está autenticado, por lo que el usuario se limpia. Si user no es null, el usuario está autenticado, por lo que se ejecuta la mutación SET_USER con el usuario.
        if (user === null) {
          commit('CLEAR_USER');
        } else {
          commit('SET_USER', user);
          //router es un objeto que contiene las rutas de la aplicación. isReady es una propiedad que indica si el enrutador ha terminado de inicializarse. currentRoute es una propiedad que contiene la ruta actual. path es una propiedad que contiene la URL de la ruta actual. push es una función que permite navegar a una ruta.
          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/');
          }
        }
      })
    }
  },
});
