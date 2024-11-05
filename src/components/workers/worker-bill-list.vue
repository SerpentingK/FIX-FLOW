<script setup>
import bill_li from './worker-bill-li.vue';
</script>
<template>
    <section class="list-container">
        <ol>
            <bill_li v-for="i in 8" :key="i" bill_number="0001-A" entry_date="08-06-2004" client_name="DAVID CARRILLO"></bill_li>
        </ol>
    </section>
</template>

<style scoped>
.list-container{
    background-color: white;
    padding: 5px;
    width: 100%;
}
ol{
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding: 10px 20px;
    overflow: scroll;
    max-height: 200px;
    gap: 10px;
    scrollbar-width: none;
}
</style>