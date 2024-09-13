<script setup>
import { useRoute } from 'vue-router'; // Importado para obtener la ruta actual

const route = useRoute(); // Obtiene la ruta actual
const isActive = (path) => route.path === path;// Función para verificar si el enlace es el activo
</script>
<template>
    <section class="container">
        <nav id="op-nav">
            <router-link 
                to="/spareParts/list-spare" 
                class="router"
                :class="{'active': isActive('/spareParts/list-spare')}" 
            >Repuestos</router-link>
            <router-link 
                to="/spareParts" 
                class="router" 
                :class="{ 'active': isActive('/spareParts') }"
            >Categorias</router-link>
        </nav>
        <router-view class="info-container"></router-view>
    </section>
</template>
<style scoped>
.container {
    background-color: rgb(255, 255, 255);
    position: relative;
    margin: 0 auto;
    width: 82%;
    height: 600px;
    border-radius: 10px;
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
    justify-content: start;
    border-radius: 5px;
    z-index: -1;
}

.router {
    text-decoration: none;
    color: white;
    background-color: rgb(129, 129, 129);
    padding: 5px 20px 40px;
    margin: 0;
    border-radius: 20px 20px 0 0;
    transition: all .5s ease;
}

.router.active {
    background-color: white;
    color: black;
    transform: translateY(-5px);
}
</style>