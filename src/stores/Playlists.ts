import { defineStore } from "pinia";
import { ref } from "vue";
import { get_playlist, get_suggested_playlists } from "@/api/Playlist";
import type { playlist_type, suggested_playlists_type } from "@/types";

export const use_playlists_store = defineStore('playlists_store', () => {
    const playlists = ref<playlist_type[]>([]);

    const fetch_playlist = async (id: string) => {
        const data = await get_playlist(id);
        return data.data;
    }

    const set_playlist = async (id: string) => {
        if (existed_playlist(id)) {
            return;
        }
        
        const data = await fetch_playlist(id);

        playlists.value.push(data);
    }

    const get_stored_playlist = (id: string) => {
        return playlists.value.find(playlist => playlist.encodeId === id);
    }

    const existed_playlist = (id: string): boolean => {
        return playlists.value.some(playlist => {
            if (playlist.encodeId === id) {
                return true;
            }

            return false;
        });
    }

    const fetch_suggested_playlists = async (id: string) => {
        const data: suggested_playlists_type = await get_suggested_playlists(id);
        return data.data.filter((playlists: suggested_playlists_type) => playlists.sectionType === "playlist");
    }

    return {
        fetch_playlist,
        set_playlist,
        get_stored_playlist,
        playlists,
        fetch_suggested_playlists,
    }
});