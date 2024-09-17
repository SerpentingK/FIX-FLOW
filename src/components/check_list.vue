<script setup>
import { ref } from 'vue';
import check from './check.vue';

const options = ref(["N. Factura", "Cliente", "Fecha"]);
</script>

<template>
    <section class="container">
        <nav class="search-bar">
            <form action="" class="search-form">
                <select id="searchOption">
                    <option v-for="option in options" :key="option">
                        {{ option }}
                    </option>
                </select>
                <input type="text">
                <button type="submit">Buscar</button>
            </form>
        </nav>
        <section class="checks-section">
            <ul>
                <check v-for="i in 4" :key="i" :check_num="`A-000${i}`" client_name="Felipe Sierra" check_date="08/06/2004"></check>
            </ul>
        </section>
    </section>
</template>

<style scoped>
*{
    all: unset;
}

.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: none;
}
.search-bar{
    background-color: rgb(54, 54, 54);
    padding: 10px;
    width: 50%;
    height: auto;
    padding: 20px 50px;
    margin-top: 20px;
    border-radius: 40px;
    box-shadow: var(--baseShadow);
}
.search-form{
    display: flex;
    justify-content: space-around;
}
.search-form select{
    background-color: white;
    padding: 5px 30px; 
    border-radius: 5px;
}
.search-form input{
    background-color: white;
    border-radius: 5px;
    padding: 0 20px;
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
