<script setup>
import ref from 'vue';
defineProps({
    cel_num:{
        type: String,
        default: 1,
        required: true
    }
})
</script>

<template>
    <section class="container">
        <h2> Celular {{ cel_num }}</h2>
        <label>
            <span>Tipo: </span>
        </label>
    </section>
</template>

<style scoped>
.container{
    background-color: white;
    padding: 10px 30px;
}
</style>