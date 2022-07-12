<template>
    <section class="home relative">
        <!-- Carousel -->
        <div class="music-gallery leading-relaxed mt-[8.5rem]">
            <div class="music-gallery__inner container flex flex-col justify-start items-start relative">
                <heading-vue class="w-[50%]">
                    <template #title>
                        <skeleton-loading v-if="is_loading"/>
                        <span v-else>{{ title }}</span>
                    </template>
                    <template #desc>
                        <skeleton-loading v-if="is_loading"/>
                        <span v-else>{{ carousel_length }} Albums</span>
                    </template>
                </heading-vue>
                <carousel-vue :items="carousel_items" :is_loading="is_loading"/>
            </div>
        </div>
        <!-- Carousel -->
        <!-- Playlist / Player -->
        <div class="playlist-player mt-[2rem]">
            <div class="playlist-player__inner container flex flex-col justify-start lg:flex-row gap-[1rem]">
                <!-- Playlist -->
                <div class="random-playlist flex flex-col lg:w-[50%] lg:flex-initial">
                    <heading-vue class="mt-[3rem] pl-[1rem] pr-[1rem]">
                        <template #title>
                            <skeleton-loading v-if="is_loading" />
                            <span v-else>{{ playlist_title }}</span>
                        </template>
                        <template #desc>
                            <skeleton-loading v-if="is_loading"/>
                            <span v-else>{{ total_song }} Songs</span>
                        </template>
                    </heading-vue>
                    <songs-list-vue :songs="songs" :is_loading="is_loading" :playlist-id="playlist?.encodeId" class="w-full h-[50rem] max-h-[50rem] overflow-y-scroll overflow-x-hidden" />
                </div>
                <!-- Playlist -->
                <!-- Player -->
                <div class="player flex flex-col flex-auto">
                    <heading-vue class="mt-[3rem] pl-[1rem] pr-[1rem]">
                        <template #title>
                            <skeleton-loading v-if="is_loading" />
                            <span v-else>Đang phát...</span>
                        </template>
                        <template #desc>
                            <skeleton-loading v-if="is_loading" />
                            <span v-else>{{ current_song_title }}</span>
                        </template>
                    </heading-vue>
                    <player-vue :is_loading="is_loading" class="w-full m-4 h-[50rem] max-h-[50rem]" />
                </div>
                <!-- Player -->
            </div>
        </div>
        <!-- Playlist / Player -->
    </section>
</template>

<script setup lang="ts">
import CarouselVue from '@/components/Carousel/Carousel.vue';
import HeadingVue from '@/components/Heading/Heading.vue';
import SongsListVue from '@/components/SongsList.vue';
import PlayerVue from '@/components/Player.vue';
import SkeletonLoading from '@/components/Skeleton/SkeletonLoading.vue';
import { computed, onMounted, ref } from 'vue';
import { get_home } from '@/api/Home';
import { use_playlists_store } from '@/stores/Playlists';
import { use_current_song_store } from '@/stores/CurrentSong';
import type { home_playlist_type, playlist_type } from '@/types';

const carousel = ref<home_playlist_type[]>([]);
const playlists_store = use_playlists_store();
const current_song_store = use_current_song_store();
const is_loading = ref(true);
const title = ref<string>('');
const carousel_items = ref<any[]>([]);
const playlist = ref<playlist_type>();

const set_carousel = (data: any): void => {
    carousel.value = data.data.items.filter((val: home_playlist_type) => val.sectionType === "playlist");
    title.value = carousel.value[0].title;
    carousel_items.value = carousel.value[0].items;
}

const carousel_length = computed(() => carousel_items.value.length);
const current_song_title = computed(() => current_song_store.current_song.title);
const playlist_title = computed(() => playlist.value?.title);
const total_song = computed(() => playlist.value?.song.total);
const songs = computed(() => playlist.value?.song.items);

onMounted(async () => {
    const data = await get_home();
    set_carousel(data);
    await playlists_store.set_playlist("ZWZB96AB");
    playlist.value = playlists_store.get_stored_playlist("ZWZB96AB");
    is_loading.value = false;
});
</script>

<style lang="scss">
</style>