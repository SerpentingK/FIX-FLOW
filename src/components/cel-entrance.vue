<script setup>
import celForm from './cel-form.vue';
</script>
<template>
    <section class="container">
        <h2>Ingreso de facturas</h2>
        <form class="cel-form">
            <label for="in-client-name" class="in-container">
                <ion-icon name="people-circle-outline" style="font-size: 25px;"></ion-icon>
                <span>Cliente: </span>
                <input type="text" id="in-client-name">
            </label>
            <label for="in-client-phone" class="in-container">
                <span>Telefono: </span>
                <input type="text" id="in-client-phone">
            </label>
            <label for="in-cel-num" class="in-container">
                <span>Cels:  </span>
                <input type="number" id="in-cel-num" min="1" max="5">
            </label>
            <celForm v-for="i in 10" :key="i"></celForm>
        </form>
        <section class="cells-container">
            a
        </section>
    </section>

</template>
<style scoped>
*{
    font-family: "SUSE", sans-serif;
}
.container {
    all: unset;
    display: grid;
    height: 90%;
    width: 90%;
    padding: 10px;
    grid-template-columns: 75% 25%;
    grid-template-rows: 15% 85%;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
}
.container h2{
    grid-area: 1 / 1 / 2 / 2; 
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cel-form {
    width: 100%;
    padding: 10px 30px;
    display: flex;
    grid-area: 2 / 1 / 3 / 2;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: aqua;
    gap: 5px;
    align-items: center;
    height: auto;
    overflow-y: scroll;
    overflow-x: hidden;
}
.cel-form::-webkit-scrollbar {
    display: none; /* Oculta la barra de desplazamiento en navegadores WebKit */
}

.in-container {
    background-color: var(--baseGray);
    color: white;
    font-weight: bolder;
    padding: 20px;
    margin-top: 30px;
    border-radius: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
}
.in-container input{
    all: unset;
}
.cells-container{
    grid-area: 1 / 2 / 3 / 3;
    background-color: blue;
}
</style>