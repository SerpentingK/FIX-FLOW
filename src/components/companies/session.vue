<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const companyImageExisting = ref(false);
const loggedCompany = inject("loggedCompany", ref(null));
const loggedWorker = inject("loggedWorker", ref(null));
const workerRole = inject("workerRole", ref(null));
const urlImgCompany = ref(null);
const selectedFile = ref(null); // Para almacenar el archivo seleccionado

const closeCompany = () => {
  workerRole.value = null;
  loggedCompany.value = null;
  loggedWorker.value = null;
  router.push("/");
};

const putCompanyImg = async () => {
  try {
    const formData = new FormData();
    const inputFile = document.querySelector(".img_input"); // Asegúrate de que tu selector apunte al input correcto

    if (inputFile.files.length === 0) {
      throw new Error("No file selected");
    }

    formData.append("file", inputFile.files[0]); // Agregar el archivo al FormData

    const response = await axios.put(
      `http://127.0.0.1:8000/putCompanyImage/${loggedCompany.value}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Asegúrate de establecer el encabezado adecuado
        },
      }
    );
    const responseGet = await axios.get(
      `http://127.0.0.1:8000/allcompany/${loggedCompany.value}`
    );
    urlImgCompany.value = responseGet.data.url_image
    companyImageExisting.value = true;
    console.log("Image updated successfully:", response.data);
  } catch (error) {
    console.error("Error updating image:", error);
  }
};
</script>

<template>
  <section class="container">
    <h2>SESION INICIADA</h2>
    <div class="company-container">
      <ion-icon
        v-if="!companyImageExisting"
        name="person-circle-outline"
      ></ion-icon>
      <img
        v-if="companyImageExisting"
        :src="`http://127.0.0.1:8000/${urlImgCompany}`"
        alt="Company Image"
        class="company-img"
      />
      <!-- Ajusta la URL según tu lógica -->
      <form @submit.prevent="putCompanyImg" class="img-form">
        <input type="file" class="img_input" />
        <button type="submit">Cambiar Imagen</button>
      </form>
      <span>{{ loggedCompany }}</span>
    </div>
    <div class="op-container">
      <router-link to="/" class="op-router">Actualizar contraseña</router-link>
      <div>|</div>
      <router-link to="/" class="op-router">Actualizar Usuario</router-link>
    </div>
    <button @click="closeCompany" class="logout-btn">
      <div class="sign">
        <ion-icon name="log-out-outline"></ion-icon>
      </div>
      <div class="text">Logout</div>
    </button>
  </section>
</template>

<style scoped>
.container {
  background-color: white;
  padding: 20px 40px 80px 40px;
  box-shadow: var(--baseShadow);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}
.container h2 {
  font-size: 30px;
  font-weight: bolder;
  text-shadow: var(--baseShadow);
  font-family: var(--titleFont);
  background: linear-gradient(90deg, var(--baseOrange), var(--baseGray));
  background-clip: text;
  letter-spacing: 1.5px;
  -webkit-text-fill-color: transparent; /* Sombra arriba a la izquierda */
}
.company-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  font-weight: bolder;
  font-family: var(--secFont);
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: var(--baseGray);
  padding: 5px 30px;
  border-radius: 20px;
  color: var(--secGray);
}
.company-container ion-icon {
  font-size: 250px;
  color: var(--baseOrange);
}
.logout-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  right: 20px;
  bottom: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: var(--secShadow);
  background-color: var(--baseOrange);
}
/* plus sign */
.sign {
  width: 100%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sign ion-icon {
  color: white;
  font-size: 30px;
}
/* text */
.text {
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition: all 0.3s ease;
}
/* hover effect on button width */
.logout-btn:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: 0.4s;
}
.logout-btn:hover .sign ion-icon {
  font-size: 20px;
}
.logout-btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}

.op-container {
  display: flex;
  gap: 10px;
}
.op-router {
  color: var(--secGray);
  text-decoration: none;
  transition: all 0.3s ease;
}
.op-router:hover {
  color: var(--baseGray);
}

@media (max-width: 600px){
    .container h2{
        font-size: 20px;
    }
    .company-container ion-icon{
        font-size: 150px;
    }
    .op-container{
        flex-direction: column;
    }
    .op-container div{
        display: none;
    }
    .op-router{
        text-align: center;
    }
}
</style>

