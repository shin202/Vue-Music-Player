<template>
    <div
        class="music-player bg-[#fcfcfc] shadow-lg rounded-lg flex flex-col justify-between items-center p-4 text-center">
        <div class="music-player__inner w-[35rem] h-[40rem] bg-white shadow-xl rounded-[4rem] px-[3rem] py-4">
            <div class="music-player-song flex flex-col justify-center items-center space-y-4">
                <div class="music-player-song__cd spin bg-white w-[20rem] max-w-[20rem] h-[20rem] rounded-[50%] shadow-lg overflow-hidden relative"
                    :style="{
                        'animation-play-state': player_store.is_playing
                            ? 'running'
                            : 'paused',
                    }">
                    <skeleton-loading v-if="is_loading || !current_song_store.current_song.encodeId" />
                    <img v-else class="w-full h-full object-cover" :src="current_song_store.current_song.thumbnailM" />
                </div>
                <skeleton-loading class="h-[4.5rem]" v-if="is_loading" />
                <span v-else
                    class="music-player-song__name text-primary font-bold text-3xl max-w-full h-[4.5rem] max-h[4.5rem]">
                    {{ current_song_store.current_song.title }}
                </span>
                <skeleton-loading class="h-[2rem]" v-if="is_loading || !current_song_store.current_song.encodeId" />
                <span v-else
                    class="music-player-song__artists text-gr text-xl max-w-full h-[2rem] max-h-[2rem] truncate">
                    {{ current_song_store.current_song.artistsNames }}
                </span>
                <skeleton-loading class="h-[0.5rem]" v-if="is_loading || !current_song_store.current_song.encodeId" />
                <div v-else class="music-player-song__progress w-full relative">
                    <div class="progress-bar w-full h-[0.5rem] bg-gray-200 rounded-md relative cursor-pointer"
                        ref="progress_bar" @mousedown="set_progress" @mouseup="is_mouse_down = false">
                        <div :style="{ left: `${current_song_store.song_progress}%` }"
                            class="progress-bar__dot absolute w-[1.5rem] h-[1.5rem] top-[50%] translate-y-[-50%] bg-blue-600 rounded-[50%] border-[0.3rem] border-white shadow-lg transition-all z-[2]">
                        </div>
                        <div :style="{ width: `${current_song_store.song_progress}%` }"
                            class="progress-bar__pseudo absolute h-full top-0 left-0 bg-blue-600 rounded-md transition-all">
                        </div>
                    </div>
                </div>
                <div class="music-player-song__time flex justify-between w-full text-gr text-[1.4rem]">
                    <skeleton-loading class="w-[4rem] h-[1.5rem]" v-if="is_loading || !current_song_store.current_song.encodeId" />
                    <span v-else class="music-player-song__time--current">
                        {{
                                get_time(current_time)
                        }}
                    </span>
                    <skeleton-loading class="w-[4rem] h-[1.5rem]" v-if="is_loading || !current_song_store.current_song.encodeId" />
                    <span v-else class="music-player-song__time--total">
                        {{ get_time(total_time) }}
                    </span>
                </div>
            </div>
        </div>
        <div
            class="music-player-control text-[2.5rem] text-gr text-center w-[30rem] max-w-[30rem] left-[-8%] flex justify-between p-2 items-center m-[2rem] relative">
            <ion-icon name="shuffle-outline" class="cursor-pointer hover:text-secondary"></ion-icon>
            <ion-icon name="play-back-outline" class="cursor-pointer hover:text-secondary" @click="player_store.prev">
            </ion-icon>
            <div
                class="music-player-control__play-pause w-[7rem] h-[7rem] bg-gray-100 rounded-[50%] shadow-xl flex justify-center items-center cursor-pointer relative hover:text-secondary">
                <ion-icon v-if="player_store.is_playing" name="pause-outline" class="text-secondary"
                    @click="player_store.pause"></ion-icon>
                <ion-icon v-else name="play-outline" @click="player_store.play(current_song_store.current_song)">
                </ion-icon>
            </div>
            <ion-icon name="play-forward-outline" class="cursor-pointer hover:text-secondary"
                @click="player_store.next"></ion-icon>
        </div>
        <volume-slider-vue/>
    </div>
</template>

<script setup lang="ts">
import SkeletonLoading from "./Skeleton/SkeletonLoading.vue";
import VolumeSliderVue from "./VolumeSlider.vue";
import { computed, onMounted, ref } from "vue";
import { use_current_song_store } from "@/stores/CurrentSong";
import { use_player_store } from "@/stores/Player";
import { get_time } from "@/composables/time";

const props = defineProps<{
    is_loading: boolean;
}>();

const current_song_store = use_current_song_store();
const player_store = use_player_store();
const is_mouse_down = ref<boolean>(false);
const progress_bar = ref<Element | null>(null);

const current_time = computed(() => current_song_store.current_song.currentTime);
const total_time = computed(() => current_song_store.current_song.duration);

// Set Song Progress when rewind
const set_progress = (e: MouseEvent) => {
    is_mouse_down.value = true;
    const progress_offset = (e.offsetX / progress_bar.value.clientWidth) * 100;
    const seek_time =
        (current_song_store.current_song.duration / 100) * progress_offset;
    player_store.player.currentTime = seek_time;
};

// Update Song Progress
player_store.player.addEventListener("timeupdate", () => {
    if (!is_mouse_down.value) {
        current_song_store.current_song.currentTime =
            player_store.player.currentTime;
        current_song_store.update_progress();
    }
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
