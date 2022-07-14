<template>
    <section class="category-detail h-full overflow-x-hidden overflow-y-auto">
        <div class="category-detail__banner w-full mt-[8.5rem] bg-gray-200 relative mb-[3rem]">
            <img v-if="!isLoading" :src="hubDetail?.cover" :alt="hubDetail?.title"
                class="cover w-full h-full object-cover">
        </div>
        <SuggestedPlaylist :suggestedPlaylists="playlists" :isLoading="isLoading" />
    </section>
</template>

<script setup lang="ts">
import SuggestedPlaylist from '../components/SuggestedPlaylist.vue';
import { getHubDetail } from '../api/HubDetail';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import type { HubDetail } from '../types/Types';

const hubDetail = ref<HubDetail>();
const route = useRoute();
const isLoading = ref<boolean>(true);
const playlists = ref<any>(null);

watchEffect(async () => {
    if (route.name === "CategoryDetail" && route.params.id) {
        isLoading.value = true;
        const data = await getHubDetail(route.params.id);
        hubDetail.value = data.data;
        playlists.value = hubDetail.value?.sections.filter(section => section.sectionType === "playlist");
        isLoading.value = false;
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