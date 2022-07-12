<template>
    <div v-show="route.path !== '/' && current_song_store.current_song.encodeId"
        class="mini-player fixed w-[82%] h-[9rem] left-[18%] bottom-0 shadow-lg z-[999] py-4">
        <div
            class="container w-full h-full flex flex-wrap lg:flex-nowrap md:flex-nowrap justify-center items-center space-x-6 space-y-3 overflow-hidden">
            <div class="mini-player-song flex flex-auto space-x-6">
                <div
                    class="mini-player-song__thumbnail w-[5rem] h-[5rem] lg:w-[7rem] lg:h-[7rem] overflow-hidden rounded-md">
                    <img :src="current_song_store.current_song.thumbnailM" :alt="current_song_store.current_song.title"
                        class="w-full h-full object-cover" />
                </div>
                <div class="mini-player-song__info flex flex-col w-full">
                    <span class="title font-bold w-[10rem] max-w-[10rem] lg:w-[20rem] lg:max-w-[20rem] truncate">{{
                            current_song_store.current_song.title
                    }}</span>
                    <span
                        class="artists text-[1.2rem] w-[10rem] max-w-[10rem] lg:text-[1.4rem] lg:w-[20rem] lg:max-w-[20rem] truncate">{{
                                current_song_store.current_song.artistsNames
                        }}</span>
                </div>
                <!-- Song Progress -->
                <div class="mini-player-song-progress absolute top-0 left-0 translate-x-[-1.2%] w-full h-[.5rem] bg-white cursor-pointer"
                    ref="progress_bar" @mousedown="set_progress" @mouseup="is_mouse_down = false">
                    <div :style="{ left: `${current_song_store.song_progress}%` }"
                        class="mini-player-song-progress__dot absolute top-[50%] translate-y-[-50%] w-[1.5rem] h-[1.5rem] rounded-[50%] bg-blue-600 shadow-lg border-2 border-white transition-all">
                    </div>
                    <div :style="{ width: `${current_song_store.song_progress}%` }"
                        class="mini-player-song-progress__pseudo absolute top-0 left-0 h-full bg-blue-600 transition-all">
                    </div>
                </div>
                <!-- Song Progress -->
            </div>
            <!-- Control -->
            <div
                class="mini-player-control flex-auto lg:text-[3rem] md:text-[2.2rem] text-gr flex justify-center space-x-20">
                <ion-icon name="shuffle-outline" class="cursor-pointer hover:text-secondary"></ion-icon>
                <ion-icon name="play-back-outline" class="cursor-pointer hover:text-secondary"
                    @click="player_store.prev"></ion-icon>
                <div class="mini-player-control__play-pause flex justify-center items-center">
                    <ion-icon v-if="player_store.is_playing" name="pause-outline" class="cursor-pointer text-secondary"
                        @click="player_store.pause"></ion-icon>
                    <ion-icon v-else name="play-outline" class="cursor-pointer hover:text-secondary"
                        @click="player_store.play(current_song_store.current_song)"></ion-icon>
                </div>
                <ion-icon name="play-forward-outline" class="cursor-pointer hover:text-secondary"
                    @click="player_store.next"></ion-icon>
                <ion-icon name="repeat-outline" class="cursor-pointer hover:text-secondary"></ion-icon>
            </div>
            <!-- Control -->
            <volume-slider-vue />
        </div>
    </div>
</template>

<script setup lang="ts">
import VolumeSliderVue from "./VolumeSlider.vue";
import { useRoute } from "vue-router";
import { use_player_store } from "@/stores/Player";
import { use_current_song_store } from "@/stores/CurrentSong";
import { ref } from "vue";
const route = useRoute();
const player_store = use_player_store();
const current_song_store = use_current_song_store();
const is_mouse_down = ref<boolean>(false);
const progress_bar = ref<Element | null>(null);

// Set Song Progress when rewind
const set_progress = (e: MouseEvent) => {
    is_mouse_down.value = true;
    const progress_offset = (e.offsetX / progress_bar.value.clientWidth) * 100;
    const seek_time = (current_song_store.current_song.duration / 100) * progress_offset;
    player_store.player.currentTime = seek_time;
};

// Update Song Progress
player_store.player.addEventListener("timeupdate", () => {
    if (!is_mouse_down.value) {
        current_song_store.current_song.currentTime = player_store.player.currentTime;
        current_song_store.update_progress();
    }
});
</script>

<style lang="scss" scoped>
.mini-player {
    background-color: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(3rem);
}
</style>
