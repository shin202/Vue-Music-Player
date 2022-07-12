<template>
    <!-- Volume -->
    <div
        class="player-volume flex-auto lg:text-[2.2rem] flex justify-center items-center flex-nowrap space-x-6">
        <div class="player-volume__icon cursor-pointer">
            <ion-icon v-if="player_store.player.volume === 0" name="volume-mute-outline" @click="max_volume">
            </ion-icon>
            <ion-icon v-else name="volume-high-outline" @click="min_volume"></ion-icon>
        </div>
        <!-- Volume Slider -->
        <div class="player-volume-slider w-[7rem] h-[0.7rem] lg:w-[15rem] lg:h-[1rem] bg-gray-300 rounded-lg shadow-lg relative cursor-pointer"
            ref="volume_slider" @mousedown="set_volume">
            <div :style="{ width: `${player_store.volume_progress}%` }"
                class="player-volume-slider__pseudo absolute top-0 left-0 h-full bg-blue-600 rounded-lg transition-all">
            </div>
        </div>
        <!-- Volume Slider -->
    </div>
    <!-- Volume -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { use_player_store } from '@/stores/Player';

const player_store = use_player_store();
const volume_slider = ref<Element | null>(null);

const set_volume = (e: MouseEvent) => {
    const seek_volume = (1 / volume_slider.value.clientWidth) * e.offsetX;
    if (seek_volume < 0) {
        player_store.player.volume = 0;
    } else {
        player_store.player.volume = seek_volume;
    }

    player_store.update_volume();
};

const max_volume = (): void => {
    player_store.player.volume = 1;
    player_store.update_volume();
};

const min_volume = (): void => {
    player_store.player.volume = 0;
    player_store.update_volume();
};

onMounted(() => {
    player_store.update_volume();
});
</script>

<style scoped>

</style>