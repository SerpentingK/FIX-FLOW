<script setup>
defineProps({
    wname: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    wrole: {
        type: String,
        required: true
    }
})
</script>

<template>
    <li>
        <span class="spans">{{ wname }}</span>
        <span class="spans">{{ document }}</span>
        <span class="spans">{{ wrole }}</span>
    </li>
</template>         

<style scoped>
li{
    background-color: var(--baseGray);
    padding: 20px 40px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: var(--secShadow);
    list-style: none;
}
</style>