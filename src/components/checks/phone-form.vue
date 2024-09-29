<script setup>
import { ref, onMounted } from 'vue';

// Definir propiedades
const props = defineProps({
    cel_num: {
        type: [String, Number],
        default: "2",
        required: true
    }
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
        const response = await fetch('https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                route: "device-list-by-brand",
                brand_id: selectedBrand.value,
                brand_name: brands.value.find(brand => brand.brand_id === selectedBrand.value).brand_name,
                page: 1
            }),
        });
        const result = await response.json();

        if (result.status === 200) {
            devices.value = result.data.device_list; // Ajusta esto según la estructura del JSON que obtienes
            alert(devices.value) // Verifica qué dispositivos se están obteniendo
        } else {
            console.error('Error en la respuesta de la API:', result.message);
            devices.value = []; // Limpiar dispositivos si hay un error
        }
    } catch (error) {
        console.error('Error al obtener los dispositivos:', error);
        devices.value = []; // Limpiar dispositivos si hay un error
    }
};

// Llamar a la función al montar el componente
onMounted(fetchBrands);
</script>

<template>
    <form class="form-container">
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
            <label for="desc-inp" class="input-container">
                <span>Precio:</span>
                <input type="number" id="desc-inp" min="20000" value="20000">
            </label>
            <label for="desc-inp" class="input-container">
                <span>Descripcion:</span>
                <input type="text" id="desc-inp">
            </label>
        </section>
    </form>
</template>


<style scoped>
.form-container {
    background-color: white;
    border-radius: 25px;
    padding: 20px 30px;
    border: 3px solid var(--baseOrange);
    box-shadow: var(--baseShadow);
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.form-container section{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.input-container {
    margin-top: 20px;
    background-color: var(--baseGray);
    padding: 20px 25px;
    color: rgb(113,113,113);
    text-transform: uppercase;
    display:flex;
    min-width: 400px;
    gap: 10px;
    border-radius: 10px;
    font-weight: bolder;
    align-items: center;
    box-shadow: var(--secShadow);
}
.input-container *{
    width: 100%;
    appearance: none; /* Elimina el estilo predeterminado */
    background: transparent; /* Fondo transparente */
    border: none; /* Sin borde */
    padding: 0; /* Sin relleno */
    margin: 0; /* Sin margen */
    font: inherit;
    color: white;
}
.input-container select option{
    color: black;
}
/* Estilo para mantener la flecha (no todos los navegadores lo permiten) */
.input-container select::-ms-expand {
    display: none; /* Para IE y Edge */
}
.input-container *{
    scale: 1.1;
}
</style>
