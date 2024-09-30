<script setup>
import { ref, onMounted, computed } from 'vue';
import phoneForm from './phone-form.vue';

const phones_count = ref(1); // Inicialmente 1
const bill_total = ref(0); // Total de la factura

// Función para formatear el número
function formatNumber(value) {
    let formattedValue = value.toString().replace(/\D/g, '');
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Computed para formatear el valor de bill_total
const formattedBillTotal = computed(() => formatNumber(bill_total.value));

// Función para actualizar el total de la factura
function updateBillTotal(price, index) {
    bill_total.value = 0;
    phonePrices.value[index] = price; // Actualizamos el precio del dispositivo en la posición correspondiente
    bill_total.value = phonePrices.value.reduce((acc, val) => acc + val, 0);
}

const phonePrices = ref(Array(phones_count.value).fill(0)); // Array para almacenar los precios de los teléfonos

</script>

<template>
    <form class="container">
        <section class="client-form">
            <label for="name-inp" class="input-container">
                <ion-icon name="person-add"></ion-icon>
                <input type="text" placeholder="NOMBRE CLIENTE" id="name-inp">
            </label>
            <label for="tel-inp" class="input-container">
                <ion-icon name="call"></ion-icon>
                <input type="text" placeholder="NUMERO DE TELEFONO" id="tel-inp">
            </label>
            <label for="cant-inp" class="input-container">
                <ion-icon name="call"></ion-icon>
                <input v-model="phones_count" type="number" placeholder="CANTIDAD DISPOSITIVOS" min="1" max="5" id="cant-inp">
            </label>
        </section>

        <!-- Usamos la etiqueta transition para animar el phoneForm -->
        <transition-group name="fade" tag="div" class="phone-forms">
            <phoneForm 
                v-for="i in phones_count" 
                :key="i" 
                :cel_num="i" 
                :onPriceUpdate="(price) => updateBillTotal(price, i - 1)">
            </phoneForm>
        </transition-group>

        <section class="bill-form">
            <label class="input-container">
                <ion-icon name="cash-outline"></ion-icon>
                <span>TOTAL FACTURA: $ <span>{{ formattedBillTotal }}</span></span>
            </label>
            <label for="payment-inp" class="input-container">
                <ion-icon name="cash-outline"></ion-icon>
                <input type="number" placeholder="ABONO" id="payment-inp" class="price-input">
            </label>
        </section>
    </form>
</template>

<style scoped>
.container {
    all: unset;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;
    padding: 10px 20px;
}

.container::-webkit-scrollbar {
    display: none;
}

.client-form,
.bill-form {
    flex-wrap: wrap;
    background-color: white;
    width: 100%;
    padding: 20px 30px;
    border-radius: 25px;
    border: 4px solid var(--baseGray);
    box-shadow: var(--baseShadow);
    display: flex;
    justify-content: space-evenly;
    transition: .4s;
}

.client-form:focus-within,
.bill-form:focus-within {
    border-color: var(--baseOrange)
}

.input-container {
    background: var(--baseGray);
    padding: 10px 20px;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-width: 250px;
    gap: 20px;
    color: white;
    cursor: pointer;
    transition: .4s;
    font-weight: bolder;
    box-shadow: var(--secShadow);
}

/* Cambia el color del contenedor cuando el input está enfocado */
.input-container:focus-within {
    background-color: var(--baseOrange);
}

.input-container ion-icon {
    scale: 1.3;
}

.input-container input {
    all: unset;
    scale: 1;
    text-transform: uppercase;
    width: 100%;
}

.phone-forms {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Estilos para la transición de fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
