//Este codigo tendra la configuracion de firebase. firebase propociona autenticacion, base de datos, almacenamiento, mensajeria, etc. En este caso el codigo solo tendra la configuracion de autenticacion. 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //getAuth sirve para obtener la autenticacion del usuario.
//firebaseConfig permite la conexion del usuario con el proyecto de firebase.
const firebaseConfig = {
  apiKey: "AIzaSyCtdBvoY2JN3IG4N7JXtdc9N4qA9bi_Srw",
  authDomain: "vue-fire-auth-69226.firebaseapp.com",
  projectId: "vue-fire-auth-69226",
  storageBucket: "vue-fire-auth-69226.appspot.com",
  messagingSenderId: "650108524716",
  appId: "1:650108524716:web:f2a80af74e76197ef66709"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);//inicializamos la aplicacion con la configuracion de firebase.

const auth = getAuth(app);//getAuth sirve para obtener la autenticacion del usuario.

export { auth }; //exportamos la autenticacion para poder usarla en otros archivos.