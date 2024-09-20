<script setup>
import { ref } from "vue";
import parts from "./spare-part.vue";

const optionsSp = ref(["Pantallas", "Pachas", "Baterias"]);
</script>

<template>
    <section class="container">
        <form action="" class="search-form">
            <select name="" id="category-select">
                <option class="search-option" v-for="i in optionsSp" :key="i">{{ i }}</option>
                <ion-icon name="caret-down-outline"></ion-icon>
            </select>
            <input type="text" name="">
            <button type="submit">Buscar</button>
        </form>
        <div class="parts-container">
            <ul>
              <parts v-for="i in 4" :key="i" category="Pantalla" phone_name="Samsung A14" :quantity="`${i}`"></parts>
            </ul>
          </div>
    </section>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    justify-content: flex-start;
}

.search-form {
    background-color: var(--baseGray);
    padding: 10px 30px;
    border-radius: 30px;
    display: flex;
    justify-content: space-around;
    width: 70%;
    box-shadow: var(--baseShadow);
}

#category-select{
    padding: 5px 20px;
    border: none;
    background-color: white;
    border-radius: 10px;
}
.search-form input{
    all: unset;
    background: white;
    border-radius: 10px;
    padding: 5px 20px;
}
.search-form button{
    background-color: var(--baseOrange);
    padding: 0 20px;
    border-radius: 5px;
    color: white;
    transition: all .3s ease;;
    border: 2px solid transparent;
}
.search-form button:hover{
    border: 2px solid white;
}
</style>
