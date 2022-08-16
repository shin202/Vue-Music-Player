<template>
    <header class="header w-full h-[7rem] shadow-md text-2xl fixed top-0 left-0 z-[999]">
        <div class="header__inner container w-full h-full flex justify-between items-center space-x-5">
            <SearchBox />
            <nav class="header-menu">
                <ul class="header-menu__list flex justify-between items-center space-x-4">
                    <li class="header-menu__item settings text-4xl flex relative">
                        <ion-icon name="settings-outline" 
                            class="settings__button cursor-pointer"
                        ></ion-icon>
                    </li>
                    <li class="header-menu__item user-infor bg-[#CBF3F0] w-[4rem] h-[4rem] rounded-full relative">
                        <img :src="avatar" :alt="avatar" class="w-full h-full object-cover cursor-pointer" @click="toggleFormModal">
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import SearchBox from "../SearchBox.vue";
import avatar from "../../assets/icons/avatar.svg";
import { ref } from "vue";
import { useGlobal } from "../../stores/Global";
import { useEventListener } from "../../composables/Event";

const { toggleFormModal } = useGlobal();
</script>

<style lang="scss" scoped>
</style>