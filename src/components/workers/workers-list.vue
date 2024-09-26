<script setup>
    import workerLi from './worker-li.vue';
</script>

<template>
    <section class="container">
        <h2>LISTA DE COLABORADORES</h2>
            <workerLi></workerLi>
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
</style>