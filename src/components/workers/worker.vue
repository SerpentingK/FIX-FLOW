<script setup>
import { inject, ref } from 'vue';

const workerRole = inject("workerRole", ref(null))
const loggedWorker = inject("loggedWorker", ref(null))
</script>

<template>
    <section class="container">
        <h2>TURNO INICIADO</h2>
        <button v-if="workerRole == 'ADMINISTRADOR'" class="edit-btn">
            <div>
                <ion-icon name="create-outline"></ion-icon>
                <span>Editar colaboradores</span>
            </div>
        </button>
    </section>

</template>

<style scoped>

.container{
    background-color: white;
    padding: 20px 40px;
    box-shadow: var(--baseShadow);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
}
.container h2{
    font-size: 30px;
    font-weight: bolder;
    text-shadow: var(--baseShadow);
    font-family: var(--titleFont);
    background: linear-gradient(90deg,
    var(--baseOrange), var(--baseGray));
    background-clip: text;
    letter-spacing: 1.5px;
    -webkit-text-fill-color: transparent;/* Sombra arriba a la izquierda */
}

</style>