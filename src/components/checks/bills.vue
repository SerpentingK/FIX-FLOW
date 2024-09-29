<script setup>
import { useRoute } from 'vue-router'; // Importado para obtener la ruta actual

const route = useRoute(); // Obtiene la ruta actual
const isActive = (path) => route.path === path;// Función para verificar si el enlace es el activo
</script>
<template>
    <section class="container">
        <nav class="op-nav">
            <router-link to="/bills/bill-entrance" class="router"
                :class="{ 'active': isActive('/bills/bill-entrance') }">
                <ion-icon name="enter-outline"></ion-icon>
            </router-link>
            <router-link to="/bills/bill-list" class="router"
                :class="{ 'active': isActive('/bills/bill-list') }">
                <ion-icon name="file-tray-full-outline"></ion-icon>
            </router-link>
        </nav>
        <router-view></router-view>
    </section>
</template>
<style scoped>
.container {
    background-color: var(--baseGray);
    position: relative;
    margin: 0 auto;
    width: 92%;
    height: 650px;
    border-radius: 40px;
    border: 4px solid var(--baseOrange);
    box-shadow: 0 15px 10px 2px rgba(0, 0, 0, 0.676);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px 40px;
}
.op-nav{
    position: absolute;
    display: flex;
    gap:20px;
    top: -75px;
    left: 0;
}
.router{
    background-color: rgb(70, 70, 70);
    padding: 10px;
    color: white;
    text-decoration: none;
    border-radius: 10px 10px;
    cursor: pointer;
    display: flex;
    font-size: 30px;
    align-items: center;
    justify-content: center;
    box-shadow: var(--baseShadow);
    transition: all .4s ease;
}
.router.active{
    background-color: var(--baseGray);
    scale: 1.2;
}
</style>