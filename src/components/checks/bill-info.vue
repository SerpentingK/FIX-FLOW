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

const show_bill_info = inject('show_bill_info')
</script>

<template>
    <div class="info-container">
        <button class="back-btn" @click="show_bill_info()"><ion-icon name="arrow-undo"></ion-icon></button>
        <div class="base-info">
            <span>
                <div>Numero de factura:</div>
                <div>{{ bill_number }}</div>
            </span>
            <span>
                <div>Cliente:</div>
                <div>{{ client_name }}</div>
            </span>
            <span>
                <div>Telefono del cliente:</div>
                <div>{{ client_phone }}</div>
            </span>
            <span>
                <div>Tecnico que lo recibió:</div>
                <div>{{ wname }}</div>
            </span>
            <span>
                <div>Fecha de entrada:</div>
                <div>{{ entry_date }}</div>
            </span>
        </div>

        <div class="phone-info-container" v-for="phone in phones_list" :key="phone">
            <span>
                <div>Referencia dispositivo:</div>
                <div>{{ phone.phone_ref }}</div>
            </span>
            <span>
                <div>Dispositivo:</div>
                <div>{{ phone.brand }} {{ phone.device }}</div>
            </span>
            <span>
                <div>Descripcion:</div>
                <div>{{ phone.details}}</div>
            </span>
            <span>
                <div>Precio:</div>
                <div>{{ phone.price }}</div>
            </span>
        </div>
    </div>
</template>

<style scoped>
.info-container {
    position: absolute;
    background-color: var(--baseGray);
    height: 500px;
    width: 60%;
    box-shadow: var(--baseShadow);
    padding: 20px 30px;
    border-radius: 10px;
    border: 4px solid var(--baseOrange);
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: scroll;
    scrollbar-width: none;
}

.base-info {
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
    border-radius: 10px;
}

.base-info span {
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.base-info *{
    font-weight: bolder;
    font-size: 20px;
}
.back-btn{
    all: unset;
    position: absolute;
    left: 10px;
    top: 10px;
    box-shadow: var(--secShadow);
    color: white;
    background-color: var(--baseOrange);
    padding: 10px;
    border-radius: 50%;
    display: flex;
    font-size: 30px;
}
.phone-info-container{
    background-color: white;
    padding: 20px 40px;
    border-radius: 10px;
}
.phone-info-container span{
    display: flex;
    width: 100%;
    justify-content: space-between;
}
</style>