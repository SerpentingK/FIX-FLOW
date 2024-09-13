<script setup>
defineProps({
    check_num:{
        type: String,
        required: true
    },
    client_name:{
        type: String,
        required: true
    },
    check_date:{
        type: String,
        required: false
    }
})
</script>

<template>
    <li>
        <div class="check-num">{{check_num}}</div>
        <div>{{client_name}}</div>
        <div v-if="check_date != null">{{check_date}}</div>
    </li>
</template>

<style scoped>
li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: rgb(54, 54, 54);
    margin-top: 25px;
    padding: 20px 40px;
    color: white;
    border-radius: 30px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.676);
}
.check-num{
    background-color: rgb(216, 75, 23);
    padding: 10px 20px;
    border-radius: 35px;
}
</style>