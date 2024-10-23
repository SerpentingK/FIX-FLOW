<script>
import { ref, onMounted, inject, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const container = ref(null);
    const container_forms = ref(null);
    const confirmPassword = ref("");
    const isMobile = ref(false);
    const toggled = ref(false)

    const updateMedia = () => {
      isMobile.value = window.innerWidth <= 600;
    };
    const toggle = () => {
      if (container.value.classList.contains("toggle")) {
        container.value.classList.remove("toggle");
      } else {
        container.value.classList.add("toggle");
      }
    };
    const toggle_responsive = () => {
      container_forms.value.forEach(form => {
        if (form.classList.contains("toggle")) {
          form.classList.remove("toggle");
        } else {
          form.classList.add("toggle");
        }
      });
      toggled.value = !toggled.value;
    };

    const getWorkersCount = async () => {
      try {
        if (loggedCompany.value) {
          const answer = await axios.get(
            `http://127.0.0.1:8000/company/${loggedCompany.value}/workers/count`
          );
          workersCount.value = answer.data.count;
        }
      } catch (error) {
        console.error("Error al obtener el conteo de trabajadores", error);
      }
    };
    onMounted(() => {
      updateMedia();
      window.addEventListener("resize", updateMedia);
      getWorkersCount();
      container.value = document.querySelector(".container");
      container_forms.value = document.querySelectorAll(".container-form");
    });

    const company = ref({
      company_user: "",
      mail: "",
      password: "",
    });

    const passwordsMatch = computed(() => {
      return company.value.password === confirmPassword.value;
    });

    const session = ref({
      company_user: "",
      password: "",
    });

    const msg = ref("");

    // Inyectar la variable global
    const loggedCompany = inject("loggedCompany", ref(null));
    const workersCount = inject("workersCount", ref(0));

    const startSession = async () => {
      try {
        const answer = await axios.post(`http://127.0.0.1:8000/loginCompany`, {
          company_user: session.value.company_user,
          password: session.value.password,
        });
        msg.value = answer.data.msg;
        // Asignar la empresa que inició sesión a la variable global
        loggedCompany.value = session.value.company_user;
        await getWorkersCount();
        if (workersCount.value > 0) {
          router.push("/workers/login-worker");
        } else {
          router.push("/workers/new-worker");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert(`Error al iniciar sesión: ${error.response.data.detail}`);
          console.error("Error al iniciar sesión", error.response.data);
        } else {
          alert("Ha ocurrido un error inesperado. Inténtalo de nuevo.");
          console.error(error);
        }
      }
    };

    const postCompany = async () => {
      try {
        if (!passwordsMatch.value) {
          alert("Las contraseñas no coinciden.");
          return;
        }
        const answer = await axios.post(
          "http://127.0.0.1:8000/insertCompany",
          company.value
        );
        msg.value = answer.data.msg;
        company.value = {
          company_user: "",
          mail: "",
          password: "",
        };
        confirmPassword.value = "";

        toggle();
      } catch (error) {
        if (error.response && error.response.data) {
          alert(`Error al registrar empresa: ${error.response.data.detail}`);
          console.error("Error al registrar empresa", error.response.data);
        } else {
          alert("Ha ocurrido un error inesperado. Inténtalo de nuevo.");
          console.error(error);
        }
      }
    };

    return {
      company,
      passwordsMatch,
      confirmPassword,
      postCompany,
      startSession,
      session,
      msg,
      toggle,
      container,
      workersCount,
      toggle_responsive,
      isMobile,
      toggled
    };
  },
};
</script>

<template>
  <button v-if="isMobile" @click="toggle_responsive()" class="ses-btn">
    <span v-if="!toggled">REGISTRARSE</span>
    <span v-if="toggled">INICIAR SESION</span>
  </button>
  <div class="container">
    <div class="container-form">
      <form class="sign-in" @submit.prevent="startSession">
        <h2>Iniciar Sesión</h2>
        <span>Use su usuario y su contraseña</span>
        <div class="container-input">
          <ion-icon name="person-outline"></ion-icon>
          <input v-model="session.company_user" type="text" placeholder="Usuario" />
        </div>
        <div class="container-input">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input v-model="session.password" type="password" placeholder="Contraseña" />
        </div>
        <a href="#">¿Olvidaste tu contraseña?</a>
        <button type="submit" class="button">INICIAR SESION</button>
      </form>
    </div>
    <div class="container-form">
      <form class="sign-up" @submit.prevent="postCompany">
        <h2>Registrarse</h2>
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
          <input v-model="company.password" type="password" placeholder="Contraseña" />
        </div>
        <div class="container-input">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input v-model="confirmPassword" type="password" placeholder="Verifique su contraseña" />
        </div>
        <p v-if="!passwordsMatch" style="color: white;">Las contraseñas no coinciden.</p>
        <button type="submit" class="button" :disabled="!passwordsMatch">REGISTRO</button>
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
  border: 4px solid var(--baseOrange);
  background-color: var(--baseGray);
  color: white;
  overflow: hidden;
  border-radius: 20px;
  width: 800px;
  height: 500px;
  display: flex;
  position: relative;
  box-shadow: var(--baseShadow);
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
  border-radius: 5px;
}

.container-input input {
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  background-color: inherit;
}

.container-input ion-icon {
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
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  background-color: var(--baseOrange);
  color: white;
  transition: 0.4s;
  font-weight: bolder;
}

.button:hover {
  border-color: var(--baseGray);
  box-shadow: var(--secShadow);
  color: var(--baseGray);
  background-color: white;
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
  transition: transform 0.6s ease-in-out, border-radius 0.4s ease-in;
  overflow: hidden;
  border-radius: 0 0 0 30%;
}

.container.toggle .container-welcome {
  transform: translateX(0%);
  border-radius: 0 0 30% 0;
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

@media (max-width: 600px) {
  .container * {
    all: unset;
    transition: transform 0.5s ease-in;
  }

  .container {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
  }

  .container-form {
    background-color: var(--baseGray);
    width: 100%;
    height: 100%;
  }

  .container-form.toggle {
    transform: translateY(-100%);
  }

  .container-form form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container-form h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .container-form span {
    font-size: 10px;
    margin-bottom: 15px;
  }

  .container-welcome {
    display: none;
  }

  .container-input {
    width: 70%;
    height: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 0px 15px;
    background-color: #eeeeee;
    border-radius: 5px;
  }

  .container-input input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    background-color: inherit;
  }

  .container-input ion-icon {
    color: gray;
    width: 20px;
  }

  .container-form a {
    color: rgb(255, 255, 255);
    font-size: 14px;
    margin-bottom: 20px;
    margin-top: 5px;
    text-decoration: underline;
  }

  .button {
    width: 70%;
    height: 45px;
    font-size: 15px;
    border: 2px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 10px;
    background-color: var(--baseOrange);
    color: white;
    transition: 0.4s;
    font-weight: bolder;
    text-align: center;
  }

  .ses-btn {
    all: unset;
    text-align: center;
    height: 20px;
    position: absolute;
    z-index: 12;
    bottom: 20px;
    color: white;
    text-transform: uppercase;
    background-color: var(--baseOrange);
    box-shadow: var(--secShadow);
    padding: 20px 60px;
    border-radius: 20px;
    letter-spacing: 2px;
    font-weight: bolder;
    width: 60%;
  }
}
</style>
