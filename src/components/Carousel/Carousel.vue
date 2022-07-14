<template>
  <Swiper 
    :slidesPerView="1" 
    :spaceBetween="30" 
    :modules="modules" 
    :navigation="navigation" 
    :autoplay="autoplay" 
    lazy 
    loop 
    class="carousel w-full mt-[2rem] h-[30rem]" 
    :breakpoints="breakpoints" 
    v-if="!isLoading"
  >
    <SwiperSlide v-for="playlist in playlists" :key="playlist.encodeId" 
      class="bg-white rounded-[1rem] p-6 shadow-lg cursor-pointer"
    >
      <router-link :to="`/playlist/${playlist.encodeId}`">
        <div class="slide__image w-full h-[70%] overflow-hidden mb-[1rem] relative">
          <img :data-src="playlist.thumbnailM" class="thumbnail w-full h-full object-contain rounded-lg swiper-lazy relative z-10">
          <div class="thumbnail-pseudo absolute w-full h-full top-0 left-0 blur-xl" 
            :style="{ 'backgroundImage': `url(${playlist.thumbnailM})` }" 
          />
        </div>
        <div class="slide__content flex flex-col">
          <span class="slide__title text-primary font-bold truncate" v-text="playlist.title" />
          <span class="slide__desc text-[1.4rem] text-gr" v-text="playlist.sortDescription" />
        </div>
      </router-link>
    </SwiperSlide>
  </Swiper>

  <!-- Skeleton Loading -->
  <Swiper 
    :slidesPerView="1" 
    :spaceBetween="30" 
    :modules="modules" 
    :navigation="navigation" 
    :autoplay="autoplay" 
    lazy 
    loop 
    class="carousel w-full mt-[2rem] h-[30rem]" 
    :breakpoints="breakpoints" 
    v-else
  >
    <SwiperSlide v-for="i in 5" class="bg-white rounded-[1rem] shadow-lg cursor-pointer">
      <SkeletonLoading />
    </SwiperSlide>
  </Swiper>
  <!-- Skeleton Loading -->
  
  <!-- Navigation -->
  <div class="swiper__button absolute top-[10%] right-[7%] m-4 flex w-[3rem] h-[3rem] justify-between items-center">
    <div
      class="swiper__button--prev m-2 p-2 bg-white rounded text-gr hover:text-secondary cursor-pointer shadow-md leading-3">
      <ion-icon name="chevron-back-outline" />
    </div>
    <div
      class="swiper__button--next m-2 p-2 bg-white rounded text-gr hover:text-secondary cursor-pointer shadow-md leading-3">
      <ion-icon name="chevron-forward-outline" />
    </div>
  </div>
  <!-- Navigation -->
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay, Lazy } from "swiper";
import "swiper/css/lazy";
import "swiper/css";
import SkeletonLoading from "../Skeleton/SkeletonLoading.vue";
import type { Playlist } from '../../types/Types';
import { computed } from "vue";

interface Props {
  playlists: Playlist[],
  isLoading: boolean,
}

const props = defineProps<Props>();

const modules = computed(() => [Navigation, Autoplay, Lazy]);

const navigation = computed(() => {
  return {
    nextEl: '.swiper__button--next',
    prevEl: '.swiper__button--prev'
  }
});

const autoplay = computed(() => {
  return {
    delay: 2500,
    disableOnInteraction: false,
  }
});

const breakpoints = computed(() => {
  return {
    '640': {
      slidesPerView: 2,
      spaceBetween: 20, 
    },
    '768': {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    '1024': {
      slidesPerView: 4,
      spaceBetween: 30,
    }
  }
});

</script>
<style lang="scss" scoped>
.slide {
  &__image {
    >img {
      box-shadow: inset 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.25),
        inset -0.2rem -0.2rem 0.5rem rgba(0, 0, 0, 0.1);
      border-right: 0.1rem solid rgba(0, 0, 0, 0.25);
      border-bottom: 0.1rem solid rgba(0, 0, 0, 0.25);
    }
  }

  &__desc {
    max-width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
