<template>
    <div class="sidebar-menu font-bold">
        <ul class="sidebar-menu__list flex flex-col justify-between items-start mt-8 relative max-w-full">
            <SideBarListItemVue v-for="item in items" :icon="item.icon" :title="item.title" :link="item.link" />
            <!-- Submenu -->
            <li class="sidebar-menu__list mt-8 px-4 w-full flex flex-col items-center lg:items-start">
                <h3 class="sidebar-menu__title text-gr">Cá nhân</h3>
                <ul class="sidebar-menu-sub w-full">
                    <router-link :to="`/playlist/${current_playlist_store.current_playlist.encodeId}`">
                        <li
                            class="sidebar-menu-sub__item w-full mt-8 cursor-pointer hover:text-secondary flex space-x-8 items-center"
                            :class="{'active': route.path === `/playlist/${current_playlist_store.current_playlist.encodeId}`}"
                            >
                            <ion-icon name="musical-notes-outline" class="text-[2.5rem] text-gr flex-1 lg:flex-none">
                            </ion-icon>
                            <h3 class="truncate hidden lg:block">Danh sách phát</h3>
                        </li>
                    </router-link>
                </ul>
            </li>
            <!-- Submenu -->
        </ul>
    </div>
</template>

<script setup lang="ts">
import { use_current_playlist_store } from '@/stores/CurrentPlaylist';
import SideBarListItemVue from './SideBarListItem.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const current_playlist_store = use_current_playlist_store();

const items = [
    {
        icon: "home-outline",
        title: "Trang chủ",
        link: "/",
    },
    {
        icon: "apps-outline",
        title: "Thể loại",
        link: "/category",
    },
    {
        icon: "star-outline",
        title: "TOP 100",
        link: "/top-100",
    },
    {
        icon: "film-outline",
        title: "MV",
        link: "/mv",
    }
];

</script>

<style lang="scss" scoped>
.sidebar-menu-sub__item {
    transition: color 0.5s cubic-bezier(.49, .26, .19, .37);

    &:hover {
        ion-icon {
            transition: color 0.5s cubic-bezier(.49, .26, .19, .37);
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
</style>