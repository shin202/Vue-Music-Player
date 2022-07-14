<template>
    <div v-if="!isLoading" class="suggested-playlists flex flex-col space-y-16">
        <div v-for="playlists in suggestedPlaylists" :key="playlists.encodeId" 
            class="suggested-playlists__inner container"
        >
            <div class="suggested-playlists__heading text-[2.5rem] font-bold capitalize flex justify-between">
                <h2 class="suggested-playlists__title" v-text="playlists.title" />
            </div>
            <div class="suggested-playlists__list grid grid-cols-2 grid-rows-none md:grid-cols-3 md:grid-rows-none lg:grid-cols-5 lg:grid-rows-none mt-[2rem] gap-5">
                <div v-for="playlist in limitArrayElement(playlists.items, 5)" :key="playlist.encodeId" 
                    class="suggested-playlists__item h-full flex flex-col space-y-2"
                >
                    <div class="suggested-playlists__thumbnail bg-gray-400 h-[20rem] rounded-lg overflow-hidden cursor-pointer shadow-lg">
                        <RouterLink :to="`/playlist/${playlist.encodeId}`">
                            <img v-lazy="playlist.thumbnailM" :alt="playlist.title" 
                                class="thumbnail w-full h-full object-cover hover:scale-110"
                            >
                        </RouterLink>
                    </div>
                    <div class="suggested-playlists__title truncate font-bold cursor-pointer transition-colors hover:text-secondary">
                        <span v-text="playlist.title" />
                    </div>
                    <div class="suggested-playlists__artists truncate text-gr cursor-pointer transition-colors hover:text-secondary">
                        <span v-text="playlist.artistsNames" /> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="suggested-playlists flex flex-col space-y-16">
        <div v-for="i in 3" class="suggested-playlists__inner container">
            <SkeletonLoading class="w-[25rem] h-[3rem]" />
            <div class="suggested-playlists__list grid grid-cols-2 grid-rows-none md:grid-cols-3 md:grid-rows-none lg:grid-cols-5 lg:grid-rows-none mt-[2rem] gap-5">
                <div v-for="i in 5" class="suggested-playlists__item h-full flex flex-col space-y-2">
                    <div class="suggested-playlists__thumbnail bg-gray-400 h-[20rem] rounded-lg overflow-hidden cursor-pointer shadow-lg">
                        <SkeletonLoading />
                    </div>
                    <div class="suggested-playlists__title truncate font-bold cursor-pointer transition-colors hover:text-secondary">
                        <SkeletonLoading class="h-[2.5rem]" />
                    </div>
                    <div class="suggested-playlists__artists truncate text-gr cursor-pointer transition-colors hover:text-secondary">
                        <SkeletonLoading class="h-[1.5rem]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Playlist } from '../types/Types';
import SkeletonLoading from './Skeleton/SkeletonLoading.vue';

interface Props {
    suggestedPlaylists: Playlist[] | undefined,
    isLoading: boolean,
}

const props = defineProps<Props>();

const limitArrayElement = (array: any[], limit: number): any[] => (array.slice(0, limit));
</script>

<style lang="scss" scoped>
.suggested-playlists__inner:last-child {
    margin-bottom: 9rem;
}

.thumbnail {
    transition: all 0.3s cubic-bezier(.49,.26,.19,.37);
}
</style>