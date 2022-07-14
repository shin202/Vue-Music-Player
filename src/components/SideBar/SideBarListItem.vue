<template>
    <router-link :to="link" class="w-full">
        <li 
            class="sidebar-menu__item h-[5rem] flex justify-start items-center hover:text-secondary cursor-pointer px-4 space-x-8"
            :class="{'active': $route.path === link}"
        >
            <ion-icon :name="icon" class="sidebar-menu__icon text-gr text-[2.5rem] flex-1 lg:flex-none" />
            <h3 class="sidebar-menu__title hidden lg:inline md:hidden sm:hidden truncate" v-text="title"/>
        </li>
    </router-link>
</template>

<script setup lang="ts">
interface items {
    icon: string,
    title: string,
    link: string,
}

const props = defineProps<items>();
</script>

<style lang="scss" scoped>
.sidebar-menu {
    &__item {
        transition: color 0.5s cubic-bezier(.49,.26,.19,.37);
    
        &:hover {
            ion-icon {
                transition: color 0.5s cubic-bezier(.49,.26,.19,.37);
                @apply text-secondary;
            }
        }

        &.active {
            @apply text-secondary;
            ion-icon {
                @apply text-secondary;
            }
        }
    }
}
</style>