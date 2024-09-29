<script setup>
import {ref} from 'vue';
import phoneForm from './phone-form.vue';

const phones_count = ref(3)
</script>
<template>
    <section class="container">
        <form class="client-form">
            <label for="name-inp" class="input-container">
                <ion-icon name="person-add"></ion-icon>
                <input type="text" placeholder="NOMBRE CLIENTE" id="name-inp">
            </label>
            <label for="tel-inp" class="input-container">
                <ion-icon name="call"></ion-icon>
                <input type="text" placeholder="NUMERO DE TELEFONO" id="tel-inp">
            </label>
            <label for="cant-inp" class="input-container">
                <ion-icon name="call"></ion-icon>
                <input type="number" placeholder="CANTIDAD DISPOSITIVOS" min="1" max="5" value="1" id="cant-inp">
            </label>
            <button type="submit" class="nxt-btn">
                <span>SIGUIENTE</span>
                <ion-icon name="caret-forward"></ion-icon>
            </button>
        </form>

        <phoneForm v-for="i in phones_count" :key="i"></phoneForm>
    </section>
</template>
<style scoped>
.container{
    all: unset;
    width: 100%;
}
.client-form{
    background-color: white;
    width: 100%;
    padding: 20px 30px;
    border-radius: 25px;
    border: 3px solid  var(--baseGray);
    box-shadow: var(--baseShadow);
    display: flex;
    justify-content: space-evenly;
}

.input-container{
    background: var(--baseGray);
    padding: 10px 20px;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-width: 250px;
    gap: 20px;
    color: white;
    cursor: pointer;
    transition: .4s;
    font-weight: bolder;
}
/* Cambia el color del contenedor cuando el input está enfocado */
.input-container:focus-within {
  background-color: var(--baseOrange);
}
.input-container ion-icon{
    scale: 1.3;
}
.input-container input{
    all: unset;
    scale: 1;
    text-transform: uppercase;
    width: 100%;
}
.nxt-btn{
    all: unset;
    background-color: var(--baseOrange);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    letter-spacing: 1px;
    gap: 10px;
    color: white;
    border: 3px solid var(--baseOrange);
    transition: .4s;
}
.nxt-btn *{
    font-weight: bolder;
    scale: 1.05;
    transition: .4s;
}
.nxt-btn:hover{
    background-color: var(--baseGray);
}
.nxt-btn:hover *{
    scale: 1.15;
}
</style>