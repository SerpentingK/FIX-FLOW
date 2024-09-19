<template>
    <section class="container">
        <h2>CREE UN NUEVO COLABORADOR</h2>
        <form class="worker-form">
            <label for="name-input" class="input-container">
                <span>Nombre: </span>
                <input type="text" id="name-input">
            </label>
            <label for="doc-input" class="input-container">
                <span>Documento: </span>
                <input type="text" id="doc-input">
            </label>
            <label for="pasw-input" class="input-container">
                <span>Contraseña: </span>
                <input type="text" id="doc-input">
            </label>
            <div class="mydict">
                <div>
                    <label>
                        <input type="radio" name="radio">
                        <span>Women</span>
                    </label>
                    <label>
                        <input type="radio" name="radio">
                        <span>Men</span>
                    </label>
                    <label>
                        <input type="radio" name="radio">
                        <span>Divided</span>
                    </label>

                </div>
            </div>
            <button>Registrar</button>
        </form>
    </section>
</template>
<style scoped>
h2 {
    font-weight: bolder;
    font-family: var(--titleFont);
    font-size: 30px;
    color: white;
}

.container {
    background-color: var(--baseGray);
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    box-shadow: var(--baseShadow);
    border: 4px solid var(--baseOrange);
    border-radius: 20px;
}

.worker-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    padding: 10px;
}

.input-container {
    background-color: white;
    color: black;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 15px 30px;
    width: 100%;
    box-shadow: var(--secShadow);
    font-size: 20px;
    border-radius: 10px;
}

.input-container input {
    all: unset;
}

.worker-form select {
    background-color: white;
    border-radius: 20px;
    padding: 15px 30px;
    box-shadow: var(--secShadow);
    font-size: 20px;
    font-family: var(--baseFont);
}

/* From Uiverse.io by Pradeepsaranbishnoi */
:focus {
    outline: 0;
    border-color: #2260ff;
    box-shadow: 0 0 0 4px #b5c9fc;
}

.mydict div {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    justify-content: center;
}

.mydict input[type="radio"] {
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}

.mydict input[type="radio"]:checked+span {
    box-shadow: 0 0 0 0.0625em #0043ed;
    background-color: #dee7ff;
    z-index: 1;
    color: #0043ed;
}

label span {
    display: block;
    cursor: pointer;
    background-color: #fff;
    padding: 0.375em .75em;
    position: relative;
    margin-left: .0625em;
    box-shadow: 0 0 0 0.0625em #b5bfd9;
    letter-spacing: .05em;
    color: #3e4963;
    text-align: center;
    transition: background-color .5s ease;
}

label:first-child span {
    border-radius: .375em 0 0 .375em;
}

label:last-child span {
    border-radius: 0 .375em .375em 0;
}
</style>