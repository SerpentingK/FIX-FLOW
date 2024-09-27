<script setup>
import { computed, ref, inject } from "vue"; // Importado para usar propiedades computadas
import { useRoute } from "vue-router"; // Importado para obtener la ruta actual

const route = useRoute(); // Obtiene la ruta actual

const loggedCompany = inject('loggedCompany', ref(null))
const loggedWorker = inject("loggedWorker", ref(null))

// Comprobamos si hay historial para regresar
const canGoBack = ref(window.history.length > 1);
// Función para ir a la página anterior
const goBack = () => {
  if (canGoBack.value) {
    router.back();
  }
};

// Función para activar la clase 'active' en el enlace actual
const isActive = (path) => route.path.startsWith(path);
</script>

<template>
  <nav>
    <router-link to="/users" class="router" :class="{ active: isActive('/users') }">Usuario</router-link>
    <router-link to="/workers/login-worker" class="router" :class="{ active: isActive('/workers') }" 
      v-if="loggedCompany != null">Colaboradores</router-link>
    <router-link to="/bills" class="router" :class="{ active: isActive('/bills') }"
      v-if="loggedCompany != null && loggedWorker != null">Facturas</router-link>
    <router-link to="/spareparts" class="router" :class="{ active: isActive('/spareParts') }"
      v-if="loggedCompany != null && loggedWorker != null">Repuestos</router-link>
    <button @click="goBack" :disabled="!canGoBack" class="back-button">
      <ion-icon name="arrow-back-circle-outline"></ion-icon>
    </button>
  </nav>
</template>

<style scoped>
nav {
  background-color: rgba(255, 255, 255, 0.4);
  /* Color blanco con transparencia */
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  /* Efecto de difuminado */
  border-radius: 5px;
  /* Bordes redondeados opcionales */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.219);
}

.router {
  color: rgba(0, 0, 0, 0.596);
  padding: 20px;
  text-decoration: none;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  transition: all .3s ease, border-radius .5s ease, box-shadow .5s ease;
}

.router.active {
  background-color: var(--baseOrange);
  color: white;
  transform: translateX(15px);
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.418);
}

.back-button {
  width: 9em;
  height: 3em;
  border-radius: 30em;
  font-family: inherit;
  border: none;
  position: absolute;
  bottom: 20px;
  left: 10px;
  overflow: hidden;
  z-index: 1;
  transition: color 0.3s ease-in;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.611);
  border: 1px solid transparent;
}

.back-button ion-icon {
  font-size: 30px;
}

.back-button::before {
  content: "";
  width: 0;
  height: 3em;
  border-radius: 30em;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--baseOrange);
  transition: 0.5s ease;
  display: block;
  z-index: -1;
}

.back-button:hover::before {
  width: 9em;
}

.back-button:hover {
  color: white;
}
</style>
