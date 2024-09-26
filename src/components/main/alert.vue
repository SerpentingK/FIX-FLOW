<script setup>
defineProps({
    message: {
        type: String,
        required: true,
        default: "DEFAULT MESSAGE"
    }
})
</script>

<template>
    <div>
        {{ message }}
    </div>
</template>

<style scoped>
div{
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 10px 20px;
    background-color: var(--baseOrange);
    color:white;
    box-shadow: var(--baseShadow);
    border-radius: 20px;
    border: 5px solid red;
    font-weight: bolder;
    font-size: 20px;
    transition: .5s;
}
</style>