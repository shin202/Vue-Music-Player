<template>
    <section class="top-100">
        <SuggestedPlaylist :suggestedPlaylists="playlist" :isLoading="isLoading" class="mt-[8.5rem]"/>
    </section>
</template>

<script setup lang="ts">
import SuggestedPlaylist from '../components/SuggestedPlaylist.vue';
import { getTop100 } from '../api/Top100';
import { ref, onMounted } from 'vue';
import type { Top100 } from '../types/Types';

const playlist = ref<any[]>([]);
const isLoading = ref<boolean>(true);

onMounted(async () => {
    const data: Top100 = await getTop100();
    playlist.value = data.data;
    isLoading.value = false;
});
</script>

<style lang="scss" scoped>

</style>