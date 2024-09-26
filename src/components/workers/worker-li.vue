<script setup>
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
    <ul v-if="listW.length > 0">
        <li v-for="clb in listW" :key="clb.document">
            <span class="spans">{{ clb.wname }}</span>
            <span class="spans">{{ clb.document }}</span>
            <span class="spans">{{ clb.wrole }}</span>
        </li>
    </ul>
    <p v-else>No hay colaboradores</p>
</template>

<style scoped>
li {
  background-color: var(--baseGray);
  padding: 20px 40px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: var(--secShadow);
  list-style: none;
}
ul{
    display: flex;
    list-style: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:30px;
    border: 2PX SOLID RED;
}
</style>
