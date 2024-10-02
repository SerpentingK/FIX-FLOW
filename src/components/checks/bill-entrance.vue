<script setup>
import { ref, onMounted, computed, provide } from 'vue';
import phoneForm from './phone-form.vue';
import bill from './bill.vue';

const phones_count = ref(1); // Inicialmente 1
const bill_total = ref(0); // Inicialmente 0

// Función para actualizar bill_total
const updateBillTotal = (difference) => {
  bill_total.value += difference;
};

// Proveer bill_total y la función updateBillTotal
provide('bill_total', bill_total);
provide('updateBillTotal', updateBillTotal);

// Computed para formatear el valor de bill_total
const formattedBillTotal = computed(() => formatNumber(bill_total.value));

const updateTotal = (newPrice) => {
    bill_total.value += newPrice; // Actualiza el total directamente
    calculateTotal(); // Asegúrate de recalcular el total
};

provide('updateBillTotal', updateTotal);

// Función para agregar el formato de miles a un número (para inputs y spans)
function formatNumber(value) {
    let formattedValue = value.toString().replace(/\D/g, '');
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Computed para obtener el valor del abono
const paymentAmount = ref(0); // Inicialmente 0

// Computed para mostrar el pendiente a pagar
const pendingAmount = computed(() => {
    return bill_total.value - paymentAmount.value;
});


const show_letter_switch = ref(false);
const show_letter = () => {
    show_letter_switch.value = !show_letter_switch.value;
}

// Función para calcular el total
const calculateTotal = () => {
    const priceInputs = document.querySelectorAll('.price-input');
    let total = 0;

    // Sumar todos los precios de los inputs
    priceInputs.forEach(input => {
        total += Number(input.value.replace(/\D/g, '')) || 0;
    });

    // Actualizar el bill_total
    bill_total.value = total;
};
// Función para manejar la actualización del precio
const onPriceUpdated = (newPrice) => {
    updateTotal(newPrice); // Llama a la función para actualizar el total
};


// Usamos onMounted para asegurarnos de que el DOM está listo
onMounted(() => {
    // Seleccionamos todos los inputs con la clase 'price-input' (para phoneForm)
    const priceInputs = document.querySelectorAll('.price-input');

    // Recorremos cada input de phoneForm y le agregamos el evento 'input'
    priceInputs.forEach(function (input) {
        input.addEventListener('input', function () {
            input.value = formatNumber(input.value); // Formatear el input
            calculateTotal(); // Llamar a la función para calcular el total
        });
    });

    // Formatear específicamente el input de payment
    const payment_inp = document.getElementById('payment-inp');
    payment_inp.addEventListener('input', function () {
        payment_inp.value = formatNumber(payment_inp.value); // Solo formatear

        // Actualizar el valor del abono
        paymentAmount.value = Number(payment_inp.value.replace(/\D/g, '')) || 0;
    });
});
</script>


<template>
    <form class="container" @submit.prevent="show_letter()">
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

        <transition-group name="fade" tag="div" class="phone-forms">
            <phoneForm 
                v-for="i in phones_count" 
                :key="i" 
                :cel_num="i" 
                @priceUpdated="onPriceUpdated">
            </phoneForm>
        </transition-group>

        <section class="bill-form">
            <label class="input-container">
                <ion-icon name="cash-outline"></ion-icon>
                <span>TOTAL FACTURA: $ <span>{{ formattedBillTotal }}</span></span>
            </label>
            <label for="payment-inp" class="input-container">
                <ion-icon name="cash-outline"></ion-icon>
                <input type="text" placeholder="ABONO" id="payment-inp" data-previous-value="0">
            </label>
            <label class="input-container">
                <ion-icon name="cash-outline"></ion-icon>
                <span>PENDIENTE A PAGAR: $ <span>{{ formatNumber(pendingAmount) }}</span></span>
            </label>
            <button type="submit" class="register-btn">
                <span class="reg-span">REGISTRAR</span>
                <ion-icon name="enter-outline"></ion-icon>
            </button>
        </section>
    </form>
    <bill v-if="show_letter_switch" style="position: absolute; z-index: 10;"></bill>
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
    border-color: var(--baseOrange);
}

.input-container {
    background: var(--baseGray);
    padding: 10px 20px;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-width: 300px;
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

.nxt-btn {
    all: unset;
    box-shadow: var(--secShadow);
    background-color: var(--baseOrange);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    letter-spacing: 1px;
    gap: 10px;
    color: white;
    border: 3px solid var(--baseOrange);
    transition: .4s;
}

.nxt-btn * {
    font-weight: bolder;
    scale: 1.05;
    transition: .4s;
}

.nxt-btn:hover {
    background-color: var(--baseGray);
}

.nxt-btn:hover * {
    scale: 1.15;
}

.phone-forms {
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: .4s;
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
.register-btn{
    background-color: var(--baseOrange);
    box-shadow: var(--secShadow);   
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    border: 2px solid var(--baseOrange);
    transition: .3s;
    overflow: hidden;
}
.register-btn ion-icon{
    scale: 1.5;
    transform: translateY(100px);
    transition: .6s;
}
.register-btn:hover{
    scale:1.1;
    color: var(--baseGray);
    background-color: white;
}
.register-btn:hover ion-icon{
    transform: translateY(0);

}
.register-btn:hover .reg-span{
    scale: 1.2;
    letter-spacing: 0;
}

.reg-span {
    transition: .2s;
    font-weight: bolder;
    letter-spacing: 1px;
    
}
</style>
