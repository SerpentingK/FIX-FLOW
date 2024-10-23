<script setup>
import { ref, inject } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const {
  client_name,
  total_price,
  due,
  payment,
  client_phone,
  wname,
  phones_list,
} = defineProps({
  client_name: {
    type: String,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  due: {
    type: Number,
    required: false,
    default: 0,
  },
  payment: {
    type: Number,
    required: false,
    default: 0,
  },
  client_phone: {
    type: String,
    required: true,
  },
  wname: {
    type: String,
    required: true,
  },
  phones_list: {
    type: Array,
    required: true,
  },
});

const show_letter = inject("show_letter");

const bill = ref({
  total_price: total_price,
  due: due,
  client_name: client_name,
  client_phone: client_phone,
  payment: payment,
  wname: wname,
  phones: phones_list,
});

const postBill = async () => {
  // Asegúrate de que cada objeto en phones tenga las propiedades correctas
  bill.value.phones = bill.value.phones.map((phone) => ({
    brand_name: phone.brand_name, // Cambiar 'brand' a 'brands'
    device: phone.device,
    details: phone.details,
    price: phone.price, // Asegúrate de incluir 'price'
  }));

  try {
    const answer = await axios.post(
      "http://127.0.0.1:8000/createBillwithPhones",
      bill.value
    );
    console.log(answer.data);
    // Resetear el formulario
    bill.value = {
      total_price: 0,
      due: 0,
      client_name: "",
      client_phone: "",
      payment: 0,
      wname: "",
      phones: [],
    };
    router.push("/bills/bill-list");
  } catch (error) {
    console.error("Error al enviar la factura:", error.response.data);
  }
};
</script>
<template>
  <section class="info-container">
    <div class="bill-info">
      <div class="fact-container">
        <span>Colaborador:</span>
        <span>{{ wname }}</span>
      </div>
      <div class="fact-container">
        <span>Cliente:</span>
        <span>{{ client_name }}</span>
      </div>
      <div class="fact-container">
        <span>Telefono cliente:</span>
        <span>{{ client_phone }}</span>
      </div>
      <div class="fact-container">
        <span>Precio total:</span>
        <span>${{ total_price }}</span>
      </div>
      <div class="fact-container">
        <span>Adelanto:</span>
        <span>${{ payment }}</span>
      </div>
      <div class="fact-container">
        <span>A pagar:</span>
        <span>${{ due }}</span>
      </div>
    </div>
    <div class="phones-info">
      <div class="phone-container" v-for="phone in phones_list" :key="phone">
        <div class="fact-container">
          <span>Celular:</span>
          <span>{{ phone.brands }} {{ phone.device }}</span>
        </div>
        <div class="fact-container">
          <span>Precio:</span>
          <span>${{ phone.price }}</span>
        </div>
        <div class="fact-container">
          <span>Detalles:</span>
          <span>{{ phone.details }}</span>
        </div>
      </div>
      <div class="btns-container">
        <button class="cancel-btn" @click="show_letter()">
          <span class="btn-text">CANCELAR</span></button>
        <button class="confirm-btn" @click="postBill()">
          <span class="btn-text">REGISTRAR</span>
        </button>
      </div>
      
    </div>
  </section>
</template>

<style scoped>
.info-container {
  max-height: 80%;
  background-color: var(--baseGray);
  width: 80%;
  border: 6px solid var(--baseOrange);
  padding: 30px 50px;
  border-radius: 20px;
  box-shadow: var(--baseShadow);
  display: flex;
  justify-content: space-between;
}

.bill-info {
  width: 30%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-direction: column;
}

.fact-container {
  background-color: white;
  color: var(--baseGray);
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 15px;
  border: 3px solid var(--baseGray);
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.fact-container span {
  font-weight: bolder;
}
.phones-info {
  width: 65%;
  padding: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: scroll;
  scrollbar-width: none;
  align-items: center;
}
.phone-container {
  width: 100%;
  display: flex;
  background-color: white;
  padding: 15px 30px;
  box-shadow: var(--secShadow);
  border-radius: 10px;
  border: 2px solid var(--baseGray);
  gap: 20px;
  flex-wrap: wrap;
}
.phone-container .fact-container {
  background-color: var(--baseGray);
  color: white;
  border-color: var(--baseOrange);
}
.btns-container{
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 20px 50px;
}
button {
  border: none;
  width: 60%;
  text-align: center;
  padding: 20px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bolder;
  color: white;
  transition: 0.2s;
  border: 2px solid;
}
.confirm-btn {
  border-color: var(--baseOrange);
  background-color: var(--baseOrange);
}
.cancel-btn {
  border-color: var(--baseOrange);
  background-color: var(--baseGray);
}
.btn-text{
  transition: 3s;
}
button:hover .btn-text{
  transform: scale(1.2);
}
</style>
