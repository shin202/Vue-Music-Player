<template>
  <div class="songs">
    <ul v-if="!hasSkeleton" class="songs__list flex flex-col h-full">
      <SongsListItem v-for="(song, index) in songList" :key="song.encodeId" :class="{'playing': isPlaying && currentSongId === song.encodeId}">
        <template #order>
          <span v-text="index + 1"/>
        </template>
        <template #image>
          <img
            :src="song.thumbnailM"
            class="thumbnail w-full h-full object-cover"
          />
        </template>
        <template #play-button>
            <ion-icon v-if="isPlaying && currentSongId === song.encodeId" name="pause-outline" @click="playerStore.pause"></ion-icon>
            <ion-icon v-else name="play-outline" @click="playerStore.start(song, index, playlistId)" />
        </template>
        <template #name>
          <span v-text="song.title" />
        </template>
        <template #artist>
          <span v-text="song.artistsNames" />
        </template>
        <template #duration>
          <span v-text="getTime(song.duration)" />
        </template>
        <template #fav>
          <ion-icon name="heart" />
        </template>
      </SongsListItem>
    </ul>
    <ul v-else class="songs__list flex flex-col h-full overflow-hidden">
      <SongsListItem class="relative" v-for="i in 10">
        <SkeletonLoading class="absolute z-10" />
      </SongsListItem>
    </ul>
  </div>
</template>

<script setup lang="ts">
import SongsListItem from './SongsListItem.vue';
import SkeletonLoading from './Skeleton/SkeletonLoading.vue';
import { computed } from 'vue';
import { useCurrentSong } from '../stores/CurrentSong';
import { usePlayer } from '../stores/Player';
import { getTime } from '../composables/GetTime';
import type { Song } from '../types/Types';

interface Props {
  songList: Song[] | undefined,
  playlistId: any,
  isLoading: boolean,
}

const props = defineProps<Props>();
const playerStore = usePlayer();
const currentSongStore = useCurrentSong();

const currentSongId = computed(() => currentSongStore.currentSong.encodeId); 
const isPlaying = computed(() => playerStore.isPlaying);
const hasSkeleton = computed(() => props.isLoading);

playerStore.autoplay();
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
