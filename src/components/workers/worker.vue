<script setup>
import { inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import workerBillList from './worker-bill-list.vue';
// Obtiene la ruta actual
const isActive = (state) => state == list_state.value;
const router = useRouter()

const workerRole = inject("workerRole", ref(null))
const loggedWorker = inject("loggedWorker", ref(null))

const closeSession = () => {
    loggedWorker.value = null
    workerRole.value = null
    router.push("/workers/login-worker")
}


const list_state = ref("received")

const change_ls = (new_state) =>{
    list_state.value = new_state
}
</script>

<template>
    <section class="container">
        <h2>TURNO INICIADO</h2>
        <div class="worker-cont">
            <div class="info-cont">
                <span>Colaborador: </span>
                <span class="worker-span">{{ loggedWorker }}</span>
            </div>
            <div class="info-cont">
                <span>Rol: </span>
                <span class="worker-span">{{ workerRole }}</span>
            </div>
        </div>
        <nav class="list-options">
            <button class="list-router" :class="{'active' : isActive('received')}" @click="change_ls('received')">
                <ion-icon name="enter-outline"></ion-icon>
            </button>
            <button class="list-router" :class="{'active' : isActive('repaired')}" @click="change_ls('repaired')">
                <ion-icon name="construct-outline"></ion-icon>
            </button>
            <button class="list-router" :class="{'active' : isActive('delivered')}" @click="change_ls('delivered')">
                <ion-icon name="exit-outline"></ion-icon>
            </button>
        </nav>
        <workerBillList></workerBillList>

        <router-link to="/workers/workers-list" v-if="workerRole == 'Gerente'" class="router edit-btn">
            <ion-icon name="create-outline"></ion-icon>
        </router-link>

        <button class="close-sesion-btn" @click="closeSession">CERRAR SESION</button>
    </section>

</template>

<style scoped>
.container {
    background-color: var(--baseGray);
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: var(--baseShadow);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
}

h2 {
    font-size: 20px;
    text-align: center;
    color: white;
    font-weight: bolder;
    letter-spacing: 2px;
}

.worker-cont {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}
.info-cont{
    background-color: white;
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: var(--secShadow);
}
.list-options{
    background-color: var(--baseGray);
    padding: 10px 20px;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    justify-content: space-around;
}
.list-router{
    all: unset;
    color: white;
    scale: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    transition: .3s;

}
.list-router.active{
    background-color: var(--baseOrange);
    border-radius: 4px;
}
@media (min-width: 600px) {
    .container{
        width: 600px;
        scale: 1.3;
    }
}
</style>