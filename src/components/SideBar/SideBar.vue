<template>
    <div 
        class="sidebar h-screen fixed top-0 shadow-xl z-[999] bg-white"
        :class="{'left-0': direction === 'left', 'right-0': direction === 'right'}"
    >
        <div class="container">
            <profile-card-vue
                name="Shin"
                avatar="https://avatars.githubusercontent.com/u/72436035?v=4"
                email="test@gmail.com"
                :vip="true"
            />
            <side-bar-list-vue/>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProfileCardVue from '../Card/ProfileCard.vue';
import SideBarListVue from '@/components/SideBar/SideBarList.vue';

const props = defineProps({
    direction: {
        type: String,
        required: false,
    }
});
</script>

<style lang="scss" scoped>
</style>