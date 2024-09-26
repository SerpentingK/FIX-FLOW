<script setup>
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // Obtiene la ruta actual
const isActive = (path) => route.path === path;

const workerRole = inject("workerRole", ref(null))
const loggedWorker = inject("loggedWorker", ref(null))

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
            <router-link to="/workers/worker/received-list" class="router"
                :class="{ 'active': isActive('/workers/worker/received-list') }">
                <ion-icon name="enter-outline"></ion-icon>
            </router-link>
            <router-link to="/workers/worker/repairs-list" class="router"
                :class="{ 'active': isActive('/workers/worker/repairs-list') }">
                <ion-icon name="construct-outline"></ion-icon>
            </router-link>
            <router-link to="/workers/worker/deliveries-list" class="router"
                :class="{ 'active': isActive('/workers/worker/deliveries-list') }">
                <ion-icon name="exit-outline"></ion-icon>
            </router-link>

        </nav>
        <section class="list-container">
            <router-view></router-view>
        </section>

        <router-link to="/workers/workers-list" v-if="workerRole == 'Gerente'" class="router edit-btn">
            <ion-icon name="create-outline"></ion-icon>
        </router-link>
    </section>

</template>

<style scoped>
.container {
    background-color: var(--baseGray);
    border: 4px solid var(--baseOrange);
    padding: 20px 40px;
    box-shadow: var(--baseShadow);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.container h2 {
    font-size: 30px;
    font-weight: bolder;
    text-shadow: var(--baseShadow);
    font-family: var(--titleFont);
    background: linear-gradient(90deg,
            var(--baseOrange), white);
    background-clip: text;
    letter-spacing: 1.5px;
    -webkit-text-fill-color: transparent;
    /* Sombra arriba a la izquierda */
}

.worker-cont {
    display: flex;
    gap: 20px;
    padding: 10px 20px;
}

.info-cont {
    background-color: white;
    color: var(--baseGray);
    padding: 10px 20px;
    border-radius: 15px;
    display: flex;
    gap: 10px;
    box-shadow: var(--secShadow);
    width: 300px;
}
.info-cont span{
    font-weight: bolder;
    font-size: 20px;
}

.list-container {
    background-color: white;
    padding: 20px 30px;
    width: 100%;
    border-radius: 20px;
    box-shadow: var(--secShadow);
    margin-top: 30px;
    position: relative;
    min-height: 100px;
}

.list-options {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    left: -70px;
    gap:20px;
}

.router {
    background-color: rgb(70, 70, 70);
    padding: 10px;
    color: white;
    text-decoration: none;
    border-radius: 10px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--baseShadow);
    transition: all .4s ease;
}
.router ion-icon{
    font-size: 30px;
}

.router.active {
    background-color: var(--baseGray);
    scale: 1.2;
}
</style>