<script setup>
import { ref, provide, watch, onMounted } from 'vue';
import navBar from './components/nav-bar.vue';
import logo from './components/logo.vue';
import { useRouter, useRoute } from 'vue-router';
import company from './components/company.vue';

// Definir una referencia global para la empresa que ha iniciado sesión
const loggedCompany = ref(null);
const workersCount = ref(0);

// Proveer la variable a los componentes hijos
provide('loggedCompany', loggedCompany);
provide('workersCount', workersCount)


// Instancias de router y route
const router = useRouter();
const route = useRoute();

// Función para manejar la redirección
const handleRedirection = () => {
  if (route.path === '/users' && loggedCompany.value !== null) {
    router.push('/session'); // Redirigir a /session si loggedCompany es diferente de null
  }else if(route.path !== '/users' && loggedCompany.value === null ){
    router.push('/users');
  }
};
// Ejecutar la función al montar el componente
onMounted(() => {
  handleRedirection();
});
// Verificar cualquier cambio en la ruta
watch(
  () => route.path,
  (newPath) => {
    handleRedirection();
  }
);
</script>

<template>
  <section class="body">
    <navBar></navBar>
    <company v-if="loggedCompany != null" :logged-company="`${loggedCompany}`"></company>
    <section>
      <router-view></router-view>
    </section>
  </section>
  <logo class="logo-fixed"></logo>
</template>

<style scoped>
* {
  font-family: var(--baseFont);
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
</style>
