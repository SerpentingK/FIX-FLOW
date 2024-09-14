<script setup>

import { useRoute } from 'vue-router'; // Importado para obtener la ruta actual

const route = useRoute(); // Obtiene la ruta actual
const isActive = (path) => route.path === path;// Función para verificar si el enlace es el activo

defineProps({
    loggedCompany: {
        type: String,
        required: true
    }
})
</script>
<template>
    <transition name="fade">
        <router-link to="/session" class="router" :class="{'active': isActive('/session')}">
            <ion-icon name="person-circle-outline"></ion-icon>
            <span>{{ loggedCompany }}</span>
        </router-link>
    </transition>
</template>

<style scoped>
.router {
    position: fixed;
    right: 20px;
    top: 20px;
    background-color: white;
    padding: 8px 20px;
    width: 240px;
    border-radius: 30px;
    box-shadow: var(--baseShadow);
    font-size: 18px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    overflow: hidden;
    line-height: 1.6;
    border: 1px solid #999999;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
}
.router.active{
    background-color: var(--baseOrange);
}
.router.active *{
    color: white;
    z-index: 1;
}

.router::before {
    content: "";
    position: absolute;
    right: -5.2rem;
    top: -5.2rem;
    width: 10.4rem;
    height: 10.4rem;
    background: var(--baseOrange);
    z-index: 0;
    opacity: 0;
    border-radius: 50%;
    transition: all 3s cubic-bezier(0.23, 1, 0.32, 1);
}

.router::after {
    content: "";
    position: absolute;
    left: -5.2rem;
    bottom: -5.2rem;
    width: 10.4rem;
    height: 10.4rem;
    background: var(--baseOrange);
    z-index: 0;
    opacity: 0;
    border-radius: 50%;
    transition: all 3s cubic-bezier(0.23, 1, 0.32, 1);
}
.router:hover::before {
    scale: 7;
    opacity: 1;
}
.router:hover::after {
    scale: 7;
    opacity: 1;
}
.router:hover *{
    color: white;
    z-index: 1;
}
.router:hover {
    box-shadow: 0rem 6px 13px rgba(0, 0, 0, 0.1),
      0rem 24px 24px rgba(0, 0, 0, 0.09), 0rem 55px 33px rgba(0, 0, 0, 0.05),
      0rem 97px 39px rgba(0, 0, 0, 0.01), 0rem 152px 43px rgba(0, 0, 0, 0);
    border-color: #ffffff;
  }

.router * {
    color: var(--baseGray);
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
}

.router ion-icon {
    font-size: 25px;
}
</style>