<script setup>
import bill_li from './bill-li.vue';
</script>
<template>
    <section class="container">
        <ol>
            <bill_li v-for="i in 4" :key="i" bill_number="0001-A" entry_date="08-06-2004" client_name="DAVID CARRILLO"></bill_li>
        </ol>
    </section>
</template>

<style scoped>
.container{
    all:unset
}
.container ol{
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    list-style: none;
    max-height: 400px;
    overflow: scroll;
}
.container ol::-webkit-scrollbar{
    display: none;
}
.container ol *{
    margin:0;
}
</style>