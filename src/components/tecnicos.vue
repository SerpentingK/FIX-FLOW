<script setup></script>
<template>
    <section id="container">
        <div class="container-sec">
            <form id="tec-form">
                <h2>Ingrese para empezar turno</h2>
                <span>Ingrese su usuario y clave</span>
                <div class="container-input">
                    <ion-icon name="person-outline"></ion-icon>
                    <input type="text" placeholder="Usuario" />
                </div>
                <div class="container-input">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" placeholder="Clave" />
                </div>
                <button class="button">INICIAR SESION</button>
            </form>
        </div>
        <div class="container-sec">
            
            
        </div>
    </section>
</template>
<style scoped>
#container {
    background-color: rgb(255, 255, 255);
    position: relative;
    width: 62%;
    height: 500px;
    border-radius: 10px;
    display: flex;
    overflow: hidden;
}

.container-sec {
    width: 100%;
    height: 100%;
}

#tec-form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#tec-form h2 {
    font-size: 20px;
    margin-bottom: 20px;
}

#tec-form span {
    font-size: 10px;
    margin-bottom: 15px;
}

.container-input {
    width: 250px;
    height: 40px;
    margin-bottom: 10px;
    display: flex;
    justify-content: start;
    font-size: 13px;
    font-weight: bold;
    align-items: center;
    gap: 8px;
    padding: 0px 15px;
    background-color: #eeeeee94;
    border-radius: 10px;
}

.container-input input {
    all: unset;
    width: 100%;
}

.button {
    width: 150px;
    height: 40px;
    font-size: 13px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    margin-top: 10px;
    background-color: var(--baseOrange);
    color: white;
}

#tec-nav {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 30px;
    align-items: center;
    justify-content: center;
    height: 100%;
}

#tec-nav .router {
    width: 40%;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: black;
    font-size: 14px;
    font-weight: bolder;
    text-align: center;
}

.icon-container {
    color: rgba(41, 41, 41, 0.829);
    background-color: rgba(158, 158, 158, 0.514);
    margin-bottom: 10px;
    padding: 35px;
    border-radius: 50%;
    transition: background-color 0.6s ease;
}
#tec-nav:hover> :not(:hover) .icon-container{
    background-color: rgba(109, 109, 109, 0.712);
}
.icon-container ion-icon {
    font-size: 40px;
    display: inline-block;
    animation: none;
}


.icon-container:hover ion-icon {
    animation: moverGirar 1.1s ease-in-out forwards;
}

@keyframes moverGirar {
    0% {
        transform: translateY(0) rotate(0deg);
    }
    30% {
        transform: translateY(-10px) rotate(0deg);
    }
    80% {
        transform: translateY(-10px) rotate(360deg);
    }
    100% {
        transform: translateY(0) rotate(360deg);
    }
}
</style>
