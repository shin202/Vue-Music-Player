import { defineStore } from "pinia";
import { get_song } from "@/api/Song";

export const use_songs_store = defineStore('songs_store', () => {
    const fetch_song = async (id: string): Promise<any> => {
        const data = await get_song(id);
        return data;
    }

    return {
        fetch_song,
    }
});