import { defineStore } from "pinia";
import { get_song } from "@/api/Song";
import { use_current_song_store } from "./CurrentSong";
import Swal from "sweetalert2";
import { ref } from "vue";
import { use_current_playlist_store } from "./CurrentPlaylist";
import { use_playlists_store } from "./Playlists";
import type { song_type } from "@/types";

export const use_player_store = defineStore('player_store', () => {
    const current_song_store = use_current_song_store();
    const current_playlist_store = use_current_playlist_store();
    const playlist_store = use_playlists_store();
    const player = new Audio();
    const is_playing = ref<boolean>(false);
    const current_song_index = ref<number>(current_song_store.current_song.index ? current_song_store.current_song.index : 0);
    const total_songs = current_playlist_store.current_playlist.song.total;
    const volume_progress = ref<number>(1);

    // Init Player
    const init_player = (src: string): void => {
        player.src = src;
        player.currentTime = current_song_store.current_song.currentTime ? current_song_store.current_song.currentTime : 0;
    }

    // Init Playlist
    const init_playlist = (id: string): void => {
        const playlist = playlist_store.get_stored_playlist(id);
        current_playlist_store.set_current_playlist(playlist);
    }

    // Play
    const play = (song?: song_type): void => {
        if (song) {
            current_song_store.set_current_song(song);
            init_player(current_song_store.current_song[128]);
        }

        player.pause();
        player.addEventListener<"canplay">("canplay", () => {
            player.play();
            is_playing.value = true;
        });

        player.load();
    }

    const pause = (): void => {
        player.pause();
        is_playing.value = false;
    }

    const next = (): void => {
        current_song_index.value++;
        if (current_song_index.value > total_songs - 1) {
            current_song_index.value = 0;
        }

        pause();
        const song = current_playlist_store.current_playlist.song.items[current_song_index.value];
        fetch_song(song, current_song_index.value)
        .then(data => play(data))
        .catch(err => {
            show_alert(`${err}. Tự động phát bài tiếp theo.`);
            next();
        });
    }

    const prev = (): void => {
        current_song_index.value--;
        
        if (current_song_index.value < 0) {
            current_song_index.value = total_songs - 1;
        }

        pause();
        const song = current_playlist_store.current_playlist.song.items[current_song_index.value];
        fetch_song(song, current_song_index.value)
        .then(data => play(data))
        .catch(err => {
            show_alert(`${err}. Tự động phát bài tiếp theo.`);
            prev();
        });
    }

    const autoplay = (): void => {
        player.addEventListener<"ended">("ended", () => {
            pause();
            next();
        });
    }

    const fetch_song = (song: song_type, index: number): Promise<song_type | undefined> => {
        return new Promise<song_type>(async (resolve, reject) => {
            current_song_index.value = index;
            const res = await get_song(song.encodeId);

            if (res.msg === "Success") {
                resolve({...song, ...res.data, index: index});
            } else {
                reject(res.msg);
            }
        });
    }

    const start = (song: song_type, index: number, playlist_id: string): void => {
        if (song.encodeId === current_song_store.current_song.encodeId) {
            play(current_song_store.current_song);
            return;
        }

        init_playlist(playlist_id);
        fetch_song(song, index)
        .then(data => play(data))
        .catch(err => show_alert(err));
    }

    const show_alert = (msg: string): void => {
        Swal.fire({
            position: 'top-end',
            padding: '1rem',
            toast: true,
            width: '30rem',
            icon: 'error',
            title: msg,
            showConfirmButton: false,
            timer: 2500
        })
    }

    const update_volume = (): void => {
        volume_progress.value = player.volume * 100;
    }

    return {
        is_playing,
        player,
        play,
        pause,
        next,
        prev,
        autoplay,
        fetch_song,
        start,
        update_volume,
        volume_progress,
    }
});