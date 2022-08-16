<template>
    <li class="navigation-menu__item">
        <RouterLink :to="link">
            <span class="navigation-menu__icon">
                <ion-icon :name="icon"></ion-icon>
            </span>
            <span class="navigation-menu__title">
                {{ title }}
            </span>
        </RouterLink>
    </li>
</template>

<script setup lang="ts">
interface Props {
    icon: string,
    title: string,
    link: string,
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>

</style>