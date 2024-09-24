<script setup>
    import workerLi from './worker-li.vue';
</script>

<template>
    <section class="container">
        <h2>LISTA DE COLABORADORES</h2>
        <ul>
            <workerLi v-for="i in 3" :key="i" wname="Juan" document="1019983157" wrole="Gerente"></workerLi>
        </ul>
    </section>
</template>

<style scoped>
.container{
    background-color: var(--baseGray);
    padding:30px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
    box-shadow: var(--baseShadow);
    border-radius: 20px;          
}
ul{
    display: flex;
    list-style: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:30px;
    border: 2PX SOLID RED;
}
</style>