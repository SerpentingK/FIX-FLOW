<script setup>
import { ref, inject, provide } from 'vue';
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
const switch_spw = inject('switch_spw')
</script>

<template>
    <div class="info-container">
        <button class="back-btn" @click="show_bill_info()"><ion-icon name="arrow-undo"></ion-icon></button>
        <div class="base-info">
            <span class="info-span">
                <div>Numero de factura:</div>
                <div>{{ bill_number }}</div>
            </span>
            <span class="info-span">
                <div>Cliente:</div>
                <div>{{ client_name }}</div>
            </span>
            <span class="info-span">
                <div>Telefono del cliente:</div>
                <div>{{ client_phone }}</div>
            </span>
            <span class="info-span">
                <div>Tecnico que lo recibió:</div>
                <div>{{ wname }}</div>
            </span>
            <span class="info-span">
                <div>Fecha de entrada:</div>
                <div>{{ entry_date }}</div>
            </span>
        </div>

        <div class="phone-info-container" v-for="phone in phones_list" :key="phone">
            <span class="info-span">
                <div>Referencia dispositivo:</div>
                <div>{{ phone.phone_ref }}</div>
            </span>
            <span class="info-span">
                <div>Dispositivo:</div>
                <div>{{ phone.brand }} {{ phone.device }}</div>
            </span>
            <span class="info-span">
                <div>Descripcion:</div>
                <div>{{ phone.details}}</div>
            </span>
            <span class="info-span">
                <div>Precio:</div>
                <div>{{ phone.price }}</div>
            </span>
            <span v-if="phone.delivery_date" class="info-span">
                <div>Fecha de entrega:</div>
                <div>{{ phone.delivery_date }}</div>
            </span>
            <span class="state-info">
                <button class="state-btn" :class="{ active: phone.repaired}">REPARADO</button>
                <button class="state-btn" :class="{ active: phone.delivered}">ENTREGADO</button>
            </span>
        </div>
        <div class="cash-info-container">
            <span class="info-span">
                <div>Total:</div>
                <div>{{ total_price }}</div>
            </span>
            <span class="info-span">
                <div>Abono:</div>
                <div>{{ payment }}</div>
            </span>
            <span class="info-span">
                <div>A pagar:</div>
                <div>{{ due }}</div>
            </span>
        </div>
        <div class="payment-buttons">
            <button class="payment-btn" @click="switch_spw()">Abonar</button>
            <button class="payment-btn">Totalizar pago</button>
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

.base-info, .cash-info-container {
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
    border-radius: 10px;
}

.info-span{
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bolder;
}
.info-span *{
    font-weight: bold;
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
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: white;
    padding: 20px 40px;
    border-radius: 10px;
}
.phone-info-container span{
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.state-btn{
    all: unset;
    background-color: var(--baseGray);
    padding: 10px 20px;
    color: white;
    font-weight: bolder;
    letter-spacing: 2px;
    border: 4px solid var(--baseOrange);
    border-radius: 30px;
    box-shadow: var(--secShadow);
    cursor: pointer;
    transition: .3s;
}
.state-btn:hover{
    scale: 1.05;
}
.state-btn.active{
    background-color: var(--baseOrange);
}
.state-btn.active *{
    scale: 1.2;
}
.payment-buttons{
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 10px 20px;
}
.payment-btn{
    all: unset;
    cursor: pointer;
    transition: .2s;
    background-color: var(--baseGray);
    padding: 10px 30px;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bolder;
    border-radius: 10px;
    color: white;
    box-shadow: var(--secShadow);
    border: 4px solid var(--baseOrange);
}
.payment-btn:hover{
    background-color: var(--baseOrange);
}
</style>