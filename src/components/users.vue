<script>
import { ref, onMounted } from "vue";
import axios from 'axios';

export default {
  setup() {
    const container = ref(null);

    const toggle = () => {
      if (container.value.classList.contains("toggle")) {
        container.value.classList.remove("toggle");
      } else {
        container.value.classList.add("toggle");
      }
    };

    onMounted(() => {
      container.value = document.querySelector(".container");
    });

    const company = ref({
      company_user: "",
      mail: "",
      pasw: ""
    });

    const session = ref({
      company_user:"",
      pasw:""
    })

    const msg = ref("");

    const startSession = async () =>{
      try{
        const answer = await axios.get(
          `http://127.0.0.1:8000/startSession/${session.value.company_user}/${session.value.pasw}`
        );
        msg.value = answer.data.msg

      }catch(error){
        if (error.response && error.response.data) {
          alert(`Error al iniciar sesion: ${error.response.data.detail}`);
          console.error('Error al iniciar sesion ', error.response.data);
        } else {
          alert("Ha ocurrido un error inesperado. Inténtalo de nuevo.");
          console.error(error)
        }
      }
    }

    const postCompany = async () => {
      try {
        const answer = await axios.post(
          "http://127.0.0.1:8000/postCompany",
          company.value
        );
        msg.value = answer.data.msg;
        company.value = {
          company_user: "",
          mail: "",
          pasw: ""
        };

        toggle();

      } catch (error) {
        if (error.response && error.response.data) {
          alert(`Error al registrar empresa: ${error.response.data.detail}`);
          console.error('Error al registrar empresa ', error.response.data);
        } else {
          alert("Ha ocurrido un error inesperado. Inténtalo de nuevo.");
          console.error(error)
        }
      }
    }

    return {
      company,
      postCompany,
      startSession,
      session,
      msg,
      toggle,
      container
    };
  }
}
</script>


<template>
  <div class="container">
    <div class="container-form">
      <form class="sign-in" @submit.prevent="startSession">
        <h2>Iniciar Sesión</h2>
        <div class="social-networks">
          <ion-icon name="logo-tiktok"></ion-icon>
          <ion-icon name="logo-whatsapp"></ion-icon>
          <ion-icon name="logo-twitter"></ion-icon>
          <ion-icon name="logo-instagram"></ion-icon>
        </div>
        <span>Use su usuario y su contraseña</span>
        <div class="container-input">
          <ion-icon name="person-outline"></ion-icon>
          <input v-model="session.company_user" type="text" placeholder="Usuario" />
        </div>
        <div class="container-input">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input v-model="session.pasw" type="password" placeholder="Contraseña" />
        </div>
        <a href="#">¿Olvidaste tu contraseña?</a>
        <button type="submit" class="button">INICIAR SESION</button>
      </form>
    </div>
    <div class="container-form">
      <form class="sign-up" @submit.prevent="postCompany">
        <h2>Registrarse</h2>
        <div class="social-networks">
          <ion-icon name="logo-tiktok"></ion-icon>
          <ion-icon name="logo-whatsapp"></ion-icon>
          <ion-icon name="logo-twitter"></ion-icon>
          <ion-icon name="logo-instagram"></ion-icon>
        </div>
        <span>Use su correo electronico para el registro</span>
        <div class="container-input">
          <ion-icon name="mail-outline"></ion-icon>
          <input v-model="company.mail" type="text" placeholder="Correo Electronico" />
        </div>
        <div class="container-input">
          <ion-icon name="person-outline"></ion-icon>
          <input v-model="company.company_user" type="text" placeholder="Usuario" />
        </div>
        <div class="container-input">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input v-model="company.pasw" type="password" placeholder="Contraseña" />
        </div>
        <button type="submit" class="button">REGISTRO</button>
      </form>
    </div>
    <div class="container-welcome">
      <div class="welcome-sign-up welcome">
        <h3>¡Bienvenido!</h3>
        <p>Ingrese sus datos personales para acceder a nuestra plataforma.</p>
        <button @click="toggle" class="button" id="btn-sign-up">
          Registrarse
        </button>
      </div>
      <div class="welcome-sign-in welcome">
        <h3>¡Hola!</h3>
        <p>
          Registrate con tus datos personales para ingresar a nuestro sitio.
        </p>
        <button @click="toggle" class="button" id="btn-sign-in">
          Iniciar Sesion
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  border: 3px solid rgb(255, 255, 255);
  background-color: rgb(71, 71, 71);
  color: white;
  overflow: hidden;
  border-radius: 20px;
  width: 800px;
  height: 500px;
  display: flex;
  position: relative;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.479);
}

.container-form {
  width: 100%;
  overflow: hidden;
}

.container-form form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease-in;
}

.container-form h2 {
  font-size: 30px;
  margin-bottom: 20px;
}

.social-networks {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

.social-networks ion-icon {
  border: 1px solid white;
  color: gray;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
}

.container-form span {
  font-size: 12px;
  margin-bottom: 15px;
}

.container-input {
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0px 15px;
  background-color: #eeeeee;
}

.container-input input {
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  background-color: inherit;
}
.container-input ion-icon{
  color: gray;
}

.container-form a {
  color: rgb(255, 255, 255);
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: 5px;
}

.button {
  width: 170px;
  height: 45px;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  background-color: var(--baseOrange);
  color: white;
}

/*Animation form*/
.sign-up {
  transform: translateX(-100%);
}

.container.toggle .sign-in {
  transform: translateX(100%);
}

.container.toggle .sign-up {
  transform: translateX(0);
}

.container-welcome {
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: var(--baseOrange);
  display: flex;
  align-items: center;
  transform: translateX(100%);
  transition: transform 0.6s ease-in-out, border-radius .4s ease-in;
  overflow: hidden;
  border-radius: 0 0 0 50%;
}

.container.toggle .container-welcome {
  transform: translateX(0%);
  border-radius: 0 0 50% 0;
}

.welcome {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 0 50px;
  color: white;
  transition: transform 0.6s ease-in-out;
}

.welcome-sign-in {
  transform: translateX(100%);
}

.container-welcome h3 {
  font-size: 40px;
}

.container-welcome p {
  font-size: 15px;
  text-align: center;
}

.container-welcome button {
  border: 2px solid white;
}

.container.toggle .welcome-sign-in {
  transform: translateX(0);
}

.container.toggle .welcome-sign-up {
  transform: translateX(-100%);
}
</style>
