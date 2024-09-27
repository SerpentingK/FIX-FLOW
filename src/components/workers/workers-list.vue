<script setup>
import workerLi from "./worker-li.vue";
import axios from "axios";
import { inject, onMounted, ref } from "vue";

const loggedCompany = inject("loggedCompany", ref(null));
const listW = ref([]);
onMounted(async () => {
  try {
    const answer = await axios.get(
      `http://127.0.0.1:8000/collaborators/${loggedCompany.value}/workers`
    );
    listW.value = answer.data;
    console.log(listW.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <section class="container">
    <h2>LISTA DE COLABORADORES</h2>
    <ol>
      <workerLi
        v-for="i in listW"
        :key="i.document"
        :wname="i.wname"
        :document="i.document"
        :wrole="i.wrole"
      ></workerLi>
    </ol>
    <router-link to="/workers/new-worker">AÑADIR TECNICOS</router-link>
  </section>
</template>

<style scoped>
.container {
  background-color: var(--baseGray);
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: var(--baseShadow);
  border-radius: 20px;
  border: 4px solid var(--baseOrange);
}
.container h2 {
  font-size: 30px;
  font-weight: bolder;
  text-shadow: var(--baseShadow);
  font-family: var(--titleFont);
  background: linear-gradient(90deg, var(--baseOrange), white);
  background-clip: text;
  letter-spacing: 1.5px;
  -webkit-text-fill-color: transparent;
  /* Sombra arriba a la izquierda */
  margin-bottom: 20px;
}
ol {
  display: flex;
  list-style: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  gap: 30px;
}
</style>
