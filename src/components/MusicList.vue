<template>
    <ul
        v-if="!isLoading"
        class="music__list"
    >
        <li v-for="(item, index) in list" :key="item.encodeId"
            class="song__item relative flex justify-start items-center space-x-4 p-4 m-2 rounded-md cursor-pointer transition-colors ease-out-expo duration-[0.5s] hover:bg-secondary hover:shadow-md">
            <span class="index w-[2.5rem] max-w-[2.5rem] text-2xl font-mono truncate" v-text="index + 1"></span>
            <div class="thumbnail w-[5rem] h-[5rem] rounded-lg overflow-hidden cursor-pointer relative">
                <img class="w-full h-full object-cover" :src="item.thumbnailM" :alt="item.title">
                <div
                    class="action absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,.2)] flex justify-center items-center text-4xl text-white opacity-0 invisible transition-all ease-out-expo">
                    <RouterLink v-if="type === 0" :to="`/playlist/${item.encodeId}`">
                        <ion-icon name="play"></ion-icon>
                    </RouterLink>
                    <ion-icon v-else name="play" @click="playerStore.start(item as Song, index, '')"></ion-icon>
                </div>
            </div>
            <div class="w-[50%] max-w-[50%] flex flex-col justify-center space-y-2">
                <h3 class="text-2xl font-semibold truncate" v-text="item.title"></h3>
                <span class="text-xl text-gray-400 font-medium truncate" v-text="item.artistsNames"></span>
            </div>
            <ion-icon name="ellipsis-vertical-outline"
                class="more-options text-3xl absolute top-[50%] right-[0.5rem] translate-y-[-50%] opacity-0 invisible transition-all ease-out-expo">
            </ion-icon>
        </li>
    </ul>
    <!-- Skeleton -->
    <ul
        v-else
        class="w-full h-full"
    >
        <li v-for="i in 12"
            class="relative flex justify-start items-center space-x-4 p-4 m-2 rounded-md bg-gray-200">
            <div class="w-[5rem] h-[5rem]">
                <Skeleton/>
            </div>
            <div class="w-[50%] max-w-[50%] flex flex-col justify-center space-y-2">
                <h3 class="text-2xl h-[2rem] font-semibold truncate">
                    <Skeleton/>
                </h3>
                <span class="text-xl h-[1.5rem] text-gray-400 font-medium truncate">
                    <Skeleton/>
                </span>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import Skeleton from './Skeleton/Skeleton.vue';
import type { Song, Playlist } from '../types/Types';
import { usePlayer } from "../stores/Player";

interface Props {
    list: Song[] | Playlist[],
    isLoading: boolean,
    type?: 0 | 1,
}

const props = defineProps<Props>();

const playerStore = usePlayer();

playerStore.autoplay();
</script>

<style lang="scss" scoped>
.thumbnail:hover {
    > div.action {
        opacity: 1;
        visibility: visible;
    }
}

.song__item:hover {
    > .more-options {
        opacity: 1;
        visibility: visible;
    }
}
</style>