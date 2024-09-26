<script setup>
import { ref, provide, watch, onMounted } from 'vue';
import navBar from './components/main/nav-bar.vue';
import logo from './components/main/logo.vue';
import alert from './components/main/alert.vue';
import { useRouter, useRoute } from 'vue-router';
import company from './components/companies/company.vue';

// Definir una referencia global para la empresa que ha iniciado sesión
const loggedCompany = ref(null);
const workersCount = ref(0);
const loggedWorker = ref(null);
const workerRole= ref(null);
// Proveer la variable a los componentes hijos
provide('loggedCompany', loggedCompany);
provide('workersCount', workersCount);
provide('loggedWorker', loggedWorker);
provide('workerRole', workerRole);

// Instancias de router y route
const router = useRouter();
const route = useRoute();

// Función para manejar la redirección
const handleRedirection = () => {
  if (route.path === '/users' && loggedCompany.value !== null) {
    router.push('/session'); // Redirigir a /session si loggedCompany es diferente de null
  }else if(route.path !== '/users' && loggedCompany.value === null ){
    router.push('/users');
  }else if (route.path === '/workers/login-worker' && loggedWorker.value !== null){
    router.push('/workers/worker')
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

const message = ref("");

// Función para añadir o quitar la clase 'visible' al elemento alert
const toggleAlertVisibility = (msg = "") => {
  const alertElement = document.querySelector('.alert');
  if (!alertElement) return;

  if (alertElement.classList.contains('visible')) {
    alertElement.classList.remove('visible');
  } else {
    alertElement.classList.add('visible');
  }

  message.value = msg; // Actualizar el mensaje del alert
};

// Proveer la función a los componentes hijos
provide('toggleAlertVisibility', toggleAlertVisibility);
</script>

<template>
  <alert :message="message" class="alert"></alert>
  <section class="body">
    <navBar></navBar>
    <company v-if="loggedCompany != null" :logged-company="`${loggedCompany}`"  :logged-worker="`${loggedWorker}`"></company>
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
.alert{
  transform: translateX(140%);
  position: fixed
}
.alert.visible{
  transform: translateX(0);
}
</style>
