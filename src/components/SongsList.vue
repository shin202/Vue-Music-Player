<template>
  <div class="songs">
    <ul v-if="!is_loading && songs.length > 0" class="songs__list flex flex-col h-full">
      <songs-list-item-vue v-for="(song, index) in songs" :key="song.encodeId" :class="{'playing': player_store.is_playing && current_song_store.current_song.encodeId === song.encodeId}">
        <template #order>
          <span>{{ index + 1 }}</span>
        </template>
        <template #image>
          <img
            :src="song.thumbnailM"
            class="w-full h-full object-cover"
          />
        </template>
        <template #play-button>
            <ion-icon v-if="player_store.is_playing && current_song_store.current_song.encodeId === song.encodeId" name="pause-outline" @click="player_store.pause"></ion-icon>
            <ion-icon v-else name="play-outline" @click="player_store.start(song, index, playlistId)"></ion-icon>
        </template>
        <template #name>
          <span>{{ song.title }}</span>
        </template>
        <template #artist>
          <span>{{ song.artistsNames }}</span>
        </template>
        <template #duration>
          <span>{{ get_time(song.duration) }}</span>
        </template>
      </songs-list-item-vue>
    </ul>
    <ul v-else class="songs__list flex flex-col h-full overflow-hidden">
      <songs-list-item-vue class="relative" v-for="i in 10">
        <skeleton-loading class="absolute z-10" />
        <template #fav>
          <div></div>
        </template>
      </songs-list-item-vue>
    </ul>
  </div>
</template>

<script setup lang="ts">
import SongsListItemVue from './SongsListItem.vue';
import SkeletonLoading from './Skeleton/SkeletonLoading.vue';
import { use_current_song_store } from '@/stores/CurrentSong';
import { use_player_store } from '@/stores/Player';
import { get_time } from '@/composables/time';

const props = defineProps<{
  songs: any,
  playlistId: any,
  is_loading: boolean,
}>();

const player_store = use_player_store();
const current_song_store = use_current_song_store();
player_store.autoplay();
</script>

<style lang="scss" scoped>
.songs {
    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
        @apply bg-white rounded-lg;
        box-shadow: inset 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.25);
    }

    &::-webkit-scrollbar-thumb {
        @apply bg-secondary rounded-lg;
    }
}
</style>
