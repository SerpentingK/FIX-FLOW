<script setup>
defineProps({
    bill_number: {
        type: String,
        required: true,
        default: "A-0001"
    },
    client_name: {
        type: String,
        required: true,
        default: "CLIENTE DEFECTO"
    },
    entry_date: {
        type: String,
        required: true,
        deafult: "00-00-0000"
    }
})
</script>

<template>
    <li>
        <span>{{ entry_date}}</span>
        <span>{{ bill_number }}</span>
        <span>{{ client_name }}</span>
    </li>
</template>

<style scoped>
    li{
        display: flex;
        font-size: 12px;
        gap: 10px;
        
    }
</style>
