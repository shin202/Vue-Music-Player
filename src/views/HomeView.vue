<template>
    <section class="home relative">
        <!-- Carousel -->
        <div class="music-gallery leading-relaxed mt-[8.5rem]">
            <div class="music-gallery__inner container flex flex-col justify-start items-start relative">
                <Heading class="w-[50%]">
                    <template #title>
                        <SkeletonLoading v-if="isLoading"/>
                        <span v-else v-text="carouselTitle"/>
                    </template>
                    <template #desc>
                        <SkeletonLoading v-if="isLoading"/>
                        <span v-else v-text="`${carouselNoPlaylist} Albums`"/>
                    </template>
                </Heading>
                <Carousel :playlists="carouselPlaylists" :isLoading="isLoading"/>
            </div>
        </div>
        <!-- Carousel -->
        <!-- Playlist / Player -->
        <div class="playlist-player mt-[2rem]">
            <div class="playlist-player__inner container flex flex-col justify-start lg:flex-row gap-[1rem]">
                <!-- Playlist -->
                <div class="random-playlist flex flex-col lg:w-[50%] lg:flex-initial">
                    <Heading class="mt-[3rem] pl-[1rem] pr-[1rem]">
                        <template #title>
                            <SkeletonLoading v-if="isLoading" />
                            <span v-else v-text="songListTitle"/>
                        </template>
                        <template #desc>
                            <SkeletonLoading v-if="isLoading"/>
                            <span v-else v-text="`${totalSongs} Songs`"/>
                        </template>
                    </Heading>
                    <SongsList :songList="songList" :isLoading="isLoading" :playlistId="playlistId" class="w-full h-[52rem] max-h-[52rem] overflow-y-scroll overflow-x-hidden" />
                </div>
                <!-- Playlist -->
                <!-- Player -->
                <div class="player flex flex-col flex-auto">
                    <Heading class="mt-[3rem] pl-[1rem] pr-[1rem]">
                        <template #title>
                            <SkeletonLoading v-if="isLoading" />
                            <span v-else>Đang phát...</span>
                        </template>
                        <template #desc>
                            <SkeletonLoading v-if="isLoading" />
                            <span v-else v-text="currentSongTitle"/>
                        </template>
                    </Heading>
                    <Player :isLoading="isLoading" class="w-full m-4 h-[52rem] max-h-[52rem]" />
                </div>
                <!-- Player -->
            </div>
        </div>
        <!-- Playlist / Player -->
    </section>
</template>

<script setup lang="ts">
import Carousel from '../components/Carousel/Carousel.vue';
import Heading from '../components/Heading/Heading.vue';
import SongsList from '../components/SongsList.vue';
import Player from '../components/Player.vue';
import SkeletonLoading from '../components/Skeleton/SkeletonLoading.vue';
import { computed, onMounted, ref } from 'vue';
import { getHome } from '../api/Home';
import { usePlaylists } from '../stores/Playlists';
import { useCurrentSong } from '../stores/CurrentSong';
import type { HomeData, Playlist } from '../types/Types';

const playlistsStore = usePlaylists();
const currentSongStore = useCurrentSong();
const isLoading = ref(true);
const homeData = ref<HomeData[]>([]);
const carouselTitle = ref<string>('');
const carouselPlaylists = ref<any[]>([]);
const playlist = ref<Playlist | undefined>({
    encodeId: '',
    title: '',
    thumbnailM: '',
    releaseDate: '',
    sortDescription: '',
    artistsNames: '',
    artists: [],
    contentLastUpdate: 0,
    song: {
        items: [],
        total: 0,
    },
    items: [],
});

const setHomeData = (data: any): void => {
    homeData.value = data.data.items.filter((val: HomeData) => val.sectionType === "playlist")
}

const setCarouselData = (): void => {
    carouselTitle.value = homeData.value[0].title;
    carouselPlaylists.value = homeData.value[0].items;
}

const carouselNoPlaylist = computed(() => carouselPlaylists.value.length);
const currentSongTitle = computed(() => currentSongStore.currentSong.title);
const songList = computed(() => playlist.value?.song.items);
const songListTitle = computed(() => playlist.value?.title);
const totalSongs = computed(() => playlist.value?.song.total);
const playlistId = computed(() => playlist.value?.encodeId);

onMounted(async () => {
    const data = await getHome();
    setHomeData(data);
    setCarouselData();
    await playlistsStore.fetchPlaylist("ZOUWE9EO");
    playlist.value = playlistsStore.getStoredPlaylist("ZOUWE9EO");
    isLoading.value = false;
});
</script>

<style lang="scss">
</style>