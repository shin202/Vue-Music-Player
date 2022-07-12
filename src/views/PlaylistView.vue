<template>
    <section class="playlist-detail mt-[8.5rem] flex flex-col space-y-16">
        <!-- Playlist Section -->
        <div class="playlist-detail__inner container flex flex-col lg:flex-row justify-center items-center gap-[1rem] lg:space-x-4 space-y-4">
            <div class="playlist-detail__info w-[50%] lg:w-[30%] p-4 flex flex-col justify-center items-center text-center space-y-4">
                <div class="playlist-detail__thumbnail w-full h-[30rem] rounded-2xl overflow-hidden text-center cursor-pointer relative shadow-lg">
                    <skeleton-loading v-if="is_loading"/>
                    <img :src="playlist?.thumbnailM" :alt="playlist?.title"
                        class="thumbnail w-full h-full object-cover aspect-square hover:scale-110"
                    >
                </div>
                <skeleton-loading v-if="is_loading" class="h-[3rem]" />
                <h2 v-else class="playlist-detail__title text-[2.5rem] font-bold w-full max-w-full">
                    {{ playlist?.title }}
                </h2>
                <skeleton-loading v-if="is_loading" class="h-[2rem]" />
                <span v-else class="playlist-detail__updated-at max-w-full text-gr truncate">
                    Cập nhật: {{ updated_at }}
                </span>
                <skeleton-loading v-if="is_loading" class="h-[4rem]" />
                <span v-else class="playlist-detail__artists max-w-full text-gr">{{ playlist?.artistsNames }}</span>
            </div>
            <div class="playlist-detail__songs w-full lg:w-[70%] h-full">
                <songs-list-vue :songs="songs" :is_loading="is_loading" :playlist-id="playlist?.encodeId" class="w-full h-[70rem] max-h-[70rem] overflow-y-auto overflow-x-hidden" />
            </div>
        </div>
        <!-- Playlist Section -->
        <!-- Artist Section -->
        <div class="artists w-full">
            <div class="artists__inner container">
                <skeleton-loading v-if="is_loading" class="w-[25rem] h-[3rem]"/>
                <h2 v-else class="heading text-[2.5rem] font-bold">Nghệ sĩ tham gia</h2>
                <div v-if="!is_loading" class="artists__list flex justify-center items-center space-x-6 mt-[2rem]">
                    <div v-for="artist in playlist?.artists" :key="artist.name" class="artists__item flex flex-col justify-center items-center space-y-5 text-center">
                        <div class="artists__thumbnail w-[80%] rounded-[50%] overflow-hidden cursor-pointer shadow-xl">
                            <img :src="artist.thumbnailM" :alt="artist.name" class="thumbnail w-full h-full object-cover hover:scale-110">
                        </div>
                        <span class="artists__name cursor-pointer hover:text-secondary transition-colors truncate max-w-[80%]">
                            {{ artist.name }}
                        </span>
                        <span class="artists__follower">
                            {{ format_number(artist.totalFollow) }} Follower
                        </span>
                        <button-vue class="rounded-full p-3 flex space-x-4 justify-center items-center shadow-lg transition-all hover:-translate-y-2" @click="show_alert">
                            <ion-icon name="person-add-outline"></ion-icon>
                            <span>Follow</span>
                        </button-vue>
                    </div>
                </div>
                <div v-else class="artists__list flex justify-center items-center space-x-6 mt-[2rem]">
                    <div v-for="i in 4" class="artists__item flex flex-col justify-center items-center space-y-5 text-center flex-auto">
                        <div class="artists__thumbnail w-[80%] aspect-square rounded-[50%] overflow-hidden cursor-pointer shadow-xl">
                            <skeleton-loading/>
                        </div>
                        <span class="artists__name w-full h-8 cursor-pointer hover:text-secondary transition-colors">
                            <skeleton-loading/>
                        </span>
                        <span class="artists__follower w-full h-5">
                            <skeleton-loading/>
                        </span>
                        <button-vue class="rounded-full p-3 flex space-x-4 justify-center items-center shadow-lg transition-all hover:-translate-y-2" @click="show_alert">
                            <ion-icon name="person-add-outline"></ion-icon>
                            <span>Follow</span>
                        </button-vue>
                    </div>
                </div>
            </div>
        </div>
        <!-- Artist Section -->
        <!-- Suggested Playlists Section -->
        <suggested-playlist-vue :suggested_playlists="suggested_playlists" :is_loading="is_loading"/>
        <!-- Suggested Playlists Section -->
    </section>
</template>

<script setup lang="ts">
import SongsListVue from '@/components/SongsList.vue';
import SkeletonLoading from '../components/Skeleton/SkeletonLoading.vue';
import ButtonVue from '@/components/Button/Button.vue';
import SuggestedPlaylistVue from '@/components/SuggestedPlaylist.vue';

import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { use_playlists_store } from '@/stores/Playlists';
import Swal from 'sweetalert2';
import type { playlist_type } from '@/types';

const route = useRoute();
const playlists_store = use_playlists_store();
const is_loading = ref<boolean>(true);
const playlist = ref<playlist_type>();
const suggested_playlists = ref<any>();
const updated_at = ref<string>('');

const songs = computed(() => playlist.value?.song.items);

const timestamp_to_date = (timestamp: number = 0): void => {
    const date = new Date(timestamp * 1000);
    updated_at.value = date.toLocaleDateString();
}

const format_number = (number: number): string => {
    return Intl.NumberFormat('en-US', {notation: "compact"}).format(number);
};

const show_alert = (): void => {
    Swal.fire({
        position: 'top-end',
        padding: '1rem',
        toast: true,
        width: '30rem',
        icon: 'error',
        title: 'Nút này được tạo ra chỉ để bấm cho vui 😎',
        showConfirmButton: false,
        timer: 2500
    })
}

watchEffect(async () => {
    if (route.name === "Playlist" && route.params.id) {
        is_loading.value = true;
        await playlists_store.set_playlist(route.params.id);
        playlist.value = playlists_store.get_stored_playlist(route.params.id);
        timestamp_to_date(playlist.value?.contentLastUpdate);

        // Suggested Playlists at the bottom of page.
        suggested_playlists.value = await playlists_store.fetch_suggested_playlists(route.params.id);
        is_loading.value = false;
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