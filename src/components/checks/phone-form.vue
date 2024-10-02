<script setup>
// Importar funciones y herramientas de Vue.js
import { ref, onMounted, inject, defineProps } from "vue";

// Definir propiedades que se pueden pasar al componente
const props = defineProps({
  cel_num: {
    type: [String, Number], // El tipo de la propiedad puede ser string o number
    default: "2", // Valor por defecto
    required: true, // Propiedad obligatoria
  },
});

// Inyectar la función updateBillTotal desde el padre
const updateBillTotal = inject('updateBillTotal');

// Mantener el valor anterior del precio
let previousValue = 0;

// Variable reactiva para el precio
const price = ref(0);

// Función para manejar el input de precio
const handlePriceInput = (event) => {
  // Obtener el nuevo precio como número, eliminando caracteres no numéricos
  const newPrice = Number(event.target.value.replace(/\D/g, "")) || 0;

  // Actualizar el total de la factura con la diferencia del nuevo precio y el valor anterior
  updateBillTotal(newPrice - previousValue);

  // Actualizar el valor anterior con el nuevo precio
  previousValue = newPrice;
};

// Función que se ejecuta cuando el componente se monta
onMounted(() => {
  // Puedes configurar el input de precio aquí, si necesitas hacer algo adicional
});

// Variables reactivas para gestionar el estado del componente
const brands = ref([]); // Lista de marcas
const devices = ref([]); // Lista de dispositivos
const selectedBrand = ref(null); // Marca seleccionada
const selectedDevice = ref(null); // Dispositivo seleccionado
const page = ref(1); // Página actual para paginación
const hasMoreDevices = ref(true); // Controlar si hay más dispositivos para cargar

// Función para obtener la lista de marcas
const fetchBrands = async () => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec?route=brand-list");
    const result = await response.json();
    if (result.status === 200) {
      brands.value = result.data;
    } else {
      console.error("Error en la respuesta de la API:", result.message);
    }
  } catch (error) {
    console.error("Error al obtener las marcas:", error);
  }
};

// Función para obtener la lista de dispositivos según la marca seleccionada
const fetchDevices = async (append = false) => {
  if (!selectedBrand.value) return;

  try {
    const raw = `{
      "route": "device-list-by-brand",
      "brand_id": ${selectedBrand.value},
      "brand_name": "${brands.value.find(brand => brand.brand_id === selectedBrand.value).brand_name}",
      "page": ${page.value}
    }`;

    const response = await fetch("https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec", {
      method: "POST",
      body: raw,
      redirect: "follow",
    });

    const result = await response.json();
    if (result && result.data.device_list.length > 0) {
      devices.value = append ? [...devices.value, ...result.data.device_list] : result.data.device_list;
      hasMoreDevices.value = result.data.device_list.length > 0;
    } else {
      hasMoreDevices.value = false;
    }
  } catch (error) {
    console.error("Error al obtener los dispositivos:", error);
    devices.value = [];
  }
};

// Función para manejar el cambio de marca
const handleBrandChange = () => {
  devices.value = [];
  page.value = 1;
  fetchDevices();
};

// Función para cargar más dispositivos
const loadMoreDevices = (event) => {
  event.preventDefault();
  page.value++;
  fetchDevices(true);
};

// Llamar a fetchBrands cuando el componente se monta
onMounted(fetchBrands);
</script>

<template>
  <section class="form-container">
    <h2>CELULAR {{ cel_num }}</h2>
    <section>
      <label :for="`brand-select-${cel_num}`" class="input-container">
        <span>Seleccione una marca:</span>
        <select
          :id="`brand-select-${cel_num}`"
          v-model="selectedBrand"
          @change="handleBrandChange"
        >
          <option
            v-for="(brand, index) in brands"
            :key="brand.brand_id"
            :value="brand.brand_id"
          >
            {{ brand.brand_name }}
          </option>
          <option value="Otro">Otro</option>
        </select>
      </label>
      <label :for="`device-select-${cel_num}`" class="input-container">
        <span>Seleccione un modelo:</span>
        <select :id="`device-select-${cel_num}`" v-model="selectedDevice">
          <option
            v-for="(device, index) in devices"
            :key="index"
            :value="device.key"
          >
            {{ device.device_name }}
          </option>
          <option value="Otro">Otro</option>
        </select>
        <button v-if="hasMoreDevices" @click="loadMoreDevices">
          Ver más
        </button>
      </label>
      <label :for="`desc-inp-${cel_num}`" class="input-container">
        <span>Descripcion:</span>
        <input type="text" :id="`desc-inp-${cel_num}`" />
      </label>
      <label :for="`price-inp-${cel_num}`" class="input-container">
        <span>Precio:</span>
        <input
          type="number"
          :id="`price-inp-${cel_num}`"
          class="price-input"
          v-model="price"
          @input="handlePriceInput"
        />
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
  transition: 0.4s;
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
  transition: 0.4s;
  margin-top: 20px;
  background-color: var(--baseGray);
  padding: 20px 25px;
  color: rgb(113, 113, 113);
  text-transform: uppercase;
  display: flex;
  min-width: 600px;
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
.input-container *:focus {
    border: none;
    outline: none;
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
