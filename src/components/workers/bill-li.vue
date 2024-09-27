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
    <button>
        <span>{{ entry_date}}</span>
        <span>{{ bill_number }}</span>
        <span>{{ client_name }}</span>
    </button>
</template>

<style scoped>
button{
    all: unset;
    background-color: var(--baseGray);
    padding: 10px 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    border-radius: 25px;
    transition: .6s;
}
button:hover{
    filter: contrast(200%);
}
button span{
    color: var(--baseGray);
    background-color: white;
    min-width: 200px;
    border-radius: 15px;
    padding: 10px 20px;
    font-weight: bolder;
}
</style>
