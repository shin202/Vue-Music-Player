<template>
    <div v-show="$route.path !== '/' && currentSongId"
        class="mini-player fixed w-[82%] h-[9rem] left-[18%] bottom-0 shadow-lg z-[999] py-4"
    >
        <div
            class="container w-full h-full flex flex-wrap lg:flex-nowrap md:flex-nowrap justify-center items-center space-x-6 space-y-3 overflow-hidden"
        >
            <div class="mini-player-song flex flex-auto space-x-6">
                <div
                    class="mini-player-song__thumbnail w-[5rem] h-[5rem] lg:w-[7rem] lg:h-[7rem] overflow-hidden rounded-md">
                    <img 
                        :src="currentSongThumbnail" 
                        :alt="currentSongTitle"
                        class="w-full h-full object-cover"
                    >
                </div>
                <div class="mini-player-song__info flex flex-col w-full">
                    <span 
                        class="title font-bold w-[10rem] max-w-[10rem] lg:w-[20rem] lg:max-w-[20rem] truncate" 
                        v-text="currentSongTitle"
                    />
                    <span
                        class="artists text-[1.2rem] w-[10rem] max-w-[10rem] lg:text-[1.4rem] lg:w-[20rem] lg:max-w-[20rem] truncate" 
                        v-text="currentSongArtists"
                    />
                </div>
                <!-- Song Progress -->
                <div 
                    class="mini-player-song-progress absolute top-0 left-0 translate-x-[-1.2%] w-full h-[0.7rem] bg-white cursor-pointer"
                    ref="progressBar" 
                    @mousedown="handleMouseDown"
                    @mouseleave="handleMouseMove"
                >
                    <div :style="{ left: `${currentSongStore.songProgress}%` }"
                        class="mini-player-song-progress__dot absolute top-[50%] translate-y-[-50%] w-[1.5rem] h-[1.5rem] rounded-[50%] bg-blue-600 shadow-lg border-2 border-white transition-all"
                    />
                    <div :style="{ width: `${currentSongStore.songProgress}%` }"
                        class="mini-player-song-progress__pseudo absolute top-0 left-0 h-full bg-blue-600 transition-all"
                    />
                </div>
                <!-- Song Progress -->
            </div>
            <!-- Control -->
            <div
                class="mini-player-control flex-auto lg:text-[3rem] md:text-[2.2rem] text-gr flex justify-center space-x-20">
                <ion-icon name="shuffle-outline" class="cursor-pointer hover:text-secondary" />
                <ion-icon name="play-back-outline" class="cursor-pointer hover:text-secondary" @click="playerStore.prev" />
                <div class="mini-player-control__play-pause flex justify-center items-center">
                    <ion-icon v-if="isPlaying" name="pause-outline" class="cursor-pointer text-secondary" 
                        @click="playerStore.pause" 
                    />
                    <ion-icon v-else name="play-outline" class="cursor-pointer hover:text-secondary"
                        @click="playerStore.play(currentSongStore.currentSong)" 
                    />
                </div>
                <ion-icon name="play-forward-outline" class="cursor-pointer hover:text-secondary"
                    @click="playerStore.next" 
                />
                <ion-icon name="repeat-outline" class="cursor-pointer hover:text-secondary" />
            </div>
            <!-- Control -->
            <VolumeSlider/>
        </div>
    </div>
</template>

<script setup lang="ts">
import VolumeSlider from "./VolumeSlider.vue";
import { usePlayer } from "../stores/Player";
import { useCurrentSong } from "../stores/CurrentSong";
import { computed, ref } from "vue";
import { useEventListener } from "../composables/Event";

const playerStore = usePlayer();
const currentSongStore = useCurrentSong();
const progressBar = ref<any>();
const isMouseDown = ref<boolean>(false);

const currentSongId = computed(() => currentSongStore.currentSong.encodeId);
const currentSongThumbnail = computed(() => currentSongStore.currentSong.thumbnailM);
const currentSongTitle = computed(() => currentSongStore.currentSong.title);
const currentSongArtists = computed(() => currentSongStore.currentSong.artistsNames);
const isPlaying = computed(() => playerStore.isPlaying);

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
.mini-player {
    background-color: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(3rem);
}
</style>
