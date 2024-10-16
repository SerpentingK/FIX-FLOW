<template>
    <section class="cont">
        <label for="pay-input">
            <ion-icon name="cash-outline"></ion-icon>
            <input type="number" id="pay-input" placeholder="Abono" min="0">
        </label>
    </section>
</template>
<style scoped>
.cont{
    position: fixed;
    background-color: var(--baseGray);
    width: 500px;
    border: 4px solid var(--baseOrange);
    padding: 20px 30px;
    border-radius: 30px;
    box-shadow: var(--baseShadow);
    margin-top: 50px;
}
</style>