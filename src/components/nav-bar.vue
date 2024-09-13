<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // Obtiene la ruta actual
const router = useRouter(); // Obtiene el objeto router

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
    <router-link to="/users" class="router" :class="{ 'active': isActive('/users') }">Usuario</router-link>
    <router-link to="/tec" class="router" :class="{ 'active': isActive('/tec') }">Tecnicos</router-link>
    <router-link to="/phones" class="router" :class="{ 'active': isActive('/phones') }">Celulares</router-link>
    <router-link to="/spareparts" class="router" :class="{ 'active': isActive('/spareparts') }">Repuestos</router-link>
    <button @click="goBack" :disabled="!canGoBack" class="back-button"><ion-icon
        name="arrow-back-circle-outline"></ion-icon></button>
  </nav>
</template>

<style scoped>
nav {
  background-color: var(--baseOrange);
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.router {
  color: white;
  padding: 20px;
  text-decoration: none;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  transition: all .3s ease;
}

.router.active {
  background-color: white;
  color: black;
  transform: translateX(15px);
  border: 1px solid rgba(0, 0, 0, 0.537);
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
  transition: color .3s ease-in;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.611);
  border: 1px solid transparent;
}

.back-button ion-icon {
  font-size: 30px;
}

.back-button::before {
  content: '';
  width: 0;
  height: 3em;
  border-radius: 30em;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--baseOrange);
  transition: .5s ease;
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
