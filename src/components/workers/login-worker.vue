<script setup>
import { inject, ref } from 'vue';

const loggedWorker = inject("loggedWorker", ref(null))
const workerRole = inject("workerRole", ref(null))

const login = (event) => {
    event.preventDefault();
    loggedWorker.value = "David"
    //Solucion temporal al inicio de sesion
};
</script>

<template>
    <section class="container">
        <h2>INICIE SESIÓN</h2>
        <span>Ingrese su usuario y contraseña</span>
        <span>Si no tiene uno comuniquese su encargado</span>
        <form class="login-form" @submit="login">
            <label for="input-name " class="input-container">
                <ion-icon name="person-outline"></ion-icon>
                <input type="text" id="input-name" placeholder="Usuario">
            </label>
            <label for="pasw-input" class="input-container">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" id="pasw-input" placeholder="Contraseña">
            </label>
            <button class="btn">
                <span>Iniciar turno</span>
                <ion-icon name="caret-forward-outline"></ion-icon>
            </button>
        </form>
    </section>
</template>

<style scoped>
h2 {
    font-weight: bolder;
    font-family: var(--titleFont);
    font-size: 30px;
    color: white;
    margin: 20px 0;
}

.container {
    background-color: var(--baseGray);
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    box-shadow: var(--baseShadow);
    border: 4px solid var(--baseOrange);
}

.container span {
    color: gray;
    font-weight: bolder;
    letter-spacing: 1px;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    width: 100%;
    padding: 20px;
    gap: 20px;
}

.input-container {
    display: flex;
    justify-content: center;
    gap: 15px;
    width: 90%;
    background-color: white;
    padding: 10px 20px;
    border-radius: 18px;
    box-shadow: var(--secShadow);
    align-items: center;
}

.input-container input {
    all: unset;
}

.btn span {
    color: white;
    letter-spacing: 3px;
    font-weight: 300;
    transition: all .4s;
}

.btn {
    all: unset;
    padding: 20px;
    display: flex;
    align-items: center;
    overflow: hidden;
    gap: 10px;
    color: white;
    background: var(--baseOrange);
    border-radius: 25px;
    box-shadow: var(--secShadow);
    transition: all .6s;
}

.btn ion-icon {
    scale: 2;
    transform: translateY(30px);
    transition: all .4s;
}

.btn:hover ion-icon {
    transform: translateY(0px);
}

.btn:hover {
    opacity: .8;
}

.btn:hover span {
    scale: 1.05;
}
</style>