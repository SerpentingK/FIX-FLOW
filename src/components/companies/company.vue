<script setup>
import {inject, ref} from 'vue';
import { useRoute } from 'vue-router'; // Importado para obtener la ruta actual

const route = useRoute(); // Obtiene la ruta actual
const isActive = (path) => route.path === path;// Función para verificar si el enlace es el activo
const loggedCompany = inject("loggedCompany", ref(null))
const loggedWorker = inject("loggedWorker", ref(null))
</script>
<template>
    <section class="container">
        <router-link to="/session" class="router" :class="{ 'active': isActive('/session'), 'logged': loggedCompany != null }">
            <ion-icon name="person-circle-outline"></ion-icon>
            <span>{{ loggedCompany }}</span>
        </router-link>
        <router-link to="/workers/worker" class="router" :class="{ 'active': isActive('/worker'), 'logged': loggedWorker != null }">
            <ion-icon name="person-circle-outline"></ion-icon>
            <span>{{ loggedWorker}}</span>
        </router-link>
    </section>
</template>

<style scoped>
.container{
    position: fixed;
    right: 20px;
    top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.router{
    outline: none;
    cursor: pointer;
    border: none;
    padding: 0.9rem 2rem;
    margin: 0;
    width: 200px;
    font-family: var(--secFont);
    letter-spacing: 1px;
    position: relative;
    display: flex;
    gap: 10px;
    align-items: center;
    text-decoration: none;
    font-weight: 700;
    border-radius: 50px;
    overflow: hidden;
    background: var(--baseOrange);
    color: black;
    transform: translateX(400px);
    opacity: 0;
    box-shadow: var(--secShadow);
    transition: all .4s ease;
}
.router.active{
    color:white;

}
.router.logged{
    transform: translateX(0);
    opacity: 1;
}
.router.active::before{
    background: var(--baseOrange);
}
.router *{
    position: relative;
    z-index: 10;
    font-size: 14px;
    transition: all .4s;
}
.router:hover *{
    color:white;
    scale: 1.2;
}

.router::before,
.router::after{
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}
.router::before{
    content: "";
    background: white;
    width: 120%;
    left: -10%;
    transform: skew(90dg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}
.router:hover::before{
    transform: translate3d(100%,0,0);
}
@media (max-width: 600px) {
    .container{
        display: none;
    }
}
</style>