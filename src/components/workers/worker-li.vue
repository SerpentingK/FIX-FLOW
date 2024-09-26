<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

// Instancias de router y route
const router = useRouter();

// Inyectar la función desde el componente padre
const toggleAlertVisibility = inject('toggleAlertVisibility');

// Estado para controlar si la alerta ya fue mostrada
const isAlertVisible = ref(false);

// Función que se llama al oprimir el botón de delete
const toDelete = (msg = "") => {
  if (!isAlertVisible.value) {
    // Si la alerta no ha sido mostrada, mostrarla
    toggleAlertVisibility(msg);
    isAlertVisible.value = true; // Marcar que la alerta ha sido mostrada
  } else {
    // Si la alerta ya fue mostrada, proceder con la eliminación
    deleteWorker();
  }
};

// Función para eliminar al trabajador
const deleteWorker = () => {
  // Aquí va la lógica para eliminar al trabajador
  alert('El trabajador ha sido eliminado.');
  // Ocultar la alerta después de eliminar
  toggleAlertVisibility(""); 
  isAlertVisible.value = false; // Reiniciar el estado de alerta
};

defineProps({
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
.edit-btn,
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
}
.delete-btn:hover {
  scale: 1.2;
}
.delete-btn {
  background-color: red;
}
</style>
