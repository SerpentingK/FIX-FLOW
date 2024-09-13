<script setup>
defineProps({
    Category:{
        type: String,
        required: true
    },
    ref_phone:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
})
</script>

<template>
    <li>
        <div class="category">{{Category}}</div>
        <div>{{ref_phone}}</div>
        <div>{{quantity}}</div>
    </li>
</template>

<style scoped>
li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: rgb(54, 54, 54);
    margin-top: 25px;
    padding: 20px 40px;
    color: white;
    border-radius: 30px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.676);
}
.category{
    background-color: rgb(216, 75, 23);
    padding: 10px 20px;
    border-radius: 35px;
}
</style>