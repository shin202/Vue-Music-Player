<template>
    <section class="category flex flex-col space-y-28">
        <!-- Topic -->
        <div class="category-topic mt-[8.5rem]">
            <div class="category-topic__inner container">
                <div class="category-topic__heading text-[2.5rem] font-bold capitalize">
                    <h2 v-if="!isLoading">Tâm trạng và hoạt động</h2>
                    <SkeletonLoading v-else class="w-[25rem] h-[3rem]" />
                </div>
                <div v-if="!isLoading"
                    class="category-topic__list grid grid-cols-2 grid-rows-none md:grid-cols-3 md:grid-rows-none lg:grid-cols-4 lg:grid-rows-none mt-[2rem] gap-5">
                    <div v-for="topic in hub?.topic" :key="topic.encodeId"
                        class="category-topic__item bg-gray-400 h-[20rem] rounded-lg overflow-hidden cursor-pointer shadow-lg relative"
                    >
                        <div class="category-topic__thumbnail w-full h-full relative">
                            <img v-lazy="topic.thumbnailR" :alt="topic.title"
                                class="thumbnail w-full h-full object-cover">
                        </div>
                        <RouterLink :to="`/category-detail/${topic.encodeId}`">
                            <div
                                class="category-topic-info flex flex-col justify-end w-full h-full absolute top-0 pb-4">
                                <h2 class="category-topic__title text-white text-3xl uppercase pl-4 pb-2 font-bold" 
                                    v-text="topic.title" 
                                />
                                <div
                                    class="category-topic-playlists__list flex justify-center items-center w-[80%] space-x-2 pl-[1.5rem]"
                                >
                                    <div v-for="playlist in topic.playlists"
                                        class="category-topic-playlists__item w-full"
                                    >
                                        <div
                                            class="category-topic-playlists__thumbnail w-full rounded-lg overflow-hidden">
                                            <img v-lazy="playlist.thumbnailM" :alt="playlist.title"
                                                class="thumbnail w-full h-full object-cover"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                </div>
                <div v-else
                    class="category-topic__list grid grid-cols-2 grid-rows-none md:grid-cols-3 md:grid-rows-none lg:grid-cols-4 lg:grid-rows-none mt-[2rem] gap-5">
                    <div v-for="i in 16"
                        class="category-topic__item bg-gray-400 h-[20rem] rounded-lg overflow-hidden cursor-pointer">
                        <SkeletonLoading />
                    </div>
                </div>
            </div>
        </div>
        <!-- Topic -->
        <!-- Nations -->
        <div class="category-nations">
            <div class="category-nations__inner container">
                <div class="category-nations__title text-[2.5rem] font-bold capitalize">
                    <h2 v-if="!isLoading">Quốc Gia</h2>
                    <SkeletonLoading v-else class="w-[25rem] h-[3rem]" />
                </div>
                <div v-if="!isLoading"
                    class="category-nations__list grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-none mt-[2rem] gap-5"
                >
                    <div v-for="nation in hub?.nations" :key="nation.encodeId"
                        class="category-nations__item bg-gray-400 h-[20rem] rounded-lg overflow-hidden cursor-pointer shadow-lg"
                    >
                        <RouterLink :to="`/category-detail/${nation.encodeId}`">
                            <img v-lazy="nation.thumbnailR" :alt="nation.title"
                                class="thumbnail w-full h-full object-cover hover:scale-110"
                            >
                        </RouterLink>
                    </div>
                </div>
                <div v-else
                    class="category-nations__list grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-none mt-[2rem] gap-5"
                >
                    <div v-for="i in 4"
                        class="category-nations__item bg-gray-400 h-[20rem] rounded-lg overflow-hidden cursor-pointer"
                    >
                        <SkeletonLoading />
                    </div>
                </div>
            </div>
        </div>
        <!-- Nations -->
        <!-- Genre -->
        <div v-if="!isLoading" class="category-genre flex flex-col space-y-16">
            <div v-for="genre in hub?.genre" :key="genre.encodeId"
                class="category-genre__inner container"
            >
                <div class="category-genre__heading text-[2.5rem] font-bold capitalize flex justify-between">
                    <h2 class="category-genre__title" v-text="genre.title" />
                    <Button class="flex justify-between items-center">
                        <RouterLink :to="`/category-detail/${genre.encodeId}`">
                            <span>Tất cả</span>
                            <ion-icon name="arrow-forward-outline" />
                        </RouterLink>
                    </Button>
                </div>
                <div
                    class="category-genre__list grid grid-cols-2 grid-rows-none md:grid-cols-3 md:grid-rows-none lg:grid-cols-5 lg:grid-rows-none mt-[2rem] gap-5">
                    <div v-for="playlist in genre.playlists" :key="playlist.encodeId"
                        class="category-genre__item h-full flex flex-col space-y-2">
                        <div
                            class="category-genre__thumbnail bg-gray-400 h-[20rem] rounded-lg overflow-hidden cursor-pointer shadow-lg">
                            <RouterLink :to="`/playlist/${playlist.encodeId}`">
                                <img v-lazy="playlist.thumbnailM" :alt="playlist.title"
                                    class="thumbnail w-full h-full object-cover hover:scale-110">
                            </RouterLink>
                        </div>
                        <div
                            class="category-genre__title truncate font-bold cursor-pointer transition-colors hover:text-secondary"
                        >
                            <span v-text="playlist.title" />
                        </div>
                        <div
                            class="category-genre__artists truncate text-gr cursor-pointer transition-colors hover:text-secondary"
                        >
                            <span v-text="playlist.artistsNames" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Skeleton Loading -->
        <div v-else class="category-genre flex flex-col space-y-16">
            <div v-for="i in 18" class="category-genre__inner container">
                <div class="category-genre__title text-[2.5rem] font-bold capitalize">
                    <SkeletonLoading class="w-[25rem] h-[3rem]" />
                </div>
                <div
                    class="category-genre__list grid grid-cols-2 grid-rows-none md:grid-cols-3 md:grid-rows-none lg:grid-cols-5 lg:grid-rows-none mt-[2rem] gap-5"
                >
                    <div v-for="i in 6" class="category-genre__item h-full flex flex-col space-y-2">
                        <div
                            class="category-genre__thumbnail bg-gray-400 h-[20rem] rounded-lg overflow-hidden cursor-pointer shadow-lg"
                        >
                            <SkeletonLoading />
                        </div>
                        <div class="category-genre__title truncate font-bold">
                            <SkeletonLoading class="h-[2.5rem]" />
                        </div>
                        <div class="category-genre__artists truncate text-gr">
                            <SkeletonLoading class="h-[1.5rem]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Skeleton Loading -->
        <!-- Genre -->
    </section>
</template>

<script setup lang="ts">
import SkeletonLoading from '../components/Skeleton/SkeletonLoading.vue';
import Button from '../components/Button/Button.vue';
import { getHubHome } from '../api/HubHome';
import { onMounted } from 'vue';
import { ref } from 'vue';
import type { Hub } from '../types/Types';

const hub = ref<Hub>();
const isLoading = ref<boolean>(true);

onMounted(async () => {
    const data = await getHubHome();
    hub.value = data.data;
    isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.category-genre__inner:last-child {
    margin-bottom: 9rem;
}

.category-topic {
    &__item:hover > &__thumbnail > img {
        transform: scale3d(1.1, 1.1, 1);
        transition: all 0.3s cubic-bezier(.49,.26,.19,.37);
    }

    &-info {
        background-image: linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.25) 90%);
    }
}

.thumbnail {
    transition: all 0.3s cubic-bezier(.49,.26,.19,.37);
}
</style>