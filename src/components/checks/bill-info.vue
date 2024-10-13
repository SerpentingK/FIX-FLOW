<script setup>
import { ref, inject } from 'vue';
defineProps({
    bill_number: {
        type: String,
        required: true
    },
    client_name: {
        type: String,
        required: true
    },
    entry_date: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    due: {
        type: Number,
        required: false,
        default: 0
    },
    payment: {
        type: Number,
        required: false,
        default: 0
    },
    client_phone: {
        type: String,
        required: true
    },
    wname: {
        type: String,
        required: true
    },
    phones_list: {
        type: Array,
        required: true
    }

})

const show_letter = inject('show_letter')
</script>

<template>
    <div class="info-container">
        a
    </div>
</template>

<style scoped>
.info-container{
    position: absolute;
    background-color: var(--baseGray);
    min-height: 300px;
    width: 80%;
    box-shadow: var(--baseShadow);
    padding: 20px 30px;
    border-radius: 20px;
    border:4px solid var(--baseOrange);
}
</style>