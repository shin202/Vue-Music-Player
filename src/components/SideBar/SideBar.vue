<template>
    <div class="sidebar h-full fixed top-0 shadow-xl z-[999] bg-white"
        :class="{ 'left-0': direction === 'left', 'right-0': direction === 'right' }">
        <div class="sidebar__inner container">
            <a href="https://github.com/shin202" target="_blank">
                <ProfileCard 
                    name="Shin" 
                    avatar="https://avatars.githubusercontent.com/u/72436035?v=4"
                    email="test@gmail.com" 
                    vip
                />
                <SideBarList />
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProfileCard from '../Card/ProfileCard.vue';
import SideBarList from './SideBarList.vue';

const props = defineProps({
    direction: {
        type: String,
        required: false,
    }
});
</script>

<style lang="scss" scoped>
</style>