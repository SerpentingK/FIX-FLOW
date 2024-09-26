<script setup>
    import workerLi from './worker-li.vue';
</script>

<template>
    <section class="container">
        <h2>LISTA DE COLABORADORES</h2>
        <ol>
            <workerLi v-for="i in 3" :key="i" wname="Juan" document="1019983157" wrole="Gerente"></workerLi>
        </ol>
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
    border: 4px solid var(--baseOrange);          
}
.container h2{
    font-size: 30px;
    font-weight: bolder;
    text-shadow: var(--baseShadow);
    font-family: var(--titleFont);
    background: linear-gradient(90deg,
            var(--baseOrange), white);
    background-clip: text;
    letter-spacing: 1.5px;
    -webkit-text-fill-color: transparent;
    /* Sombra arriba a la izquierda */
    margin-bottom: 20px;
}
ol{
    display: flex;
    list-style: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    gap:30px;
}
</style>