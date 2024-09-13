<script setup>
defineProps({
    category:{
        type: String,
        required: true
    },
    phone_name:{
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
        <div class="category">{{category}}</div>
        <div>{{phone_name}}</div>
        <div>{{quantity}}</div>
    </li>
</template>

<style scoped>
li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: var(--baseGray);
    margin-top: 25px;
    padding: 20px 40px;
    color: white;
    border-radius: 30px;
    box-shadow: var(--baseShadow);
}
.category{
    background-color: var(--baseOrange);
    padding: 10px 20px;
    border-radius: 35px;
}
</style>