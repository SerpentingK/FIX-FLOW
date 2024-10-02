<script setup>
import { ref } from 'vue';
import bill_li from './bill-li.vue';

const options = ref(["N. Factura", "Cliente", "Fecha"]);
const selectedOption = ref(options.value[0]); // Mantiene el valor seleccionado

</script>

<template>
    <section class="container">
        <nav class="search-bar">
            <form action="" class="search-form">
                <select id="searchOption" v-model="selectedOption">
                    <option v-for="option in options" :key="option">
                        {{ option }}
                    </option>
                </select>
                <input v-if="selectedOption !== 'Fecha'" type="text" placeholder="Buscar...">
                <input v-else type="date">
                <button type="submit">Buscar</button>
            </form>
        </nav>
        <section class="checks-section">
            <ul>
                <bill_li v-for="i in 4" :key="i" :check_num="`A-000${i}`" client_name="Felipe Sierra" check_date="08/06/2004" total_price="50000"></bill_li>
            </ul>
        </section>
    </section>
</template>

<style scoped>
*{
    all: unset;
}

.container{
    border:none;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: none;
}
.search-bar{
    background-color: var(--baseGray);
    padding: 10px;
    width: 50%;
    height: auto;
    padding: 20px 50px;
    margin-top: 20px;
    border-radius: 20px;
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
    cursor: pointer;
}
.search-form input{
    background-color: white;
    border-radius: 5px;
    padding: 0 20px;
    cursor: pointer;
}
.search-form button{
    cursor: pointer;
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
