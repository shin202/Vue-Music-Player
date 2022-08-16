<template>
    <div class="search-box text-black">
        <form class="relative flex justify-center items-center" @submit.prevent="handleSubmit">
            <ion-icon name="search-outline" class="absolute left-[5%] text-4xl"></ion-icon>
            <input type="search" name="search" class="w-full px-[4rem] py-4 outline-none border-none rounded-full bg-gray-200"
                autocomplete="off"
                v-model="searchQuery"
            >
            <Transition name="fade">
                <ion-icon v-show="searchQuery" name="close-circle" class="text-4xl absolute right-[5%] cursor-pointer" @click="clearQuery"></ion-icon>
            </Transition>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref<string>('');

const clearQuery = (): void => {
    searchQuery.value = '';
}

const handleSubmit = (): void => {
    // Code
}
</script>

<style lang="scss" scoped>
.search-box {
    & > form > input {
        box-shadow: inset 0.15rem 0.15rem 0.5rem rgba(0, 0, 0, 0.4),
                    0.15rem 0.15rem 0.5rem rgba(0, 0, 0, 0.15);
        &::-webkit-search-cancel-button {
            -webkit-appearance: none;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.75s cubic-bezier(0.19, 1, 0.22, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>