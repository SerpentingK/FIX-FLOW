<script setup>
import { ref, provide } from 'vue';
import bill_li from './bill-li.vue';
import bill_info from './bill-info.vue';
import pay_window from './pay-window.vue';

const options = ref(["N. Factura", "Cliente", "Fecha"]);
const selectedOption = ref(options.value[0]); // Mantiene el valor seleccionado

const show_letter_switch = ref(false);
const show_bill_info = () => {
    show_letter_switch.value = !show_letter_switch.value;       
}

const show_pay_window = ref(false)
const switch_spw = () => {
    show_pay_window.value = !show_pay_window.value
}
provide('switch_spw', switch_spw)

provide('show_bill_info', show_bill_info);

provide("show_bill_info", show_bill_info);

const phones_list = [
    {
        phone_ref: "0001-A-1",
        brand: "Apple",
        device: "IPhone XR",
        price: 20000,
        details: "pantalla",
        delivered: false,
        repaired: false,
        delivery_date: null
    },
    {
        phone_ref: "0001-A-2",
        brand: "Apple",
        device: "IPhone 11 PRO",
        price: 30000,
        details: "pantalla",
        delivered: true,
        repaired: true,
        delivery_date: "08/06/2024"
    },
    {
        phone_ref: "0001-A-3",
        brand: "Apple",
        device: "IPhone XR",
        price: 20000,
        details: "pantalla",
        delivered: false,
        repaired: false,
        delivery_date: null
    },
    {
        phone_ref: "0001-A-4",
        brand: "Apple",
        device: "IPhone XR",
        price: 20000,
        details: "pantalla",
        delivered: false,
        repaired: false,
        delivery_date: null
    },
    {
        phone_ref: "0001-A-5",
        brand: "Apple",
        device: "IPhone XR",
        price: 20000,
        details: "pantalla",
        delivered: false,
        repaired: true,
        delivery_date: null
    }
]
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
                <input v-if="selectedOption !== 'Fecha'" type="text" placeholder="Buscar...">
                <input v-else type="date">
                <button type="submit">Buscar</button>
            </form>
        </nav>
        <section class="checks-section">
            <ul>
                <bill_li v-for="i in 4" :key="i" :check_num="`A-000${i}`" client_name="Felipe Sierra" check_date="08/06/2004" total_price="50000"></bill_li>
            </ul>
        </section>
        <transition-group
            name="slide-fade"
            mode="out-in"
        >
            <bill_info
                v-if="show_letter_switch"
                bill_number="0001-A"
                client_name="David Carrillo"
                entry_date="08/06/2024"
                :total_price="50000"
                :due="40000"
                :payment="10000"
                client_phone="3133680686"
                wname="srk"
                :phones_list="phones_list"
                key="bill-info"
            />

            <pay_window v-if="show_pay_window"></pay_window>
        </transition-group>
    </section>
    <transition name="slide-fade" mode="out-in">
      <bill_info
        v-if="show_letter_switch"
        bill_number="0001-A"
        client_name="David Carrillo"
        entry_date="08/06/2024"
        :total_price="50000"
        :due="40000"
        :payment="10000"
        client_phone="3133680686"
        wname="srk"
        :phones_list="phones_list"
        key="bill-info"
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
