<template>
    <header class="header fixed top-0 z-[999]" :class="{'scroll': isScroll}">
        <div class="header__inner container h-[5rem] flex justify-between items-center gap-[10rem]">
            <SearchBox />
            <div class="header-menu ml-auto">
                <NavBarList />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import SearchBox from '../../components/SearchBox.vue';
import NavBarList from './NavBarList.vue';
import { onMounted, ref } from 'vue';

const isScroll = ref<boolean>(false);

onMounted(() => {
    document.addEventListener<"scroll">("scroll", () => {
        isScroll.value = window.scrollY > 20 ? true : false;
    });
})
</script>

<style lang="scss" scoped>
.header {
    transition: all 0.2s cubic-bezier(.49,.26,.19,.37);

    &__inner {
        margin-top: 2rem;
    }
}

.scroll {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(1rem);
}
</style>