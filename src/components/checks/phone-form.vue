<script setup>
import { ref, onMounted, inject } from 'vue';

// Definir propiedades
const props = defineProps({
    cel_num: {
        type: [String, Number],
        default: "2",
        required: true
    }
});

// Inyectar bill_total y updateBillTotal
const updateBillTotal = inject('updateBillTotal');

// Mantener el valor anterior del precio
let previousValue = 0;

// Formatear el precio y actualizar bill_total
function formatPrice(input) {
    // Eliminar cualquier carácter no numérico
    let value = input.value.replace(/\D/g, '');
    
    // Convertir el valor a número
    const newValue = Number(value) || 0;

    // Restar el valor anterior y sumar el nuevo valor
    updateBillTotal(newValue - previousValue);

    // Actualizar el valor anterior
    previousValue = newValue;

    // Agregar el formato de miles usando replace y expresión regular
    input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Usamos onMounted para asegurarnos de que el DOM está listo
onMounted(() => {
    // Seleccionamos todos los inputs con la clase 'price-input'
    const priceInputs = document.querySelectorAll('.price-input');

    // Recorremos cada input y le agregamos el evento 'input'
    priceInputs.forEach(function(input) {
        input.addEventListener('input', function () {
            formatPrice(this);
        });
    });
});

// Marcas de celulares
const marks = [
  "Samsung",
  "Xiaomi",
  "Huawei",
  "Apple",
  "Motorola",
  "Nokia",
  "OnePlus",
  "Oppo",
  "Realme",
  "Vivo",
  "Sony",
  "Google",
  "LG",
  "ZTE",
  "Asus",
  "Lenovo",
  "Meizu",
  "Alcatel",
  "Honor",
  "Tecno",
  "Infinix",
  "BlackBerry",
  "Otro"
];

// Variable reactiva para la marca seleccionada
const selectedBrand = ref(marks[0]);

</script>

<template>
    <section class="form-container">
        <h2>CELULAR {{ cel_num }}</h2>
        <section>
            <label for="brand-select" class="input-container">
                <span>Seleccione una marca:</span>
                <select id="brand-select" v-model="selectedBrand">
                    <option v-for="mark in marks" :key="mark" :value="mark">
                        {{ mark }}
                    </option>
                </select>
                <!-- Mostrar input solo si la marca seleccionada es "Otro" -->
                <input v-if="selectedBrand === 'Otro'" type="text" placeholder="Otro">
            </label>
            <label for="model-inp" class="input-container">
                <span>Modelo:</span>
                <input type="text" id="model-inp">
            </label>
            <label for="desc-inp" class="input-container">
                <span>Descripción:</span>
                <input type="text" id="desc-inp">
            </label>
            <label for="price-inp" class="input-container">
                <span>Precio:</span>
                <input type="number" id="price-inp" min="10000" value="10000" class="price-input">
            </label>
        </section>
    </section>
</template>

<style scoped>
.input-container input::-webkit-inner-spin-button,
.input-container input::-webkit-outer-spin-button {
    display: none;
}
.form-container {
    background-color: white;
    border-radius: 25px;
    padding: 20px 30px;
    border: 4px solid var(--baseGray);
    box-shadow: var(--baseShadow);
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: .4s;
}
.form-container:focus-within {
    border-color: var(--baseOrange);
}
.form-container section {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.input-container:focus-within {
    background-color: var(--baseOrange);
}
.input-container {
    transition: .4s;
    margin-top: 20px;
    background-color: var(--baseGray);
    padding: 20px 25px;
    color: rgb(113,113,113);
    text-transform: uppercase;
    display: flex;
    min-width: 400px;
    gap: 10px;
    border-radius: 10px;
    font-weight: bolder;
    align-items: center;
    box-shadow: var(--secShadow);
}
.input-container * {
    width: 100%;
    appearance: none;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    padding: 5px 10px;
    font: inherit;
    color: white;
}
.input-container select option {
    color: black;
}
.input-container select::-ms-expand {
    display: none;
}
.input-container * {
    scale: 1.1;
}
</style>
