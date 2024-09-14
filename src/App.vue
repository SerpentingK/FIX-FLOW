<script setup>
import { ref, provide } from 'vue';
import navBar from './components/nav-bar.vue';
import logo from './components/logo.vue';

// Definir una referencia global para la empresa que ha iniciado sesión
const loggedCompany = ref(null);

// Proveer la variable a los componentes hijos
provide('loggedCompany', loggedCompany);
</script>

<template>
  <section class="body">
    <navBar></navBar>
    <div class="company-name" v-if="loggedCompany != null">{{ loggedCompany }}</div>
    <section>
      <router-view></router-view>
    </section>
  </section>
  <logo class="logo-fixed"></logo>
</template>

<style scoped>
* {
  font-family: "SUSE", sans-serif;
}

.body {
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 100%;
  position: fixed;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-fixed {
  position: fixed;
  right: -10px;
  bottom: -10px;
  z-index: -1;
  opacity: 0.7;
}
.company-name{
  position: fixed;
  right: 20px;
  top: 20px;
  background-color: white;
  padding: 8px 30px;
  width: 240px;
  border-radius: 30px;
  box-shadow: var(--baseShadow);
  font-size: 18px;
}
</style>
