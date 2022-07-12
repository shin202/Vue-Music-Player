import { defineStore } from "pinia";
import { ref } from "vue";
import type { song_type } from "@/types";

export const use_current_song_store = defineStore('current_song_store', () => {

    const current_song = ref<song_type>({
        encodeId: '',
        index: 0,
        artistsNames: '',
        title:'',
        thumbnailM: '',
        duration: 0,
        currentTime: 0,
        "128": '',
        "320": '',
    });

    const song_progress = ref<number>(0);

    const set_current_song = (song: song_type) => {
        current_song.value = song;
    }

    const update_progress = (): void => {
        const progress_percent = Math.ceil(current_song.value.currentTime / current_song.value.duration * 100);
        song_progress.value = progress_percent;
    }

    return {
        set_current_song,
        update_progress,
        current_song,
        song_progress,
    }
}, {
    persist: true,
});