<script setup>
import { ref, provide, onMounted } from "vue";
import bill_li from "./bill-li.vue";
import bill_info from "./bill-info.vue";
import pay_window from "./pay-window.vue";
import axios from "axios";

const options = ref(["N. Factura", "Cliente", "Fecha"]);
const selectedOption = ref(options.value[0]); // Mantiene el valor seleccionado

const show_letter_switch = ref(false);
const billInfo = ref({}); // Aquí guardarás la información de la factura seleccionada
const billPhone = ref([]);

const show_bill_info = async (billNumber) => {
  show_letter_switch.value = !show_letter_switch.value;
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/bill/${billNumber}`
    );
    billInfo.value = response.data[0]; // Asigna los datos de la factura al objeto billInfo
    console.log("Datos de la factura:", response.data[0]);
    const responsephone = await axios.get(
      `http://127.0.0.1:8000/billphone/${billNumber}`
    );
    billPhone.value = responsephone.data;
    console.log("Datos de la phones:", responsephone.data);
  } catch (error) {
    console.error("Error al obtener la información de la factura", error);
  }
};

const show_pay_window = ref(false);
const switch_spw = () => {
  show_pay_window.value = !show_pay_window.value;
};
provide("switch_spw", switch_spw);

provide("show_bill_info", show_bill_info);

const somebill = ref([]);

onMounted(async () => {
  try {
    const answer = await axios.get("http://127.0.0.1:8000/someDataOfBill");
    somebill.value = answer.data;
  } catch (error) {
    console.error("error al obtener datos", error);
  }
});
</script>

<template>
  <section class="container">
    <nav class="search-bar">
      <form action="" class="search-form">
        <select id="searchOption" v-model="selectedOption">
          <option v-for="option in options" :key="option">
            {{ option }}
          </option>
        </select>
        <input
          v-if="selectedOption !== 'Fecha'"
          type="text"
          placeholder="Buscar..."
        />
        <input v-else type="date" />
        <button type="submit">Buscar</button>
      </form>
    </nav>
    <section class="checks-section">
      <ul>
        <bill_li
          v-for="bill in somebill"
          :key="bill.bill_number"
          :check_num="bill.bill_number"
          :client_name="bill.client_name"
          :check_date="bill.entry_date"
          :total_price="bill.total_price"
        >
        </bill_li>
      </ul>
    </section>
    <transition-group name="slide-fade">
      <bill_info
        v-if="show_letter_switch"
        :bill_number="billInfo.bill_number"
        :client_name="billInfo.client_name"
        :entry_date="billInfo.entry_date"
        :total_price="billInfo.total_price"
        :due="billInfo.due"
        :payment="billInfo.payment"
        :client_phone="billInfo.client_phone"
        :wname="billInfo.wname"
        :phones_list="billPhone"
      />

      <pay_window v-if="show_pay_window"></pay_window>
    </transition-group>
  </section>
  <transition name="slide-fade" mode="out-in">
    <bill_info
      v-if="show_letter_switch"
      :bill_number="billInfo.bill_number"
      :client_name="billInfo.client_name"
      :entry_date="billInfo.entry_date"
      :total_price="billInfo.total_price"
      :due="billInfo.due"
      :payment="billInfo.payment"
      :client_phone="billInfo.client_phone"
      :wname="billInfo.wname"
      :phones_list="billPhone"
    />
  </transition>
</template>

<style scoped>
* {
  all: unset;
}

.container {
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: none;
}
.search-bar {
  background-color: var(--baseGray);
  padding: 10px;
  width: 100%;
  height: auto;
  padding: 20px 50px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: var(--baseShadow);
}
.search-form {
  display: flex;
  justify-content: space-around;
}
.search-form select {
  background-color: white;
  padding: 5px 30px;
  border-radius: 5px;
  cursor: pointer;
}
.search-form input {
  background-color: white;
  border-radius: 5px;
  padding: 0 20px;
  cursor: pointer;
}
.search-form button {
  cursor: pointer;
  background-color: var(--baseOrange);
  padding: 0 20px;
  border-radius: 5px;
  color: white;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}
.search-form button:hover {
  border: 2px solid white;
}
/* Transición personalizada */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  transform: translateY(-100px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
