<script>
import { ref, inject } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const loggedCompany = inject("loggedCompany", ref(null));
    const worker = ref({
      wname: "",
      password: "",
      document: "",
      company: loggedCompany.value,
      wrole: "Gerente",
    });
    const msg = ref("");
    const postWorker = async () => {
      try {
        const answer = await axios.post(
          "http://127.0.0.1:8000/insertWorker",
          worker.value
        );
        msg.value = answer.data.msg;
        console(msg.value);
        router.push("/workers/login-worker");
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
      worker,
      postWorker,
    };
  },
};
</script>

<template>
  <section class="container">
    <h2>CREE UN NUEVO COLABORADOR</h2>
    <form class="worker-form" @submit.prevent="postWorker">
      <label for="name-input" class="input-container">
        <span>Nombre: </span>
        <input v-model="worker.wname" type="text" id="name-input" />
      </label>
      <label for="doc-input" class="input-container">
        <span>Documento: </span>
        <input v-model="worker.document" type="text" id="doc-input" />
      </label>
      <label for="pasw-input" class="input-container">
        <span>Contraseña: </span>
        <input v-model="worker.password" type="text" id="pasw-input" />
      </label>
      <div class="role-select">
        <div>
          <label class="select-label">
            <input
              v-model="worker.wrole"
              value="Gerente"
              type="radio"
              name="radio"
            />
            <span>GERENTE</span>
          </label>
          <label class="select-label">
            <input
              v-model="worker.wrole"
              value="Administrador"
              type="radio"
              name="radio"
            />
            <span>ADMINISTRADOR</span>
          </label>
          <label class="select-label">
            <input
              v-model="worker.wrole"
              value="Colaborador"
              type="radio"
              name="radio"
            />
            <span>COLABORADOR</span>
          </label>
        </div>
      </div>
      <div>{{ workersCount }}</div>
      <button type="submit" class="btn"><span>Registrar</span></button>
    </form>
  </section>
</template>
<style scoped>
h2 {
  font-weight: bolder;
  font-family: var(--titleFont);
  font-size: 30px;
  color: white;
}

.container {
  background-color: var(--baseGray);
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: var(--baseShadow);
  border: 4px solid var(--baseOrange);
  border-radius: 20px;
}

.worker-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  padding: 10px;
}

.input-container {
  background-color: white;
  color: black;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 15px 30px;
  width: 100%;
  box-shadow: var(--secShadow);
  font-size: 20px;
  border-radius: 10px;
}

.input-container input {
  all: unset;
}

.worker-form select {
  background-color: white;
  border-radius: 20px;
  padding: 15px 30px;
  box-shadow: var(--secShadow);
  font-size: 20px;
  font-family: var(--baseFont);
}

:focus {
  outline: 0;
  border-color: var(--baseOrange);
  box-shadow: 0 0 0 4px #b5c9fc;
}
.role-select div {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  justify-content: center;
  box-shadow: var(--secShadow);
}

.role-select input[type="radio"] {
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  transition: all 0.4s ease;
}

.role-select input[type="radio"]:checked + span {
  box-shadow: 0 0 0 0.0625em var(--baseOrange);
  background-color: #dee7ff;
  z-index: 1;
  color: var(--baseOrange);
  transform: scale(1.1);
  border-radius: 5px;
}

.select-label span {
  display: block;
  cursor: pointer;
  background-color: #fff;
  padding: 10px 20px;
  position: relative;
  margin-left: 0.0625em;
  box-shadow: 0 0 0 0.0625em #b5bfd9;
  letter-spacing: 0.05em;
  color: #3e4963;
  text-align: center;
  transition: all 0.2s ease;
  font-weight: bolder;
}

.select-label:first-child span {
  border-radius: 0.375em 0 0 0.375em;
}

.select-label:last-child span {
  border-radius: 0 0.375em 0.375em 0;
}

.btn {
  outline: none;
  cursor: pointer;
  border: none;
  padding: 0.9rem 2rem;
  margin: 0;
  font-family: var(--secFont);
  letter-spacing: 1px;
  font-size: inherit;
  position: relative;
  display: inline-block;
  font-weight: 700;
  border-radius: 50px;
  overflow: hidden;
  background: var(--baseOrange);
  color: white;
  box-shadow: var(--secShadow);
  border: 3px solid var(--baseOrange);
}
.btn span {
  position: relative;
  z-index: 10;
  transition: all 0.4s;
}
.btn:hover span {
  color: white;
  scale: 1.2;
}

.btn::before,
.btn::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.btn::before {
  content: "";
  background: var(--baseGray);
  width: 120%;
  left: -10%;
  transform: skew(90dg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}
.btn:hover::before {
  transform: translate3d(100%, 0, 0);
}
</style>
