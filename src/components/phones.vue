<script setup>
import { useRoute } from 'vue-router'; // Importado para obtener la ruta actual

const route = useRoute(); // Obtiene la ruta actual
const isActive = (path) => route.path === path;// Función para verificar si el enlace es el activo
</script>
<template>
    <section class="container">
        <nav id="op-nav">
            <router-link 
                to="/phones/cel-form" 
                class="router"
                :class="{'active': isActive('/phones/cel-form')}" 
            >
                Ingreso
            </router-link>
            <router-link 
                to="/phones/check-list" 
                class="router" 
                :class="{ 'active': isActive('/phones/check-list') }"
            >
                Facturas
            </router-link>
        </nav>
        <router-view class="info-container"></router-view>
    </section>
</template>
<style scoped>
.container {
    background-color: rgb(255, 255, 255);
    position: relative;
    margin: 0 auto;
    width: 92%;
    height: 600px;
    border-radius: 10px;
    box-shadow: 0 15px 10px 2px rgba(0, 0, 0, 0.676);
}

.info-container {
    height: 100%;
}

#op-nav {
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    display: flex;
    gap: 1px;
    justify-content: start;
    border-radius: 5px;
    z-index: -1;
}

.router {
    text-decoration: none;
    color: white;
    background-color: rgb(70, 70, 70);
    padding: 5px 20px 40px;
    margin: 0;
    border-radius: 20px 20px 0 0;
    transition: all .5s ease;
}

.router.active {
    background-color: white;
    color: black;
    transform: translateY(-5px);
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.676);
}
</style>