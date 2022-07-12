<template>
    <section class="top-100">
        <suggested-playlist-vue :suggested_playlists="playlist" :is_loading="is_loading" class="mt-[8.5rem]"/>
    </section>
</template>

<script setup lang="ts">
import SuggestedPlaylistVue from '@/components/SuggestedPlaylist.vue';
import { get_top_100 } from '@/api/Top100';
import { onMounted } from '@vue/runtime-core';
import { ref } from 'vue';
import type { top_100_type } from '@/types';

const playlist = ref<any[]>([]);
const is_loading = ref<boolean>(true);

onMounted(async () => {
    const data: top_100_type = await get_top_100();
    playlist.value = data.data;
    is_loading.value = false;
});
</script>

<style lang="scss" scoped>

</style>