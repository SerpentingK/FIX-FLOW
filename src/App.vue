<script setup>
import navBar from "./components/nav-bar.vue";
import logo from "./components/logo.vue";
</script>

<template>
  <section class="body">
    <navBar></navBar>
    <section>
      <router-view></router-view>
    </section>
  </section>
  <logo class="logo-fixed"></logo>
</template>

<style scoped>
*{
  font-family: "SUSE", sans-serif;
}
.body{
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 100%;
  position: fixed;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
}
section{
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-fixed {
  position: fixed;
  right: -10px;
  bottom: -10px;
  z-index: -1;
  opacity: 0.7;
}
</style>
