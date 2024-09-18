<script setup>
import { ref } from "vue";
import parts from "./parts.vue";

const optionsSp = ref(["Pantallas", "Pachas", "Baterias"]);
</script>

<template>
  <div id="container">
    <form id="Search-Form">
      <select name="" id="Search-select">
        <option id="Search-Option" v-for="i in optionsSp" :key="i">
          {{ i }}
        </option>
      </select>
      <div id="box">
        <input type="text" placeholder="Buscar..." />
        <a href="#">
          <i class="fas fa-search search-icon"></i>
        </a>
      </div>
      <button type="submit">Buscar</button>
    </form>
  </div>
  <div class="containerlist">
    <ul>
      <parts v-for="i in 4" :key="index"   ></parts>
    </ul>
  </div>
</template>

<style scoped>
* {
  all: unset;
}

#Search-Form {
  display: flex;
  justify-content: space-around;
  width: 760px;
  padding: 10px;
  margin: 20px;
  background-color: #fc955d;
  border-radius: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

#Search-select {
  background-color: #f3f3f4;
  padding: 10px;
  width: 150px;
  height: 28px;
  margin-top: 0px;
  border-radius: 20px;
  text-align: center;
}

#box {
  display: flex;
  align-items: center;
  width: 400px;
  height: 40px;
  padding: 5px 15px;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.5s ease;
}

#box:hover input,
#box input:focus {
  width: 300px;
}

#box input {
  width: 0;
  outline: none;
  border: none;
  font-weight: 500;
  transition: width 0.5s ease;
  background: transparent;
  margin-right: 10px; /* Agregar margen para separación del icono */
}

.search-icon {
  font-size: 40px;  /* Ajuste del tamaño del icono */
  color: rgb(216, 75, 23);
}

button {
  background-color: #2c2c2c;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #bf360c;
}
</style>
