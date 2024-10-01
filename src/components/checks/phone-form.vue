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

// Variables reactivas
const brands = ref([]);
const devices = ref([]);
const selectedBrand = ref(null);
const selectedDevice = ref(null);

// Función para obtener marcas
const fetchBrands = async () => {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec?route=brand-list');
        const result = await response.json();

        if (result.status === 200) {
            brands.value = result.data;
        } else {
            console.error('Error en la respuesta de la API:', result.message);
        }
    } catch (error) {
        console.error('Error al obtener las marcas:', error);
    }
};

// Función para obtener dispositivos de la marca seleccionada
const fetchDevices = async () => {
    if (!selectedBrand.value) return;

    try {
        const raw = `{
        "route": "device-list-by-brand",
        "brand_id": ${selectedBrand.value},
        "brand_name": "${brands.value.find((brand) => brand.brand_id === selectedBrand.value).brand_name}",
        "page": 1
        }`;

        const requestOptions = {
            method: "POST",
            body: raw,
            redirect: "follow"
        }
        const response = await fetch("https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec", requestOptions);
        const result = await response.text();
        if (result) {
            devices.value = JSON.parse(result).data.device_list;
        } else {
            console.error('Error en la respuesta de la API:', result);
            devices.value = [];
        }
    } catch (error) {
        console.error('Error al obtener los dispositivos:', error);
        devices.value = [];
    }
};

// Llamar a la función al montar el componente
onMounted(fetchBrands);
</script>

<template>
    <section class="form-container">
        <h2>CELULAR {{ cel_num }}</h2>
        <section>
            <label for="brand-select" class="input-container">
                <span>Seleccione una marca:</span>
                <select id="brand-select" v-model="selectedBrand" @change="fetchDevices">
                    <option v-for="(brand, index) in brands" :key="brand.brand_id" :value="brand.brand_id">
                        {{ brand.brand_name }}
                    </option>
                    <option value="Otro">Otro</option>
                </select>
            </label>
            <label for="device-select" class="input-container">
                <span>Seleccione un modelo:</span>
                <select id="device-select" v-model="selectedDevice">
                    <option v-for="(device, index) in devices" :key="index" :value="device.key">
                        {{ device.device_name }}
                    </option>
                    <option value="Otro">Otro</option>
                </select>
            </label>
            <label for="desc-inp" class="input-container">
                <span>Descripcion:</span>
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
