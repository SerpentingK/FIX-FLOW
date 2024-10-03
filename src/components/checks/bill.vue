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
    <section class="info-container">
        <div class="bill-info">
            <div class="fact-container">
                <span>Numero recibo:</span>
                <span>{{ bill_number }}</span>
            </div>
            <div class="fact-container">
                <span>Colaborador:</span>
                <span>{{ wname }}</span>
            </div>
            <div class="fact-container">
                <span>Cliente:</span>
                <span>{{ client_name }}</span>
            </div>
            <div class="fact-container">
                <span>Telefono cliente:</span>
                <span>{{ client_phone }}</span>
            </div>
            <div class="fact-container">
                <span>Fecha de entrada:</span>
                <span>{{ entry_date }}</span>
            </div>
            <div class="fact-container">
                <span>Precio total:</span>
                <span>${{ total_price }}</span>
            </div>
            <div class="fact-container">
                <span>Adelanto:</span>
                <span>${{ payment }}</span>
            </div>
            <div class="fact-container">
                <span>A pagar:</span>
                <span>${{ due }}</span>
            </div>
        </div>
        <div class="phones-info">
            <div class="phone-container" v-for="phone in phones_list" :key="phone">
                <div class="fact-container">
                    <span>Celular:</span>
                    <span>{{ phone.brand }} {{ phone.device }}</span>
                </div>
                <div class="fact-container">
                    <span>Precio:</span>
                    <span>${{ phone.price }}</span>
                </div>
                <div class="fact-container">
                    <span>Detalles:</span>
                    <span>{{ phone.details }}</span>
                </div>
                <div class="bool-info" :class="{true:phone.repaired}">
                    <span>REPARADO</span>
                </div>
                <div class="bool-info" :class="{true:phone.delivered}">
                    <span>ENTREGADO</span>
                </div>
                <div class="fact-container" v-if="phone.delivered">
                    <span>Fecha entregado:</span>
                    <span>{{ phone.delivery_date }}</span>
                </div>
            </div>
            <button class="cancel-btn" @click="show_letter()">CANCELAR</button>
            <button class="confirm-btn">CONFIRMAR</button>
        </div>
    </section>
</template>

<style scoped>
.info-container {
    max-height: 80%;
    background-color: var(--baseGray);
    width: 80%;
    border: 6px solid var(--baseOrange);
    padding: 30px 50px;
    border-radius: 20px;
    box-shadow: var(--baseShadow);
    display: flex;
    justify-content: space-between;
}

.bill-info {
    width: 30%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    flex-direction: column;

}

.fact-container {
    background-color: white;
    color: var(--baseGray);
    font-size: 20px;
    padding: 10px 30px;
    border-radius: 15px;
    border: 3px solid var(--baseGray);
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.fact-container span {
    font-weight: bolder;
}
.phones-info{
    width: 65%;
    padding: 0 0 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: scroll;
    scrollbar-width: none;
    align-items: center;
}
.phone-container{
    width: 100%;
    display: flex;
    background-color: white;
    padding: 15px 30px;
    box-shadow: var(--secShadow);
    border-radius: 10px;
    border: 2px solid var(--baseGray);
    gap: 20px;
    flex-wrap: wrap;
}
.phone-container .fact-container{
    background-color: var(--baseGray);
    color: white;
    border-color: var(--baseOrange);
}
.bool-info{
    background-color: var(--baseGray);
    border: 4px solid red;
    box-shadow: 0 0 10px 4px red;
    padding: 10px 20px;
    color: white;
    border-radius: 20px;
}
.bool-info.true{
    border-color: green ;
    box-shadow: 0 0 10px 4px green;
}
button{
    border: none;
    width: 60%;
    text-align: center;
    padding: 20px ;
    border-radius: 20px;
    font-size: 20px;
    font-weight: bolder;
    color: white;
    box-shadow: var(--secShadow);
    transition: .2s;
}
.confirm-btn{
    background-color: green;
}
.cancel-btn{
    background-color: red;
}
button:hover{
    scale: 1.05;
}
</style>