<template>
    <div
        class="music-player bg-[#fcfcfc] shadow-lg rounded-lg flex flex-col justify-between items-center p-4 text-center">
        <div class="music-player__inner w-[35rem] h-[40rem] bg-white shadow-xl rounded-[4rem] px-[3rem] py-4">
            <div class="music-player-song flex flex-col justify-center items-center space-y-4">
                <div class="music-player-song__cd spin bg-white w-[20rem] max-w-[20rem] h-[20rem] rounded-[50%] shadow-lg overflow-hidden relative"
                    :style="{'animation-play-state': isPlaying ? 'running' : 'paused'}"
                >
                    <SkeletonLoading v-if="hasSkeleton" />
                    <img v-else class="cd-thumbnail w-full h-full object-cover" :src="currentSongThumbnail" />
                </div>
                <SkeletonLoading class="h-[4.5rem]" v-if="isLoading" />
                <span v-else
                    class="music-player-song__name text-primary font-bold text-3xl max-w-full h-[4.5rem] max-h[4.5rem]"
                    v-text="currentSongTitle" 
                />
                <SkeletonLoading class="h-[2rem]" v-if="isLoading || !currentSongStore.currentSong.encodeId" />
                <span v-else
                    class="music-player-song__artists text-gr text-xl max-w-full h-[2rem] max-h-[2rem] truncate"
                    v-text="currentSongArtists"
                />
                <SkeletonLoading class="h-[0.5rem]" v-if="hasSkeleton" />
                <div v-else class="music-player-song__progress w-full relative">
                    <div class="progress-bar w-full h-[0.5rem] bg-gray-200 rounded-md relative cursor-pointer"
                        ref="progressBar"
                        @mousedown="handleMouseDown"
                        @mousemove="handleMouseMove"
                    >
                        <div :style="{ left: `${currentSongStore.songProgress}%` }"
                            class="progress-bar__dot absolute w-[1.5rem] h-[1.5rem] top-[50%] translate-y-[-50%] bg-blue-600 rounded-[50%] border-[0.3rem] border-white shadow-lg transition-all z-[2]"
                        />
                        <div :style="{ width: `${currentSongStore.songProgress}%` }"
                            class="progress-bar__pseudo absolute h-full top-0 left-0 bg-blue-600 rounded-md transition-all"
                        />
                    </div>
                </div>
                <div class="music-player-song__time flex justify-between w-full text-gr text-[1.4rem]">
                    <SkeletonLoading class="w-[4rem] h-[1.5rem]" v-if="hasSkeleton" />
                    <span v-else class="music-player-song__time--current" v-text="getTime(currentSongTime)" />
                    <SkeletonLoading class="w-[4rem] h-[1.5rem]" v-if="hasSkeleton" />
                    <span v-else class="music-player-song__time--total" v-text="getTime(totalSongTime)" />
                </div>
            </div>
        </div>
        <div
            class="music-player-control text-[2.5rem] text-gr text-center w-[30rem] max-w-[30rem] left-[-8%] flex justify-between p-2 items-center m-[2rem] relative">
            <ion-icon name="shuffle-outline" class="cursor-pointer hover:text-secondary" />
            <ion-icon name="play-back-outline" class="cursor-pointer hover:text-secondary" @click="playerStore.prev" />
            <div
                class="music-player-control__play-pause w-[7rem] h-[7rem] bg-gray-100 rounded-[50%] shadow-xl flex justify-center items-center cursor-pointer relative hover:text-secondary">
                <ion-icon v-if="isPlaying" name="pause-outline" class="text-secondary" @click="playerStore.pause" />
                <ion-icon v-else name="play-outline" @click="playerStore.play(currentSongStore.currentSong)" />
            </div>
            <ion-icon name="play-forward-outline" class="cursor-pointer hover:text-secondary" @click="playerStore.next" />
        </div>
        <VolumeSlider/>
    </div>
</template>

<script setup lang="ts">
import SkeletonLoading from "./Skeleton/SkeletonLoading.vue";
import VolumeSlider from "./VolumeSlider.vue";
import { computed, ref } from "vue";
import { useCurrentSong } from "../stores/CurrentSong";
import { usePlayer } from "../stores/Player";
import { getTime } from "../composables/GetTime";
import { useEventListener } from "../composables/Event";

const props = defineProps<{
    isLoading: boolean;
}>();

const currentSongStore = useCurrentSong();
const playerStore = usePlayer();
const isMouseDown = ref<boolean>(false);
const progressBar = ref<any>();

const isPlaying = computed(() => playerStore.isPlaying);
const hasSkeleton = computed(() => props.isLoading || !currentSongStore.currentSong.encodeId);
const currentSongTime = computed(() => currentSongStore.currentSong.currentTime);
const totalSongTime = computed(() => currentSongStore.currentSong.duration);
const currentSongThumbnail = computed(() => currentSongStore.currentSong.thumbnailM);
const currentSongTitle = computed(() => currentSongStore.currentSong.title);
const currentSongArtists = computed(() => currentSongStore.currentSong.artistsNames);

const setMouseStatus = (status: boolean): void => {
    isMouseDown.value = status;
}

const setSongProgress = (e: MouseEvent): void => {
    if (e.offsetX < 0) return;

    const progressPercent = (e.offsetX / progressBar.value.clientWidth) * 100;
    const seekTime = (currentSongStore.currentSong.duration / 100) * progressPercent;
    playerStore.player.currentTime = seekTime;
}

const handleMouseDown = (e: MouseEvent): void => {
    setMouseStatus(true);
    setSongProgress(e);
}

const handleMouseMove = (e: MouseEvent): void => {
    isMouseDown.value && setSongProgress(e);
}

useEventListener(playerStore.player, "timeupdate", () => {
    currentSongStore.currentSong.currentTime = playerStore.player.currentTime;
    currentSongStore.updateSongProgress();
});

useEventListener(document, "mouseup", () => {
    setMouseStatus(false);
});
</script>

<style lang="scss" scoped>
.music-player {
    &-song {
        &__cd {
            &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 30%;
                height: 30%;
                @apply bg-white;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                box-shadow: inset 0.4rem 0.4rem 1rem rgba(0, 0, 0, 0.25),
                    inset -0.4rem -0.4rem 1rem rgba(0, 0, 0, 0.15);
            }
        }

        &__name {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

    &-control {
        &__play-pause {
            &::before {
                content: "";
                position: absolute;
                width: 80%;
                height: 80%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                @apply bg-white rounded-[50%];
                box-shadow: 0.3rem 0.3rem 0.5rem rgba(0, 0, 0, 0.15),
                    -0.3rem -0.3rem 0.5rem rgba(0, 0, 0, 0.15);
            }
        }
    }
}
</style>
