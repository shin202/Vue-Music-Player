<template>
  <side-bar-vue direction='left' />
  <nav-bar-vue />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <mini-player-vue />
</template>

<script setup lang="ts">
import SideBarVue from './components/SideBar/SideBar.vue';
import NavBarVue from './components/NavBar/NavBar.vue';
import MiniPlayerVue from './components/MiniPlayer.vue';
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap");

#app {
  font-family: "Quicksand", sans-serif;
  font-size: clamp(1.2rem, 2.2vw, 1.6rem);
  max-width: 1440px;
  min-height: 100vh;
  margin: 0 auto;
  user-select: none;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container {
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 0 auto;
}

.sidebar {
  width: 18%;
}

.home, .category, .category-detail, .mv, .top-100, .playlist-detail, .page-404 {
  width: 82%;
  float: right;
  margin-left: auto;
  min-height: 100vh;
}

.swal2-popup {
  font-size: 1.6rem !important;
}
</style>
