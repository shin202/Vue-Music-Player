<template>
    <section class="playlist-detail mt-[8.5rem] flex flex-col space-y-16">
        <!-- Playlist Section -->
        <div 
            class="playlist-detail__inner container flex flex-col lg:flex-row justify-center items-center gap-[1rem] lg:space-x-4 space-y-4"
        >
            <div 
                class="playlist-detail__info w-[50%] lg:w-[30%] p-4 flex flex-col justify-center items-center text-center space-y-4"
            >
                <div class="playlist-detail__thumbnail w-full h-[30rem] rounded-2xl overflow-hidden text-center cursor-pointer relative shadow-lg">
                    <SkeletonLoading v-if="isLoading"/>
                    <img :src="playlist?.thumbnailM" :alt="playlist?.title"
                        class="thumbnail w-full h-full object-cover aspect-square hover:scale-110"
                    >
                </div>
                <SkeletonLoading v-if="isLoading" class="h-[3rem]" />
                <h2 v-else class="playlist-detail__title text-[2.5rem] font-bold w-full max-w-full" v-text="playlist?.title" />
                <SkeletonLoading v-if="isLoading" class="h-[2rem]" />
                <span v-else class="playlist-detail__updated-at max-w-full text-gr truncate" v-text="`Cập nhật: ${updatedAt}`" />
                <SkeletonLoading v-if="isLoading" class="h-[4rem]" />
                <span v-else class="playlist-detail__artists max-w-full text-gr" v-text="playlist?.artistsNames" />
            </div>
            <div class="playlist-detail__songs w-full lg:w-[70%] h-full">
                <SongsList :songList="songList" :isLoading="isLoading" :playlistId="playlist?.encodeId" class="w-full h-[70rem] max-h-[70rem] overflow-y-auto overflow-x-hidden" />
            </div>
        </div>
        <!-- Playlist Section -->
        <!-- Artist Section -->
        <div class="artists w-full">
            <div class="artists__inner container">
                <SkeletonLoading v-if="isLoading" class="w-[25rem] h-[3rem]"/>
                <h2 v-else class="heading text-[2.5rem] font-bold">Nghệ sĩ tham gia</h2>
                <div v-if="!isLoading" class="artists__list flex justify-center items-center space-x-6 mt-[2rem]">
                    <div v-for="artist in playlist?.artists" :key="artist.name" class="artists__item flex flex-col justify-center items-center space-y-5 text-center">
                        <div class="artists__thumbnail w-[80%] rounded-[50%] overflow-hidden cursor-pointer shadow-xl">
                            <img :src="artist.thumbnailM" :alt="artist.name" class="thumbnail w-full h-full object-cover hover:scale-110">
                        </div>
                        <span class="artists__name cursor-pointer hover:text-secondary transition-colors truncate max-w-[80%]" 
                            v-text="artist.name" 
                        />
                        <span class="artists__follower" v-text="`${formatNumber(artist.totalFollow)} Follower`" />
                        <Button class="rounded-full p-3 flex space-x-4 justify-center items-center shadow-lg transition-all hover:-translate-y-2" @click="showAlert(alertMessage)">
                            <ion-icon name="person-add-outline" />
                            <span>Follow</span>
                        </Button>
                    </div>
                </div>
                <div v-else class="artists__list flex justify-center items-center space-x-6 mt-[2rem]">
                    <div v-for="i in 4" class="artists__item flex flex-col justify-center items-center space-y-5 text-center flex-auto">
                        <div class="artists__thumbnail w-[80%] aspect-square rounded-[50%] overflow-hidden cursor-pointer shadow-xl">
                            <SkeletonLoading/>
                        </div>
                        <span class="artists__name w-full h-8 cursor-pointer hover:text-secondary transition-colors">
                            <SkeletonLoading/>
                        </span>
                        <span class="artists__follower w-full h-5">
                            <SkeletonLoading/>
                        </span>
                        <Button class="rounded-full p-3 flex space-x-4 justify-center items-center shadow-lg transition-all hover:-translate-y-2" @click="showAlert(alertMessage)">
                            <ion-icon name="person-add-outline" />
                            <span>Follow</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Artist Section -->
        <!-- Suggested Playlists Section -->
        <SuggestedPlaylist :suggestedPlaylists="suggestedPlaylists" :isLoading="isLoading"/>
        <!-- Suggested Playlists Section -->
    </section>
</template>

<script setup lang="ts">
import SongsList from '../components/SongsList.vue';
import SkeletonLoading from '../components/Skeleton/SkeletonLoading.vue';
import Button from '../components/Button/Button.vue';
import SuggestedPlaylist from '../components/SuggestedPlaylist.vue';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { usePlaylists } from '../stores/Playlists';
import { showAlert } from '../composables/Alert';
import type { Playlist } from '../types/Types';

const route = useRoute();
const playlistsStore = usePlaylists();
const isLoading = ref<boolean>(true);
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
const songList = ref<any>(null);
const updatedAt = ref<string>('');
const suggestedPlaylists = ref<any>(null);
const alertMessage = 'Nút này được tạo ra chỉ để bấm cho vui 😎';

const timestampToDate = (timestamp: number = 0): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
}

const formatNumber = (number: number): string => {
    return Intl.NumberFormat('en-US', {notation: "compact"}).format(number);
};

watchEffect(async () => {
    if (route.name === "Playlist" && route.params.id) {
        isLoading.value = true;
        await playlistsStore.fetchPlaylist(route.params.id);
        playlist.value = playlistsStore.getStoredPlaylist(route.params.id);
        songList.value = playlist.value?.song.items;
        updatedAt.value = timestampToDate(playlist.value?.contentLastUpdate);

        // Suggested Playlists at the bottom of page.
        suggestedPlaylists.value = await playlistsStore.fetchSuggestedPlaylist(route.params.id);
        isLoading.value = false;
    }
});
</script>

<style lang="scss" scoped>
.playlist-detail {
    &__thumbnail {
        > img {
            transition: all 0.3s cubic-bezier(.49,.26,.19,.37);
        }
    }

    .thumbnail {
        transition: all 0.3s cubic-bezier(.49,.26,.19,.37);
    }

    &__artists, &__title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>