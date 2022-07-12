import { defineStore } from "pinia";
import { ref } from "vue";
import type { playlist_type } from "@/types";

export const use_current_playlist_store = defineStore('current_playlist_store', () => {

    const current_playlist = ref<playlist_type>({
        encodeId: '',
        title: '',
        thumbnailM: '',
        releaseDate: '',
        sortDescription: '',
        artistsNames: '',
        artists: [],
        contentLastUpdate: 0,
        song: {
            items: [],
            total: 0,
        }
    });

    const set_current_playlist = (playlist: playlist_type) => {
        current_playlist.value = playlist;
    }

    return {
        set_current_playlist,
        current_playlist,
    }
}, {
    persist: true,
});