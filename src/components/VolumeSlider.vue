<template>
    <!-- Volume -->
    <div
        class="player-volume flex-auto lg:text-[2.2rem] flex justify-center items-center flex-nowrap space-x-6">
        <div class="player-volume__icon cursor-pointer">
            <ion-icon v-if="playerStore.player.volume === 0" name="volume-mute-outline" @click="setMaxVolume" />
            <ion-icon v-else name="volume-high-outline" @click="setMinVolume" />
        </div>
        <!-- Volume Slider -->
        <div class="player-volume-slider w-[7rem] h-[0.7rem] lg:w-[15rem] lg:h-[1rem] bg-gray-300 rounded-lg shadow-lg relative cursor-pointer"
            ref="volumeSlider" @mousedown="setVolume"
        >
            <div :style="{ width: `${playerStore.volumeProgress}%` }"
                class="player-volume-slider__pseudo absolute top-0 left-0 h-full bg-blue-600 rounded-lg transition-all"
            />
        </div>
        <!-- Volume Slider -->
    </div>
    <!-- Volume -->
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { usePlayer } from '../stores/Player';

const playerStore = usePlayer();
const volumeSlider = ref<any>();

const setVolume = (e: MouseEvent) => {
    const seek_volume = (1 / volumeSlider.value.clientWidth) * e.offsetX;
    playerStore.player.volume = seek_volume < 0 ? 0 : seek_volume;
    playerStore.updateVolume();
};

const setMaxVolume = (): void => {
    playerStore.player.volume = 1;
    playerStore.updateVolume();
};

const setMinVolume = (): void => {
    playerStore.player.volume = 0;
    playerStore.updateVolume();
};

onMounted(() => {
    playerStore.updateVolume();
});
</script>

<style scoped>

</style>