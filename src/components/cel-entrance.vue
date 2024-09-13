<script setup>
</script>
<template>
    <section class="container">
        <h2>Ingreso de facturas</h2>
        <form class="cel-form">
            <label for="in-client-name" class="in-container">
                <span>Nombre Cliente: </span>
                <input type="text" id="in-client-name">
            </label>
        </form>
        <section class="cells-container">
            a
        </section>
    </section>

</template>
<style scoped>
.container {
    all: unset;
    display: grid;
    background-color: aqua;
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
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
}

.cel-form {
    border: 2px solid red;
    width: 80%;
    padding: 10px 30px;
    display: grid;
    grid-area: 2 / 1 / 3 / 2;
}

.in-container {
    background-color: gray;
    padding: 20px;
    margin-top: 30px;
}
.cells-container{
    grid-area: 1 / 2 / 3 / 3;
    background-color: blue;
}
</style>