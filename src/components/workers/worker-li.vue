<script setup>
import axios from "axios";
import { ref } from 'vue';
import { inject } from 'vue';

// Estado para controlar si la alerta ya fue mostrada
const isAlertVisible = ref(false);

// Recibir el nombre de la compañía desde el componente padre
const loggedCompany = inject("loggedCompany");

// Recibir las props desde el componente padre
const {wname, document,wrole} = defineProps({
  wname: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  wrole: {
    type: String,
    required: true,
  },
});
// Emitir eventos desde el componente
const emit = defineEmits(['workerDeleted']);

// Función para mostrar la alerta de confirmación de eliminación
const toDelete = (msg = "") => {
  if (!isAlertVisible.value) {
    // Mostrar la alerta la primera vez
    alert(msg);
    isAlertVisible.value = true;
  } else {
    // Si la alerta ya fue mostrada, proceder a eliminar el trabajador
    deleteWorker();
  }
};

// Función para eliminar al trabajador
const deleteWorker = async () => {
  try {
    // Hacer la solicitud DELETE al backend
    await axios.delete(`http://127.0.0.1:8000/deleteCollaborators/${loggedCompany.value}/${wname}`);
    alert('El trabajador ha sido eliminado correctamente.');
    // emitir evento al componente padre
    emit('workerDeleted', wname);

    // Ocultar la alerta después de eliminar
    isAlertVisible.value = false;

    // Aquí puedes agregar la lógica para actualizar la lista de trabajadores en el componente padre
    // Ejemplo: emit un evento al componente padre para que actualice la lista de trabajadores
  } catch (error) {
    console.error("Error eliminando el trabajador:", error.data);
    alert("Error al eliminar el trabajador.");
    console.log(wname)
  }
};
</script>

<template>
  <li>
    <span class="spans">{{ wname }}</span>
    <span class="spans">{{ document }}</span>
    <span class="spans">{{ wrole }}</span>
    <div class="op-container">
      <button class="delete-btn" @click="toDelete('PRESIONE OTRA VEZ PARA ELIMINAR')">
        <ion-icon name="close"></ion-icon>
      </button>
    </div>
  </li>
</template>

<style scoped>
li {
  background-color: var(--baseGray);
  padding: 20px 40px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: var(--secShadow);
  list-style: none;
  border-radius: 20px;
}

li span {
  background-color: white;
  padding: 10px 30px;
  border-radius: 10px;
  font-weight: bolder;
}

.op-container {
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 20px;
}

.delete-btn {
  all: unset;
  font-size: 20px;
  font-weight: bolder;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  background-color: red;
}

.delete-btn:hover {
  scale: 1.2;
}
</style>
