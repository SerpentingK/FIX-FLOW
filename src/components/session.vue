<script setup>
import {inject, ref} from "vue";

const loggedCompany = inject('loggedCompany', ref(null))
</script>

<template>
    <section class="container">
        <h2>SESION INICIADA</h2>
        <span>{{loggedCompany}}</span>
        <div class="op-container">
            <router-link to="/" class="op-router">Actualizar contraseña</router-link>
            <div>|</div>
            <router-link to="/"  class="op-router">Actualizar Usuario</router-link>
        </div>
        <button class="logout-btn">
            <div class="sign">
                <ion-icon name="log-out-outline"></ion-icon>
            </div>
            <div class="text">Logout</div>
        </button>
    </section>
</template>

<style scoped>

.container{
    background-color: white;
    padding: 20px 40px 80px 40px;
    box-shadow: var(--baseShadow);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
.container span{
    font-size: 25px;
    font-weight: bolder;
    font-family: var(--secFont);
    text-transform: uppercase;
    letter-spacing: 2px;
    background-color: var(--baseGray);
    padding: 5px 40px;
    border-radius: 20px;
    color: var(--secGray);
}
.logout-btn{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    right: 20px;
    bottom: 20px;
    overflow: hidden;
    transition: all .4s ease;
    box-shadow: var(--secShadow);
    background-color: var(--baseOrange);
}
/* plus sign */
.sign {
    width: 100%;
    transition: all .3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}
.sign ion-icon {
    color: white;
    font-size: 30px;
}
/* text */
.text {
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition: all .3s ease;
}
/* hover effect on button width */
.logout-btn:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: .4s;
}
.logout-btn:hover .sign ion-icon{
    font-size: 20px;
}
.logout-btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
}
/* button click effect*/
.Btn:active {
    transform: translate(2px ,2px);
}

.op-container{
    display: flex;
    gap: 10px;
}
.op-router{
    color: var(--secGray);
    text-decoration: none;
    transition: all .3s ease;

}
.op-router:hover{
    color: var(--baseGray);
}
</style>