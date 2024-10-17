<script setup>
// Importar funciones y herramientas de Vue.js
import { ref, onMounted, inject, defineProps, watch, defineExpose } from "vue";
import axios from "axios";

// Definir propiedades que se pueden pasar al componente
const props = defineProps({
  cel_num: {
    type: [String, Number], // El tipo de la propiedad puede ser string o number
    default: "2", // Valor por defecto
    required: true, // Propiedad obligatoria
  },
});

// Inyectar la función updateBillTotal desde el padre
const updateBillTotal = inject("updateBillTotal");

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

  price.value = newPrice;
};

// Variables reactivas para gestionar el estado del componente
const brands = ref([]);

const selectedBrandName = ref("");

const newBrand = ref("");
const devices = ref([]); // Lista de dispositivos
const selectedDevice = ref("");
const detail = ref("");
const newDevice = ref("");
//nueva variable para contrarla visibilidad del campo de entrada
const showNewDeviceInput = ref(false);
// Nueva variable para controlar la visibilidad del campo de entrada
const showNewBrandInput = ref(false);
onMounted(async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/allBrands");
    brands.value = response.data;
  } catch (error) {
    console.error("Error cargando marcas desde la API", error);
  }
});

watch(selectedBrandName, async (newName) => {
  if (newName && newName !== "Otro") {
    try {
      // Obtener el ID de la marca seleccionada
      const brand = brands.value.find((b) => b.name === newName);
      if (brand) {
        const response = await axios.get(`http://127.0.0.1:8000/${selectedBrandName.value}/Devices`);
        devices.value = response.data;
      }
    } catch (error) {
      console.error("Error cargando dispositivos", error);
      devices.value = []; // Limpiar si hay error
    }
  }
});


const getPhoneData = () => {
  return {
    brand_name: selectedBrandName .value,
    device: selectedDevice.value,
    price: price.value,
    details: detail.value,
  };
};

const addNewBrand = async () => {
  if (newBrand.value && !brands.value.includes(newBrand.value)) {
    try {
      await axios.post("http://127.0.0.1:8000/newBrand", {
        name: newBrand.value,
      });
      brands.value.push({ name: newBrand.value });
      selectedBrandName.value = newBrand.value; // Seleccionar la nueva marca
      newBrand.value = ""; // Limpiar el campo de entrada
      showNewBrandInput.value = false; // Ocultar el campo de entrada
    } catch (error) {
      console.error("Error agregando nueva marca", error.data);
    }
  }
  return false;
};

const addNewDevice = async () => {
  if (newDevice.value && !devices.value.includes(newDevice.value)) {
    try {
      await axios.post("http://127.0.0.1:8000/newDevice", {
        id_brands: selectedBrandName.value,
        name: newDevice.value,
      });
      devices.value.push({
        id_brands: selectedBrandName.value,
        name: newDevice.value,
      });
      selectedDevice.value = newDevice.value;
      newDevice.value = "";
      showNewDeviceInput.value = false;
    } catch (error) {
      console.error("Error agregando nuevo dispositivos", error.data);
    }
  }
  return false;
};

defineExpose({
  getPhoneData,
});
</script>

<template>
  <section class="form-container">
    <h2>CELULAR {{ cel_num }}</h2>
    <section>
      <label :for="`brand-select-${cel_num}`" class="input-container">
        <span>Seleccione una marca:</span>
        <select v-model="selectedBrandName">
          <option v-for="brand in brands" :key="brand.name" :value="brand.name">
            {{ brand.name }}
          </option>
          <option value="Otro">Otro</option>
        </select>
        <!-- Mostrar campo para nueva marca si se selecciona "Otro" -->
        <div v-if="selectedBrandName === 'Otro'" class="input-container">
          <input
            type="text"
            v-model="newBrand"
            placeholder="Ingrese una nueva marca"
          />
          <button type="button" @click="addNewBrand">Agregar Marca</button>
        </div>
      </label>
      <label :for="`device-select-${cel_num}`" class="input-container">
        <span>Seleccione un modelo:</span>
        <select :id="`device-select-${cel_num}`" v-model="selectedDevice">
          <option
            v-for="device in devices"
            :key="device.id_brands"
            :value="device.name"
          >
            {{ device.name }}
          </option>
          <option value="Otro">Otro</option>
        </select>
        <!-- Mostrar campo para nueva marca si se selecciona "Otro" -->
        <div v-if="selectedDevice === 'Otro'" class="input-container">
          <input
            type="text"
            v-model="newDevice"
            placeholder="Ingrese un nuevo modelo"
          />
          <button type="button" @click="addNewDevice">Agregar Modelo</button>
        </div>
      </label>
      <label :for="`desc-inp-${cel_num}`" class="input-container">
        <span>Descripcion:</span>
        <input v-model="detail" type="text" :id="`desc-inp-${cel_num}`" />
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
