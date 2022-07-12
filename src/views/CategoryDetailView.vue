<template>
    <section class="category-detail h-full overflow-x-hidden overflow-y-auto">
        <div class="category-detail__banner w-full mt-[8.5rem] bg-gray-200 relative mb-[3rem]">
            <img v-if="!is_loading" :src="hub_detail?.cover" :alt="hub_detail?.title"
                class="cover w-full h-full object-cover">
        </div>
        <suggested-playlist-vue :suggested_playlists="playlists" :is_loading="is_loading" />
    </section>
</template>

<script setup lang="ts">
import SuggestedPlaylistVue from '@/components/SuggestedPlaylist.vue';
import { get_hub_detail } from '@/api/HubDetail';
import { watchEffect } from '@vue/runtime-core';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { hub_detail_type } from '@/types';

const hub_detail = ref<hub_detail_type>();
const route = useRoute();
const is_loading = ref<boolean>(true);
const playlists = ref<any>();

watchEffect(async () => {
    if (route.name === "CategoryDetail" && route.params.id) {
        is_loading.value = true;
        const data = await get_hub_detail(route.params.id);
        hub_detail.value = data.data;
        playlists.value = hub_detail.value?.sections.filter(section => section.sectionType === "playlist");
        is_loading.value = false;
    }
});
</script>

<style lang="scss" scoped>
.category-detail__banner {
    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.5) 90%);
    }
}
</style>