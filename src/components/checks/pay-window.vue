<script setup>
import { inject } from 'vue';

defineProps(
    {
        bill_num:{
            type: String,
            default: "0001-A",
            required: true
        }
    }
)
const switch_spw = inject('switch_spw')
</script>

<template>
    <section class="cont">
        <h2>
            <span>Abono a factura: </span>
            <span>{{ bill_num }}</span>
        </h2>
        <label for="pay-input">
            <ion-icon name="cash-outline"></ion-icon>
            <input type="number" id="pay-input" placeholder="Abono" min="0">
        </label>
        <div class="buttons-container">
            <button class="cancel-btn" @click="switch_spw()">Cancelar</button>
            <button class="okay-btn" @click="switch_spw()">Aceptar</button>
        </div>
    </section>
</template>
<style scoped>
.cont{
    position: fixed;
    background-color: var(--baseGray);
    width: 500px;
    border: 4px solid var(--baseOrange);
    padding: 30px;
    border-radius: 30px;
    box-shadow: var(--baseShadow);
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}
label{
    display: flex;
    justify-content: center;
    background-color: white;
    padding: 20px 30px;
    gap: 20px;
    align-items: center;
    border-radius: 20px;
    box-shadow: var(--secShadow);

}
label input{
    all: unset;
}
label input::-webkit-inner-spin-button, label input::-webkit-outer-spin-button{
    display: none;
}
label ion-icon{
    scale: 1.4;
}
h2{
    display: flex;
    gap: 20px;
    text-shadow: var(--baseShadow);
    font-family: var(--titleFont);
    background: linear-gradient(90deg,
            var(--baseOrange), white);
    background-clip: text;
    letter-spacing: 1.5px;
    -webkit-text-fill-color: transparent;
    font-weight: bolder;
    text-transform: uppercase;
}
.buttons-container{
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}
.cancel-btn, .okay-btn{
    all: unset;
    cursor: pointer;
    transition: .3s;
    border: 2px solid var(--baseOrange);
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: var(--secShadow);
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bolder;
}
.okay-btn:hover{
    scale: 1.1;
}
.cancel-btn:hover{
    scale: 0.9;
}
.okay-btn{
    background-color: var(--baseOrange);
}
</style>