<script setup>
import { ref, inject } from "vue"; // Importado para usar propiedades computadas
import { useRoute } from "vue-router"; // Importado para obtener la ruta actual

const route = useRoute(); // Obtiene la ruta actual

const loggedCompany = inject('loggedCompany', ref(null))
const loggedWorker = inject("loggedWorker", ref(null))


// Función para activar la clase 'active' en el enlace actual
const isActive = (path) => route.path.startsWith(path);
const show_nav_bar = ref(true)
const switch_snv = () => {
  show_nav_bar.value = !show_nav_bar.value
}
</script>

<template>
  <transition name="slide-fade" mode="out-in">
    <nav v-if="show_nav_bar">
      <router-link to="/users" class="router" :class="{ active: isActive('/users') }">Usuario</router-link>
      <router-link to="/workers/login-worker" class="router" :class="{ active: isActive('/workers') }"
        v-if="loggedCompany != null">Colaboradores</router-link>
      <router-link to="/bills" class="router" :class="{ active: isActive('/bills') }"
        v-if="loggedCompany != null && loggedWorker != null">Facturas</router-link>
      <router-link to="/spareparts" class="router" :class="{ active: isActive('/spareParts') }"
        v-if="loggedCompany != null && loggedWorker != null">Repuestos</router-link>
    </nav>
  </transition>
  <button class="nav-btn" @click="switch_snv()">
    <transition-group name="opacity" mode="out-in">
      <ion-icon name="menu" v-if="!show_nav_bar"></ion-icon>
      <ion-icon name="close" v-if="show_nav_bar"></ion-icon>
    </transition-group>
  </button>
</template>

<style scoped>
.nav-btn {
  display: none;
}

nav {
  background-color: rgba(255, 255, 255, 0.4);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  transition: 3s;
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

@media (max-width: 600px) {
  .nav-btn {
    all: unset;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 12;
    background-color: var(--baseOrange);
  }
  .nav-btn ion-icon{
    position: absolute;
    background-color: var(--baseOrange);
    font-size: 20px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: var(--baseShadow);
    color: white;
  }

  nav {
    position: absolute;
    left: 0;
    width: 50%;
    z-index: 10;
    padding-top: 40px;
  }

  /* Transición personalizada */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all .5s ease;
  }

  .slide-fade-enter-from {
    transform: translateX(-100px);
    opacity: 0;
  }

  .slide-fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
  .opacity-enter-active,
  .opacity-leave-active{
    transition: all .6s ease;
  }
  .opacity-enter-from{
    transform: translateX(-50px);
    opacity: 0;
  }
  .opacity-leave-to{
    transform: translateX(-50px);
    opacity: 0;
  }

}
</style>
